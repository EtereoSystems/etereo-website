// Runtime for the static service pages (services/<slug>/index.html). blog-post.ts already
// handles the language and the mobile menu; this adds the delivery stepper and the reveal.
import "./blog-post";
import { initSteps } from "./service-steps";

document.querySelectorAll<HTMLElement>(".svc-steps").forEach(initSteps);

// Same rise-and-fade as the home page (components/useReveal.ts), but only for what starts
// below the fold: this runs after the first paint, and hiding something already on screen
// would make it blink.
const REVEAL = [
  ".svc-intro",
  ".svc-section .svc-h2",
  ".svc-steps",
  ".svc-deliver li",
  ".svc-principle",
  ".svc-faq .faq__item",
  ".svc-related",
  ".page-cta .container",
].join(", ");
const STAGGER_CAP = 5;

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        .forEach((e, i) => {
          const el = e.target as HTMLElement;
          el.style.setProperty("--i", String(Math.min(i, STAGGER_CAP)));
          el.classList.add("in");
          io.unobserve(el);
        });
    },
    { threshold: 0, rootMargin: "0px 0px 15% 0px" },
  );
  const fold = window.innerHeight;
  document.querySelectorAll<HTMLElement>(REVEAL).forEach((el) => {
    if (el.getBoundingClientRect().top <= fold) return;
    el.classList.add("reveal");
    io.observe(el);
  });
}
