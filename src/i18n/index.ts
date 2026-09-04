import { useUI } from "../store";
import { content } from "./content";

export function useContent() {
  const lang = useUI((s) => s.lang);
  return content[lang];
}
