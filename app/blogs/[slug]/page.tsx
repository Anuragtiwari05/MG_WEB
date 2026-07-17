import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogs } from "@/lib/data";
import BlogDetailClient from "./BlogDetailClient";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) return {};
  return {
    title: `${blog.title} | MG Motor Mumbai Blog`,
    description: blog.excerpt,
    alternates: { canonical: `/blogs/${blog.slug}` },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [{ url: blog.coverImage }],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) notFound();
  const related = blogs.filter((b) => b.slug !== slug && b.category === blog.category).slice(0, 3);
  return <BlogDetailClient blog={blog} related={related} />;
}
