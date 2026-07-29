import Link from "next/link";
import { getAllPosts, type PostMeta } from "@/lib/blog";
import { BlogSubscribe } from "@/components/blog-subscribe";
import { PageHero } from "@/components/page-hero";
import { PostTags } from "@/components/post-tags";

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function Meta({ post }: { post: PostMeta }) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-on-surface-variant whitespace-nowrap">
      {formatDate(post.date)} · {post.readingTime}
    </span>
  );
}

export default function BlogPage() {
  const posts = getAllPosts();
  const [lead, ...archive] = posts;

  return (
    <>
      <PageHero
        eyebrow="Writing"
        title="Blog"
        subtitle="Technical deep-dives, GDPR guides, and development updates from the euRedact team."
      />

      {posts.length === 0 ? (
        <section className="max-w-[1180px] mx-auto px-6 md:px-8 py-20">
          <p className="text-on-surface-variant text-lg">
            No posts yet. Check back soon.
          </p>
        </section>
      ) : (
        <>
          {/* ── Lead post ──────────────────────────────────────────────
              The newest piece carries real weight instead of being one of
              six identical boxes: the grid backdrop from the hero, the
              full title at heading scale, and room for the description. */}
          <section className="max-w-[1180px] mx-auto px-6 md:px-8 pt-2 pb-14">
            <Link href={`/blog/${lead.slug}`} className="group block">
              <article className="relative bg-surface border border-outline-variant rounded-2xl p-8 md:p-12 transition-colors hover:border-secondary/50">
                <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-on-surface-variant mb-5">
                  <span className="text-secondary mr-2">/</span>Latest
                </div>
                <h2 className="text-2xl md:text-4xl font-bold tracking-tight leading-[1.1] max-w-3xl transition-colors group-hover:text-secondary">
                  {lead.title}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-on-surface-variant max-w-2xl">
                  {lead.description}
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <Meta post={lead} />
                  <PostTags tags={lead.tags} />
                  <span className="text-secondary font-mono text-[11px] uppercase tracking-[0.12em] md:ml-auto">
                    Read →
                  </span>
                </div>
              </article>
            </Link>
          </section>

          {/* ── Archive ────────────────────────────────────────────────
              A numbered list rather than a card grid. Hovering redacts the
              index number, which is the product's own gesture. */}
          {archive.length > 0 && (
            <section className="max-w-[1180px] mx-auto px-6 md:px-8 pb-20">
              <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-on-surface-variant mb-4">
                <span className="text-secondary mr-2">/</span>Archive
              </div>
              <ul className="border-t border-outline-variant">
                {archive.map((post, i) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto] items-baseline gap-x-6 gap-y-3 border-b border-outline-variant py-7 transition-colors hover:bg-surface/50"
                    >
                      <span className="font-mono text-xs tabular-nums text-on-surface-variant rounded px-1.5 transition-colors group-hover:bg-brand group-hover:text-white">
                        {String(i + 2).padStart(2, "0")}
                      </span>

                      <div className="min-w-0">
                        <h3 className="text-lg md:text-xl font-bold tracking-tight transition-colors group-hover:text-secondary">
                          {post.title}
                        </h3>
                        <p className="mt-1.5 text-on-surface-variant leading-relaxed line-clamp-2 max-w-2xl">
                          {post.description}
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                          <PostTags tags={post.tags} />
                          <span className="md:hidden">
                            <Meta post={post} />
                          </span>
                        </div>
                      </div>

                      <span className="hidden md:block">
                        <Meta post={post} />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}

      <BlogSubscribe />
    </>
  );
}
