import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// No globals, so React Testing Library's own auto-cleanup never registers.
afterEach(cleanup);

// jsdom has no layout: scrollIntoView is missing outright and scrollTo is a stub that
// logs "not implemented" on every call. Both are fire-and-forget in the app.
Element.prototype.scrollIntoView = () => {};
window.scrollTo = () => {};
