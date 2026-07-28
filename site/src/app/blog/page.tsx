import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { BlogSubscribe } from "@/components/blog-subscribe";
import { PageHero } from "@/components/page-hero";

const tagColors: Record<string, string> = {
  GDPR: "bg-secondary/15 text-secondary",
  PII: "bg-indigo-400/15 text-indigo-300",
  "open-source": "bg-amber-400/15 text-amber-300",
  NLP: "bg-sky-400/15 text-sky-300",
  benchmarks: "bg-violet-400/15 text-violet-300",
};

function getTagColor(tag: string): string {
  return tagColors[tag] || "bg-primary text-on-surface-variant";
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      {/* Header */}
      <PageHero
        eyebrow="Writing"
        title="Blog"
        subtitle="Technical deep-dives, GDPR guides, and development updates from the euRedact team."
      />

      {/* Blog Grid */}
      <section className="mx-auto max-w-7xl py-20 px-8">
        {posts.length === 0 ? (
          <p className="text-on-surface-variant text-center text-lg">
            No posts yet. Check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group"
              >
                <article className="bg-surface rounded-[2rem] shadow-xl border border-outline-variant p-10 hover:-translate-y-2 transition-transform h-full flex flex-col">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${getTagColor(tag)}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h2 className="mt-4 font-black text-xl text-on-surface group-hover:text-secondary transition-colors">
                    {post.title}
                  </h2>

                  <p className="mt-2 text-xs uppercase tracking-widest text-on-surface-variant font-black">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    &middot; {post.readingTime}
                  </p>

                  <p className="mt-3 text-on-surface-variant line-clamp-3 flex-1">
                    {post.description}
                  </p>

                  <span className="mt-4 inline-block text-secondary font-black">
                    Read more &rarr;
                  </span>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter Signup */}
      <BlogSubscribe />
    </>
  );
}
