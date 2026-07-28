import type { ReactNode } from "react";

/*
  The one hero used by every page, so the design language is shared rather than
  re-invented per route. Before this the site had twelve variants: dot pattern
  against the homepage's grid, font-black at text-5xl against font-bold at a
  responsive scale, five container widths, and a mix of centred and left-aligned.

  The homepage sets the language and this follows it:
    · square grid backdrop, not the dot field
    · monospace eyebrow prefixed with the accent slash
    · bold, tight heading with an optional trailing slash
    · muted subtitle capped at a readable measure
    · left-aligned on a 1180px container

  The homepage keeps its own hero markup because it carries the mark, the
  redaction sweep and the playground — but the type scale and spacing here are
  deliberately the same values.
*/
export function PageHero({
  eyebrow,
  title,
  subtitle,
  slash = true,
  children,
}: {
  /** Small mono label above the heading, e.g. "SDK reference". */
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  /** The accent slash after the heading. Off for titles ending in punctuation. */
  slash?: boolean;
  /** Anything below the subtitle: links, badges, a caveat paragraph. */
  children?: ReactNode;
}) {
  return (
    <section className="relative grid-pattern overflow-hidden pt-32 pb-14 px-8">
      <div className="relative z-10 max-w-[1180px] mx-auto">
        {eyebrow && (
          <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-on-surface-variant mb-5">
            <span className="text-secondary mr-2">/</span>
            {eyebrow}
          </div>
        )}

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.05]">
          {title}
          {slash && (
            <span className="text-secondary font-normal ml-3">/</span>
          )}
        </h1>

        {subtitle && (
          <p className="mt-5 text-lg leading-relaxed text-on-surface-variant max-w-2xl">
            {subtitle}
          </p>
        )}

        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
