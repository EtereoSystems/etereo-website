import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { detectLang, rememberLang } from "../src/i18n/lang";

const KEY = "etereo.lang";

/** navigator.languages is read-only, so each case installs its own list. */
function browserLanguages(...tags: string[]) {
  vi.spyOn(navigator, "languages", "get").mockReturnValue(tags);
  vi.spyOn(navigator, "language", "get").mockReturnValue(tags[0] ?? "");
}

function visit(search = "") {
  window.history.replaceState(null, "", `/${search}`);
}

beforeEach(() => {
  localStorage.clear();
  visit();
});

afterEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
});

describe("detectLang precedence", () => {
  it("takes ?lang= over everything else", () => {
    localStorage.setItem(KEY, "en");
    browserLanguages("en-GB");
    visit("?lang=sk");
    expect(detectLang()).toBe("sk");
  });

  it("takes a remembered choice over the browser's list", () => {
    localStorage.setItem(KEY, "sk");
    browserLanguages("en-GB", "en");
    expect(detectLang()).toBe("sk");
  });

  it("falls back to the browser's list, then to English", () => {
    browserLanguages("sk-SK");
    expect(detectLang()).toBe("sk");
    browserLanguages("de-DE", "fr");
    expect(detectLang()).toBe("en");
  });

  it("ignores a ?lang= we do not ship", () => {
    browserLanguages("sk-SK");
    visit("?lang=de");
    expect(detectLang()).toBe("sk");
  });

  it("ignores a stored value we do not ship", () => {
    localStorage.setItem(KEY, "de");
    browserLanguages("sk-SK");
    expect(detectLang()).toBe("sk");
  });
});

describe("detectLang browser matching", () => {
  it("maps cs to sk", () => {
    browserLanguages("cs-CZ");
    expect(detectLang()).toBe("sk");
  });

  it("scans the whole list, not just the first entry", () => {
    browserLanguages("de-DE", "fr-FR", "sk-SK");
    expect(detectLang()).toBe("sk");
  });

  it("is case-insensitive about the tag", () => {
    browserLanguages("SK-sk");
    expect(detectLang()).toBe("sk");
  });

  it("honours list order when several are shipped", () => {
    browserLanguages("en-US", "sk-SK");
    expect(detectLang()).toBe("en");
    browserLanguages("sk-SK", "en-US");
    expect(detectLang()).toBe("sk");
  });
});

describe("what gets remembered", () => {
  // Storing a detection would freeze one guess and stop the browser setting being re-read.
  it("does not persist a detected language", () => {
    browserLanguages("sk-SK");
    expect(detectLang()).toBe("sk");
    expect(localStorage.getItem(KEY)).toBeNull();
  });

  it("persists a language arrived at via ?lang=", () => {
    browserLanguages("en-GB");
    visit("?lang=sk");
    detectLang();
    expect(localStorage.getItem(KEY)).toBe("sk");
  });

  it("persists an explicit switch", () => {
    rememberLang("sk");
    expect(localStorage.getItem(KEY)).toBe("sk");
  });
});

describe("storage that throws", () => {
  // A private window can throw on the accessor itself, not just on the call.
  it("still resolves a language when reading throws", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    browserLanguages("sk-SK");
    expect(detectLang()).toBe("sk");
  });

  it("still resolves a language when writing throws", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    browserLanguages("en-GB");
    visit("?lang=sk");
    expect(detectLang()).toBe("sk");
    expect(() => rememberLang("sk")).not.toThrow();
  });
});
