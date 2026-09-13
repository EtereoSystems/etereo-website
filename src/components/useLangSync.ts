import { useEffect } from "react";
import { useUI } from "../store";

/** Mirrors the active language into the URL so every page variant stays shareable. */
export function useLangSync() {
  const lang = useUI((s) => s.lang);
  useEffect(() => {
    document.documentElement.lang = lang;
    const url = new URL(window.location.href);
    if (lang === "en") url.searchParams.delete("lang");
    else url.searchParams.set("lang", lang);
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
  }, [lang]);
}
