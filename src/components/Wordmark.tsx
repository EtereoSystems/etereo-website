export function Wordmark({ className, dot = true }: { className?: string; dot?: boolean }) {
  return (
    <span className={"wordmark " + (className || "")}>
      {dot && <span className="wordmark__dot" aria-hidden />}
      <span className="wordmark__text">ETEREO</span>
    </span>
  );
}
