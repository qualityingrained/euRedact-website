import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface PostFrontmatter {
  title: string;
  date: string;
  author: string;
  description: string;
  tags: string[];
  image?: string;
  slug: string;
}

export interface PostMeta extends PostFrontmatter {
  readingTime: string;
}

export interface Post extends PostMeta {
  content: string;
}

const marked = new Marked(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }
      return hljs.highlightAuto(code).value;
    },
  })
);

marked.setOptions({
  gfm: true,
  breaks: false,
});

/*
  GitHub-style callouts: a blockquote whose first line is [!NOTE], [!CAVEAT] or
  [!RISK] becomes a styled aside. Written as plain markdown so posts stay
  portable — nothing here is a custom syntax a future editor has to learn.

  The kinds map onto the site's colours: CAVEAT and NOTE are mustard, the
  "read this number carefully" marker used everywhere else; RISK is red, the
  colour reserved for PII and the problems it creates.
*/
const CALLOUT_KINDS: Record<string, string> = {
  NOTE: "note",
  CAVEAT: "caveat",
  RISK: "risk",
};

function renderCallouts(html: string): string {
  return html.replace(
    /<blockquote>\s*<p>\s*\[!(NOTE|CAVEAT|RISK)\]\s*/g,
    (_match, kind: string) =>
      `<blockquote class="callout callout-${CALLOUT_KINDS[kind]}"><p>`
  );
}

function calculateReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 230);
  return `${minutes} min read`;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return {
      slug,
      title: data.title,
      date: data.date,
      author: data.author,
      description: data.description,
      tags: data.tags || [],
      image: data.image,
      readingTime: calculateReadingTime(content),
    } as PostMeta;
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const html = renderCallouts(marked.parse(content) as string);

  return {
    slug,
    title: data.title,
    date: data.date,
    author: data.author,
    description: data.description,
    tags: data.tags || [],
    image: data.image,
    readingTime: calculateReadingTime(content),
    content: html,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}
