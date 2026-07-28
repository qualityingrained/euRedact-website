import type { Metadata } from "next";
import Link from "next/link";
import { PostTags } from "@/components/post-tags";
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
      <article className="pb-20">
        {/* Header */}
        <header className="relative grid-pattern px-8 pt-32 pb-14 mb-12">
          <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-on-surface-variant hover:text-secondary text-sm font-bold uppercase tracking-widest transition-colors mb-8"
          >
            <span className="material-symbols-outlined text-sm">
              arrow_back
            </span>
            Back to blog
          </Link>

          <div className="mb-5">
            <PostTags tags={post.tags} />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.05]">
            {post.title}
          </h1>

          <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.1em] text-on-surface-variant">
            <span className="text-secondary mr-2">/</span>
            {post.author} · {new Date(post.date).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })} · {post.readingTime}
          </div>
          </div>
        </header>

        {/* Content */}
        <div
          className="prose mx-auto max-w-3xl px-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Bottom nav */}
      <section className="bg-code border-t border-white/10 py-12">
        <div className="mx-auto max-w-3xl px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-secondary font-black hover:text-secondary-hover transition-colors"
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
