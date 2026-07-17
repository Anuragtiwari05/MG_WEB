"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { Calendar, Clock, ArrowRight } from "@/components/icons";
import type { Blog } from "@/lib/data";

type Props = { blog: Blog; related: Blog[] };

const categoryColors: Record<string, string> = {
  "Electric Vehicles": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "MG News": "bg-blue-50 text-blue-700 border-blue-200",
  "Ownership Tips": "bg-amber-50 text-amber-700 border-amber-200",
  Technology: "bg-violet-50 text-violet-700 border-violet-200",
  "Buying Guide": "bg-rose-50 text-rose-700 border-rose-200",
  "Car Care": "bg-slate-100 text-slate-700 border-slate-200",
};

export default function BlogDetailClient({ blog, related }: Props) {
  return (
    <>
      <Navbar />
      <main className="mt-[80px] min-h-screen bg-[#f8f8f8] text-slate-800">

        {/* HERO */}
        <section className="relative overflow-hidden bg-neutral-950 text-white">
          <div className="absolute inset-0">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              priority
              className="object-cover opacity-70 lg:object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
          </div>

          <div className="container-px relative z-10 mx-auto max-w-[1400px] py-24 sm:py-32 lg:py-36">
            <Reveal variant="fade-up">
              {/* Breadcrumb */}
              <nav className="mb-6 flex items-center gap-2 text-[11px] text-white/50">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <Link href="/blogs" className="hover:text-white transition-colors">Blog</Link>
                <span>/</span>
                <span className="text-white/70 line-clamp-1 max-w-[200px]">{blog.title}</span>
              </nav>

              {/* Category Badge */}
              <span className={`inline-block rounded-full border px-3 py-1 text-[10px] font-bold backdrop-blur-sm ${categoryColors[blog.category] || "bg-white/20 text-white border-white/30"}`}>
                {blog.category}
              </span>

              {/* Title */}
              <h1 className="mt-4 max-w-3xl font-display text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                {blog.title}
              </h1>

              {/* Meta */}
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/50">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-xs font-black text-white">
                    {blog.author[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-white/80">{blog.author}</p>
                    <p className="text-[10px] text-white/40">{blog.authorRole}</p>
                  </div>
                </div>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {blog.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {blog.readTime}
                </span>
              </div>
            </Reveal>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
        </section>

        {/* CONTENT */}
        <section className="container-px mx-auto max-w-[1400px] py-12 sm:py-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_300px]">

            {/* Article Body */}
            <Reveal variant="fade-up">
              <article
                className="prose prose-slate max-w-none rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100 sm:p-10 lg:p-12
                  prose-headings:font-display prose-headings:font-black prose-headings:text-slate-900
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                  prose-p:text-slate-600 prose-p:leading-relaxed
                  prose-blockquote:border-l-4 prose-blockquote:border-brand prose-blockquote:bg-brand/5 prose-blockquote:pl-5 prose-blockquote:py-3 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-slate-700 prose-blockquote:font-medium
                  prose-ul:space-y-1 prose-li:text-slate-600
                  prose-strong:text-slate-800 prose-strong:font-bold"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* CTA Box */}
              <div className="mt-8 overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-950 to-brand-deep p-8 text-white shadow-lg">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand">Ready to Experience MG?</p>
                <h3 className="mt-2 font-display text-xl font-black leading-tight">
                  Book a Test Drive at MG Motor Mumbai & Thane
                </h3>
                <p className="mt-2 text-sm text-white/60 max-w-lg">
                  Visit any of our 5 showrooms across Mumbai and Thane. Our product experts will walk you through every feature.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/#test-drive"
                    className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/30"
                  >
                    Book Test Drive <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/cars"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:bg-white/20"
                  >
                    Explore All Models
                  </Link>
                </div>
              </div>

              {/* Back Link */}
              <div className="mt-6">
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand hover:underline"
                >
                  Back to All Articles
                </Link>
              </div>
            </Reveal>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Author Card */}
              <Reveal className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                <h3 className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-800">Author</h3>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-lg font-black text-white">
                    {blog.author[0]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{blog.author}</p>
                    <p className="text-[11px] text-brand font-medium">{blog.authorRole}</p>
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate-500">
                  Expert contributor at MG Motor Mumbai & Thane, covering automotive technology, EVs, and ownership tips.
                </p>
              </Reveal>

              {/* Article Info */}
              <Reveal className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                <h3 className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-800">Article Info</h3>
                <dl className="space-y-3 text-xs">
                  <div className="flex justify-between">
                    <dt className="text-slate-400">Category</dt>
                    <dd className="font-semibold text-slate-700">{blog.category}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-400">Published</dt>
                    <dd className="font-semibold text-slate-700">{blog.date}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-400">Read Time</dt>
                    <dd className="font-semibold text-slate-700">{blog.readTime}</dd>
                  </div>
                </dl>
              </Reveal>

              {/* Newsletter */}
              <Reveal className="rounded-2xl bg-gradient-to-br from-neutral-950 to-brand-deep p-6 text-white shadow-lg">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand">Newsletter</span>
                <h3 className="mt-1 font-display text-sm font-black leading-tight">Stay in the Know</h3>
                <p className="mt-2 text-[11px] leading-relaxed text-white/60">
                  Exclusive test drive invites, price drops and MG news.
                </p>
                <Link
                  href="/contact-us"
                  className="mt-4 block w-full rounded-lg bg-brand py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-brand-dark"
                >
                  Contact Us
                </Link>
              </Reveal>
            </aside>
          </div>
        </section>

        {/* RELATED ARTICLES */}
        {related.length > 0 && (
          <section className="container-px mx-auto max-w-[1400px] pb-16">
            <h2 className="mb-8 font-display text-xl font-black text-slate-900 sm:text-2xl">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((post, i) => (
                <Reveal key={post.slug} delay={i * 80}>
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-brand/20"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <span className={`absolute left-3 top-3 rounded-full border px-2.5 py-0.5 text-[9px] font-bold backdrop-blur-sm ${categoryColors[post.category] || "bg-white/20 text-white border-white/30"}`}>
                        {post.category}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h4 className="font-display text-sm font-black leading-snug text-slate-900 transition-colors group-hover:text-brand line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-400 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="mt-4 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-brand">
                        Read More <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
