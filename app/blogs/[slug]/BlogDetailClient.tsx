"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/icons";
import { blogs, type Blog } from "@/lib/data";

type Props = { blog: Blog; related: Blog[] };

export default function BlogDetailClient({ blog, related }: Props) {
  const index = blogs.findIndex((b) => b.slug === blog.slug);
  const prevBlog = index > 0 ? blogs[index - 1] : null;
  const nextBlog = index !== -1 && index < blogs.length - 1 ? blogs[index + 1] : null;

  return (
    <>
      <Navbar />
      <main className="mt-[60px] min-h-screen bg-white text-slate-800">

        {/* FULL-BLEED HERO — title/category/meta overlaid on the cover image */}
        <section className="relative flex min-h-[380px] items-end overflow-hidden bg-neutral-950 sm:min-h-[460px] lg:min-h-[520px]">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

          <div className="container-px relative mx-auto w-full max-w-3xl pb-10 pt-24 sm:pb-14">
            <Reveal variant="fade-up">
              <nav className="flex items-center gap-1.5 text-xs text-white/60" aria-label="Breadcrumb">
                <Link href="/" className="transition-colors hover:text-white">Home</Link>
                <span aria-hidden="true">/</span>
                <Link href="/blogs" className="transition-colors hover:text-white">Blog</Link>
              </nav>

              <span className="mt-4 inline-flex w-fit items-center rounded-full bg-brand px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                {blog.category}
              </span>

              <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.5rem]">
                {blog.title}
              </h1>

              <div className="mt-4 flex items-center gap-2.5 text-xs text-white/70 sm:text-sm">
                <span>{blog.date}</span>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/40" />
                <span>{blog.readTime}</span>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/40" />
                <span>By {blog.author}</span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ARTICLE CONTENT */}
        <section className="bg-white py-10 lg:py-14">
          <div className="container-px mx-auto max-w-3xl">
            <Reveal variant="fade-up" delay={150}>
              <article
                className="prose prose-slate max-w-none
                  prose-headings:font-display prose-headings:text-xl prose-headings:sm:text-2xl prose-headings:font-bold prose-headings:text-slate-900 prose-headings:mt-8 prose-headings:mb-3 prose-headings:tracking-tight
                  prose-p:text-sm prose-p:sm:text-base prose-p:leading-relaxed prose-p:text-slate-600 prose-p:font-light prose-p:mb-4
                  prose-blockquote:border-l-4 prose-blockquote:border-brand prose-blockquote:bg-brand/5 prose-blockquote:pl-5 prose-blockquote:py-3 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-slate-700 prose-blockquote:font-medium prose-blockquote:my-6
                  prose-ul:my-4 prose-ul:space-y-1.5 prose-li:text-slate-600 prose-li:text-sm prose-li:sm:text-base prose-li:font-light
                  prose-strong:text-slate-900 prose-strong:font-bold
                  prose-a:text-brand prose-a:font-bold prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Back Button */}
              <div className="mt-10 border-t border-slate-200 pt-6">
                <Link
                  href="/blogs"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-light"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
                  >
                    <path d="M19 12H5M11 18l-6-6 6-6" />
                  </svg>
                  Back to all blogs
                </Link>
              </div>
            </Reveal>

            {/* PREV / NEXT ARTICLE NAV */}
            {(prevBlog || nextBlog) && (
              <div className="mt-8 grid grid-cols-1 gap-3 border-t border-slate-200 pt-8 sm:grid-cols-2">
                {prevBlog ? (
                  <Link
                    href={`/blogs/${prevBlog.slug}`}
                    className="group rounded-lg border border-slate-200 p-4 transition-colors hover:border-brand/40 hover:bg-brand/5"
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      ← Previous
                    </span>
                    <p className="mt-1 line-clamp-2 text-sm font-bold text-slate-900 transition-colors group-hover:text-brand">
                      {prevBlog.title}
                    </p>
                  </Link>
                ) : (
                  <div />
                )}
                {nextBlog && (
                  <Link
                    href={`/blogs/${nextBlog.slug}`}
                    className="group rounded-lg border border-slate-200 p-4 text-left transition-colors hover:border-brand/40 hover:bg-brand/5 sm:text-right"
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      Next →
                    </span>
                    <p className="mt-1 line-clamp-2 text-sm font-bold text-slate-900 transition-colors group-hover:text-brand">
                      {nextBlog.title}
                    </p>
                  </Link>
                )}
              </div>
            )}
          </div>
        </section>

        {/* BOTTOM CTA SECTION */}
        <section className="bg-slate-50 py-12 lg:py-16">
          <div className="container-px mx-auto max-w-[1400px]">
            <Reveal variant="fade-up">
              <div className="flex flex-col items-center gap-4 text-center">
                <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
                  Ready to take the next step?
                </h2>
                <p className="max-w-md text-sm text-slate-500 font-light">
                  Book a test drive or talk to our team about finance, exchange and service at an MG Motor showroom near you.
                </p>
                <div className="mt-2 flex flex-wrap justify-center gap-3">
                  <Link
                    href="/#test-drive"
                    className="group inline-flex items-center gap-2 rounded bg-brand px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-light hover:shadow-lg hover:shadow-brand/20 cursor-pointer"
                  >
                    Book a Test Drive
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href="/cars"
                    className="inline-flex items-center gap-2 rounded border border-brand px-6 py-3 text-sm font-semibold text-brand transition-all hover:bg-brand hover:text-white cursor-pointer"
                  >
                    Browse Cars
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* RELATED ARTICLES SECTION */}
        {related.length > 0 && (
          <section className="bg-white py-14 lg:py-20">
            <div className="container-px mx-auto max-w-[1400px]">
              <Reveal variant="fade-up" className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">Keep reading</p>
                <h2 className="mt-2 font-display text-2xl font-bold text-slate-900 sm:text-3xl">
                  Related articles
                </h2>
              </Reveal>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((post, i) => (
                  <Reveal key={post.slug} delay={i * 90}>
                    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_2px_12px_0_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_0_rgba(0,0,0,0.12)]">
                      <Link href={`/blogs/${post.slug}`} className="flex h-full flex-col">
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                        <div className="flex flex-1 flex-col p-4">
                          <div className="flex items-center gap-2 text-xs text-slate-400">
                            <span className="font-semibold text-brand">{post.category}</span>
                            <span aria-hidden="true" className="text-slate-300">·</span>
                            <span>{post.date}</span>
                          </div>
                          <h3 className="mt-2 flex-1 text-sm font-bold leading-snug text-slate-900 transition-colors group-hover:text-brand sm:text-base">
                            {post.title}
                          </h3>
                          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500 font-light sm:text-sm">
                            {post.excerpt}
                          </p>
                          <span className="group/link mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand transition-colors group-hover:text-brand-light">
                            Read more
                            <ArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-0.5" />
                          </span>
                        </div>
                      </Link>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>
      <Footer />
    </>
  );
}
