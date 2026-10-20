import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Contact } from "../src/components/Contact";
import { PRESET_EVENT, readPreset } from "../src/components/contactPreset";
import { Engage, Team, Voices } from "../src/sections/Sections";
import { TESTIMONIALS, type Testimonial } from "../src/data/testimonials";
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
  // the three invented quotes were removed; the data file must not ship one by accident
  it("ships with no published quotes, so the section is hidden", () => {
    expect(TESTIMONIALS.filter((t) => t.consent)).toEqual([]);
    expect(render(<Voices />).container.innerHTML).toBe("");
  });

  it("stays hidden with fewer than two quotes cleared for publication", () => {
    const { container } = render(<Voices items={[quote("a"), quote("b", false)]} />);
    expect(container.innerHTML).toBe("");
  });

  it.each([2, 3])("renders %i consented quotes as figure/blockquote/figcaption", (n) => {
    const items = Array.from({ length: n }, (_, i) => quote(String(i)));
    const { container } = render(<Voices items={[...items, quote("hidden", false)]} />);
    expect(container.querySelectorAll("figure > blockquote + figcaption")).toHaveLength(n);
    expect(container.textContent).not.toContain("hidden");
    expect(container.querySelector(".voices--pair") !== null).toBe(n === 2);
  });

  it("links the company and LinkedIn out safely, with a name on the icon", () => {
    const t = { ...quote("x"), companyUrl: "https://firma.sk", linkedin: "https://linkedin.com/in/x" };
    render(<Voices items={[t, quote("y")]} />);
    for (const a of [screen.getByRole("link", { name: "Firma s.r.o." }), screen.getByRole("link", { name: /LinkedIn.*Test Person x/ })]) {
      expect(a.getAttribute("target")).toBe("_blank");
      expect(a.getAttribute("rel")).toBe("noopener noreferrer");
    }
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
    ["?type=assessment", [t.topics.assessment]],
    ["?product=ai", [t.topics.ai]],
    ["?type=embedded&product=cloud", [t.topics.cloud, t.topics["team-extension"]]],
    ["?product=nope", []],
  ])("preselects from %s", (search, want) => {
    window.history.replaceState(null, "", "/" + search);
    render(<Contact />);
    expect(screen.queryAllByRole("button", { pressed: true }).map((b) => b.textContent).sort()).toEqual([...want].sort());
  });

  it("ignores inherited object keys in the URL", () => {
    expect(readPreset("?type=constructor&product=__proto__")).toEqual([]);
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

describe("engagement cards", () => {
  it("link to the contact form with their own ?type=", () => {
    const { container } = render(<Engage />);
    const hrefs = [...container.querySelectorAll<HTMLAnchorElement>(".engage__cta")].map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(["/?type=assessment#contact", "/?type=team#contact", "/?type=embedded#contact"]);
  });
});
