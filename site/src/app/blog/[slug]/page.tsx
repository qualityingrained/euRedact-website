import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      ...(post.image && { images: [{ url: post.image }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <article className="bg-primary pt-32 pb-20">
        {/* Header */}
        <header className="mx-auto max-w-3xl px-8 mb-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-slate-400 hover:text-secondary text-sm font-bold uppercase tracking-widest transition-colors mb-8"
          >
            <span className="material-symbols-outlined text-sm">
              arrow_back
            </span>
            Back to blog
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block rounded-full bg-secondary/15 text-secondary px-3 py-1 text-xs font-bold"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-black text-4xl md:text-5xl text-white leading-tight">
            {post.title}
          </h1>

          <div className="mt-6 flex items-center gap-4 text-sm text-slate-400">
            <span className="font-bold">{post.author}</span>
            <span className="text-slate-600">&middot;</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span className="text-slate-600">&middot;</span>
            <span>{post.readingTime}</span>
          </div>
        </header>

        {/* Content */}
        <div
          className="prose mx-auto max-w-3xl px-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Bottom nav */}
      <section className="bg-primary border-t border-white/10 py-12">
        <div className="mx-auto max-w-3xl px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-secondary font-black hover:text-emerald-300 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">
              arrow_back
            </span>
            All posts
          </Link>
        </div>
      </section>
    </>
  );
}
