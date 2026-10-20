import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Contact } from "../src/components/Contact";
import { PRESET_EVENT, readPreset } from "../src/components/contactPreset";
import { Engage, Team, Voices } from "../src/sections/Sections";
import { MOCK_TESTIMONIALS, TESTIMONIALS, visibleTestimonials, type Testimonial } from "../src/data/testimonials";
import { content } from "../src/i18n/content";
import { useUI } from "../src/store";

const quote = (id: string, consent = true): Testimonial => ({
  id,
  name: `Test Person ${id}`,
  role: { en: "CTO", sk: "CTO" },
  company: "Firma s.r.o.",
  quote: { en: `Quote ${id}`, sk: `Citát ${id}` },
  consent,
});

beforeEach(() => {
  useUI.setState({ lang: "en" });
  window.history.replaceState(null, "", "/");
});

describe("testimonials", () => {
  // the visible set; the rest are the marquee's copies
  const real = (c: HTMLElement) => c.querySelectorAll(".voices-set:not([aria-hidden]) figure > blockquote + figcaption");

  // Vitest runs with DEV on, so the dev-server branch is the one that warns.
  it("renders a mock on the dev server, and says so once", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const items = [quote("a"), { ...quote("m", false), isMock: true }];
    const { container } = render(<Voices dev items={items} />);
    render(<Voices dev items={items} />);
    expect(real(container)).toHaveLength(2);
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn).toHaveBeenCalledWith("[testimonials] rendering mock data");
    warn.mockRestore();
  });

  it("marks every mock as one, with no consent", () => {
    for (const t of MOCK_TESTIMONIALS) expect([t.isMock, t.consent]).toEqual([true, false]);
  });

  // only quotes the clients approved in writing ship; adding one means adding it here too
  it("ships the five approved quotes, so a production build shows them", () => {
    const published = TESTIMONIALS.filter((t) => t.consent && !t.isMock);
    expect(published.map((t) => t.name)).toEqual(["Matej M.", "Michal B.", "Karol K.", "Karolína K.", "Sofia H."]);
    expect(real(render(<Voices dev={false} />).container)).toHaveLength(5);
  });

  it("never shows a mock in production, even one marked as consented", () => {
    expect(visibleTestimonials([{ ...quote("m"), isMock: true }], false)).toEqual([]);
  });

  it("stays hidden with fewer than two quotes cleared for publication", () => {
    const { container } = render(<Voices dev={false} items={[quote("a"), quote("b", false)]} />);
    expect(container.innerHTML).toBe("");
  });

  it.each([2, 3, 6])("renders %i consented quotes once for assistive tech, as figure/blockquote/figcaption", (n) => {
    const items = Array.from({ length: n }, (_, i) => quote(String(i)));
    const { container } = render(<Voices dev={false} items={[...items, quote("hidden", false)]} />);
    expect(real(container)).toHaveLength(n);
    expect(container.textContent).not.toContain("hidden");
  });

  // an even number of identical sets is what makes translateX(-50%) seamless
  it("duplicates the loop as aria-hidden, inert copies, padding a short list to fill a run", () => {
    for (const [n, sets] of [[2, 6], [3, 4], [6, 2]]) {
      const items = Array.from({ length: n }, (_, i) => quote(String(i)));
      const { container, unmount } = render(<Voices dev={false} items={items} />);
      const all = [...container.querySelectorAll(".voices-set")];
      expect(all).toHaveLength(sets);
      expect(all.slice(1).every((s) => s.getAttribute("aria-hidden") === "true" && s.hasAttribute("inert"))).toBe(true);
      expect(all[0].hasAttribute("aria-hidden") || all[0].hasAttribute("inert")).toBe(false);
      expect(container.querySelector<HTMLElement>(".voices-marquee")!.style.getPropertyValue("--voice-n")).toBe(String((n * sets) / 2));
      unmount();
    }
  });

  it("links the company and LinkedIn out safely, with a name on the icon", () => {
    const t = { ...quote("x"), companyUrl: "https://firma.sk", linkedin: "https://linkedin.com/in/x" };
    render(<Voices dev={false} items={[t, quote("y")]} />);
    for (const a of [screen.getByRole("link", { name: "Firma s.r.o." }), screen.getByRole("link", { name: /LinkedIn.*Test Person x/ })]) {
      expect(a.getAttribute("target")).toBe("_blank");
      expect(a.getAttribute("rel")).toBe("noopener noreferrer");
    }
  });

  it("draws a rating as one labelled image of five stars, and nothing without one", () => {
    const { container } = render(<Voices dev={false} items={[{ ...quote("a"), rating: 4 }, quote("b")]} />);
    const [stars, ...rest] = screen.getAllByRole("img", { name: "Rated 4 out of 5" });
    expect(rest).toEqual([]);
    expect(stars.querySelectorAll("svg")).toHaveLength(5);
    expect(stars.querySelectorAll(".voice__star--off")).toHaveLength(1);
    expect(container.querySelectorAll(".voices-set:not([aria-hidden]) .voice__stars")).toHaveLength(1);
  });

  it("shows only the role when there is no company, with no dangling separator", () => {
    const t = { ...quote("x"), company: undefined, industry: { en: "Hospitality", sk: "Gastronómia" } };
    const { container } = render(<Voices dev={false} items={[t, quote("y")]} />);
    const card = container.querySelector(".voices-set:not([aria-hidden]) .voice")!;
    expect(card.querySelector(".voice__role")?.textContent).toBe("CTO");
    expect(card.querySelector(".voice__industry")?.textContent).toBe("Hospitality");
  });
});

describe("team", () => {
  // three cards keep the row whole: two core disciplines plus the network, no orphan
  it("renders the core team plus the network card, as h3s", () => {
    const { container } = render(<Team />);
    const titles = [...container.querySelectorAll(".team-grid h3")].map((h) => h.textContent);
    expect(titles).toEqual([...content.en.team.core.map((m) => m.title), content.en.team.network.title]);
    expect(container.querySelectorAll(".team-card--network")).toHaveLength(1);
    expect(container.querySelectorAll(".team-grid .avatar svg")).toHaveLength(3);
  });
});

describe("contact form", () => {
  afterEach(() => window.history.replaceState(null, "", "/"));

  const chips = () => screen.getAllByRole("button", { pressed: true }).map((b) => b.textContent);
  const submit = () => fireEvent.submit(document.querySelector("form")!);
  const t = content.en.contact;

  it("preselects nothing by default", () => {
    render(<Contact />);
    expect(screen.queryAllByRole("button", { pressed: true })).toEqual([]);
    expect(screen.getAllByRole("button", { pressed: false })).toHaveLength(Object.keys(t.topics).length);
  });

  it.each([
    ["?product=ai", [t.topics.ai]],
    ["?product=cloud&lang=sk", [t.topics.cloud]],
    ["?product=nope", []],
    // nothing links with ?type= any more, so an old bookmark preselects nothing
    ["?type=assessment", []],
  ])("preselects from %s", (search, want) => {
    window.history.replaceState(null, "", "/" + search);
    render(<Contact />);
    expect(screen.queryAllByRole("button", { pressed: true }).map((b) => b.textContent).sort()).toEqual([...want].sort());
  });

  it("ignores inherited object keys in the URL", () => {
    expect(readPreset("?product=__proto__")).toEqual([]);
    expect(readPreset("?product=constructor")).toEqual([]);
  });

  it("toggles chips as a multi-select", () => {
    render(<Contact />);
    fireEvent.click(screen.getByRole("button", { name: t.topics.saas }));
    fireEvent.click(screen.getByRole("button", { name: t.topics.web }));
    expect(chips()).toEqual([t.topics.saas, t.topics.web]);
    fireEvent.click(screen.getByRole("button", { name: t.topics.saas }));
    expect(chips()).toEqual([t.topics.web]);
  });

  it("adds a chip when a CTA on the page asks for one", () => {
    render(<Contact />);
    window.history.replaceState(null, "", "/?product=saas#contact");
    act(() => {
      window.dispatchEvent(new Event(PRESET_EVENT));
    });
    expect(chips()).toEqual([t.topics.saas]);
  });

  it("flags every required field on an empty submit and moves focus to the first", () => {
    render(<Contact />);
    submit();
    for (const [label, msg] of [
      [t.name, t.errors.name],
      [t.email, t.errors.email],
      [t.context, t.errors.context],
    ]) {
      const input = screen.getByLabelText(label);
      expect(input.getAttribute("aria-invalid")).toBe("true");
      expect(document.getElementById(input.getAttribute("aria-describedby")!)?.textContent).toBe(msg);
    }
    expect(screen.getByText(t.errors.consent)).toBeTruthy();
    expect(document.activeElement).toBe(screen.getByLabelText(t.name));
  });

  it("validates the email on blur and clears the error once it is fixed", () => {
    render(<Contact />);
    const email = screen.getByLabelText(t.email);
    fireEvent.change(email, { target: { value: "jane@" } });
    fireEvent.blur(email);
    expect(screen.getByText(t.errors.email)).toBeTruthy();
    fireEvent.change(email, { target: { value: "jane@company.com" } });
    expect(screen.queryByText(t.errors.email)).toBeNull();
  });

  it("refuses to submit without consent", () => {
    render(<Contact />);
    fireEvent.change(screen.getByLabelText(t.name), { target: { value: "Jane" } });
    fireEvent.change(screen.getByLabelText(t.email), { target: { value: "jane@company.com" } });
    fireEvent.change(screen.getByLabelText(t.context), { target: { value: "A legacy ERP" } });
    submit();
    expect(screen.getByText(t.errors.consent)).toBeTruthy();
    expect(document.activeElement?.getAttribute("type")).toBe("checkbox");
  });

  describe("submission", () => {
    afterEach(() => vi.restoreAllMocks());

    const fill = () => {
      fireEvent.change(screen.getByLabelText(t.name), { target: { value: "Jane" } });
      fireEvent.change(screen.getByLabelText(t.email), { target: { value: "jane@company.com" } });
      fireEvent.change(screen.getByLabelText(t.context), { target: { value: "A legacy ERP" } });
      fireEvent.click(screen.getByRole("checkbox"));
    };
    const reply = (body: string, status = 200) =>
      vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(body, { status }));

    it("posts the inquiry to the PHP endpoint and thanks the visitor on its ok", async () => {
      const fetch = reply('{"ok":true}');
      render(<Contact />);
      fireEvent.click(screen.getByRole("button", { name: t.topics.ai }));
      fill();
      await act(async () => submit());
      expect(await screen.findByText(t.sent)).toBeTruthy();
      const [url, init] = fetch.mock.calls[0];
      expect([url, init?.method]).toEqual(["/api/contact.php", "POST"]);
      expect(JSON.parse(init?.body as string)).toMatchObject({
        name: "Jane",
        email: "jane@company.com",
        context: "A legacy ERP",
        consent: true,
        website: "",
        topics: [t.topics.ai],
        lang: "en",
      });
    });

    // a 200 from something other than the script (dev server, PHP off) is not "sent"
    it.each([
      ["an HTML page served with 200", () => reply("<!doctype html><html></html>")],
      ["the script reporting a mail failure", () => reply('{"ok":false,"error":"mail"}', 500)],
      ["a network failure", () => vi.spyOn(globalThis, "fetch").mockRejectedValue(new TypeError("Failed to fetch"))],
    ])("falls back to a prefilled email on %s", async (_, mock) => {
      mock();
      render(<Contact />);
      fill();
      await act(async () => submit());
      await waitFor(() => expect(document.querySelector(".contact__error a")).not.toBeNull());
      const fallback = document.querySelector<HTMLAnchorElement>(".contact__error a")!;
      expect(screen.queryByText(t.sent)).toBeNull();
      expect(fallback.textContent).toBe("info@etereosystems.com");
      expect(decodeURIComponent(fallback.getAttribute("href")!)).toContain("A legacy ERP");
    });

    it("sends nothing when the honeypot is filled", async () => {
      const fetch = reply('{"ok":true}');
      render(<Contact />);
      fill();
      fireEvent.change(document.getElementById("contact-website")!, { target: { value: "spam.example" } });
      await act(async () => submit());
      expect(fetch).not.toHaveBeenCalled();
    });
  });

  it("has no English left in the Slovak form", () => {
    useUI.setState({ lang: "sk" });
    const { container } = render(<Contact />);
    const shown = [...container.querySelectorAll("[placeholder]")].map((el) => el.getAttribute("placeholder"));
    expect(shown).toEqual([content.sk.contact.namePh, content.sk.contact.emailPh, content.sk.contact.companyPh, content.sk.contact.contextPh]);
    expect(container.textContent).not.toMatch(/Jane|Company name|Request a call/);
  });
});

describe("engagement steps", () => {
  it.each(["en", "sk"] as const)("renders three numbered steps as an <ol>, with one CTA to #contact (%s)", (lang) => {
    useUI.setState({ lang });
    const e = content[lang].engage;
    const { container } = render(<Engage />);
    const steps = [...container.querySelectorAll("ol.steps > li")];
    expect(steps.map((li) => li.querySelector("h3")?.textContent)).toEqual(e.items.map((s) => s.title));
    for (const [i, li] of steps.entries()) {
      expect(li.querySelector(".step__n")?.getAttribute("aria-hidden")).toBe("true");
      expect(li.querySelector(".step__output")?.textContent).toBe(`${e.outputLabel} ${e.items[i].output}`);
      expect(li.querySelectorAll(".step__points li")).toHaveLength(4);
    }
    // a connector between each pair, none after the last
    expect([...container.querySelectorAll(".step__link")].map((l) => l.getAttribute("aria-hidden"))).toEqual(["true", "true"]);
    expect(steps.at(-1)!.querySelector(".step__link")).toBeNull();
    const links = container.querySelectorAll("a");
    expect(links).toHaveLength(1);
    expect(links[0].getAttribute("href")).toBe("#contact");
    expect(links[0].className).toContain("btn--primary");
  });
});
