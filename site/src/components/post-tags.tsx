/*
  Post tags, shared by the blog index and the post pages.

  The colours were defined on the index only, so a post's tags rendered in a
  single teal on its own page and in five different hues on the listing — the
  same tag looking like two different things. One source now.

  These sit outside the three-colour system on purpose: they are categorical
  labels, not status. "open-source" borrows the mustard only because it is part
  of the categorical set, not because it means "unfinished".
*/
const TAG_COLOURS: Record<string, string> = {
  GDPR: "bg-secondary/15 text-secondary",
  PII: "bg-indigo-400/15 text-indigo-300",
  "open-source": "bg-pii-highlight/15 text-pii-highlight",
  NLP: "bg-sky-400/15 text-sky-300",
  benchmarks: "bg-violet-400/15 text-violet-300",
};

export function PostTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-bold ${
            TAG_COLOURS[tag] ?? "bg-primary text-on-surface-variant"
          }`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
