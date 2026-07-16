import Image from "next/image";
import Link from "next/link";
import { blogs } from "@/lib/data";
import { ArrowRight } from "./icons";
import Reveal from "./Reveal";

export default function Blogs() {
  // Show first 4 blogs on homepage
  const homepageBlogs = blogs.slice(0, 4);

  return (
    <section id="blogs" className="scroll-mt-24 bg-bg-2 py-14 lg:py-20">
      <div className="container-px mx-auto max-w-[1400px]">
        {/* Header */}
        <Reveal className="mb-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">
              Latest from our Blog
            </h2>
          </div>
          <Link
            href="/blogs"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-light"
          >
            View All Blogs
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>

        {/* 4-column equal grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {homepageBlogs.map((post, i) => (
            <Reveal key={post.title} delay={i * 70}>
              <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_0_rgba(0,0,0,0.08)]">
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-50/50 p-4">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain p-3 transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-muted">
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="mt-2 text-sm font-bold leading-snug text-text transition-colors group-hover:text-brand sm:text-base line-clamp-2 min-h-[40px]">
                    {post.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-muted line-clamp-2">
                    {post.excerpt}
                  </p>
                  <Link
                    href="/blogs"
                    className="group/link mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand transition-colors hover:text-brand-light"
                  >
                    Read more
                    <ArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
