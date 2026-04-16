import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { BlogSubscribe } from "@/components/blog-subscribe";

const tagColors: Record<string, string> = {
  GDPR: "bg-emerald-100 text-emerald-700",
  PII: "bg-indigo-100 text-indigo-700",
  "open-source": "bg-amber-100 text-amber-700",
  NLP: "bg-sky-100 text-sky-700",
  benchmarks: "bg-violet-100 text-violet-700",
};

function getTagColor(tag: string): string {
  return tagColors[tag] || "bg-slate-100 text-slate-600";
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      {/* Header */}
      <section className="bg-primary hero-pattern pt-32 py-16">
        <div className="mx-auto max-w-7xl px-8">
          <h1 className="font-black text-5xl text-white">Blog</h1>
          <p className="mt-4 text-slate-300 text-lg max-w-2xl">
            Technical deep-dives, GDPR guides, and development updates from the
            euRedact team.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="mx-auto max-w-7xl py-20 px-8">
        {posts.length === 0 ? (
          <p className="text-slate-500 text-center text-lg">
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
                <article className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-10 hover:-translate-y-2 transition-transform h-full flex flex-col">
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

                  <h2 className="mt-4 font-black text-xl text-primary group-hover:text-secondary transition-colors">
                    {post.title}
                  </h2>

                  <p className="mt-2 text-xs uppercase tracking-widest text-slate-400 font-black">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    &middot; {post.readingTime}
                  </p>

                  <p className="mt-3 text-slate-500 line-clamp-3 flex-1">
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
