import type { ReactNode } from "react";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/** A photo when there is one, the initials otherwise. Decorative: the name is always beside it. */
export function Avatar({ name, photo, className }: { name: string; photo?: string; className: string }) {
  return photo ? (
    <img className={`avatar avatar--photo ${className}`} src={photo} alt="" width={56} height={56} loading="lazy" />
  ) : (
    <span className={`avatar ${className}`} aria-hidden="true">
      {initials(name)}
    </span>
  );
}

export function LinkedInLink({ href, label }: { href: string; label: string }) {
  return (
    <a className="linkedin" href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"
        />
      </svg>
    </a>
  );
}

export type TeamIconKind = "engineering" | "integrations" | "network";

const TEAM_ICON_PATHS: Record<TeamIconKind, ReactNode> = {
  engineering: <path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16" />,
  integrations: (
    <>
      <path d="M7 18.5a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 17.9 8.6 4 4 0 0 1 17 18.5Z" />
      <path d="M9.5 14h5M12 11.5v5" />
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="5" r="2.4" />
      <circle cx="5" cy="18" r="2.4" />
      <circle cx="19" cy="18" r="2.4" />
      <path d="M10.9 7.1 6.2 15.9M13.1 7.1l4.7 8.8M7.4 18h9.2" />
    </>
  ),
};

/** Stands in for an avatar on a card that is a discipline or a group, not a person. */
export function TeamIcon({ kind, className }: { kind: TeamIconKind; className: string }) {
  return (
    <span className={`avatar avatar--icon avatar--${kind} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" width="24" height="24" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {TEAM_ICON_PATHS[kind]}
      </svg>
    </span>
  );
}
