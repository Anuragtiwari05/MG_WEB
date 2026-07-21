"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { Search, ArrowRight } from "@/components/icons";
import { blogs } from "@/lib/data";

export default function BlogsClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const categories = ["All", "Models", "Ownership", "Service", "Finance", "Electric"];

  const filteredBlogs = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return blogs.filter((blog) => {
      const matchesSearch =
        !q ||
        blog.title.toLowerCase().includes(q) ||
        blog.excerpt.toLowerCase().includes(q) ||
        blog.category.toLowerCase().includes(q) ||
        blog.author.toLowerCase().includes(q);

      let matchesCategory = true;
      if (selectedCategory === "Models") matchesCategory = blog.category === "Buying Guide" || blog.category === "MG News";
      else if (selectedCategory === "Ownership") matchesCategory = blog.category === "Ownership Tips" || blog.category === "Car Care";
      else if (selectedCategory === "Service") matchesCategory = blog.category === "Car Care" || blog.category === "Ownership Tips";
      else if (selectedCategory === "Finance") matchesCategory = blog.category === "Buying Guide";
      else if (selectedCategory === "Electric") matchesCategory = blog.category === "Electric Vehicles" || blog.category === "Technology";

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const featuredBlog = filteredBlogs[0] || blogs[0];
  const gridBlogs = filteredBlogs.slice(1);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <>
      <Navbar />
      <main className="mt-[60px] min-h-screen bg-white text-slate-800">

        {/* HERO BANNER SECTION */}
        <section className="relative overflow-hidden bg-neutral-950 py-16 text-white lg:py-20">
          <Image
            src="/images/m9-night.webp"
            alt="MG Motor blog journal"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(600px 300px at 85% -10%, rgba(228,0,43,0.25), transparent 60%), repeating-linear-gradient(100deg, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 1px, transparent 1px, transparent 90px)",
            }}
          />

          <div className="container-px relative mx-auto max-w-[1180px]">
            <Reveal variant="fade-up">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-light">
                MG Motor Journal
              </span>
              <h1 className="mt-2.5 max-w-2xl font-display text-3xl font-semibold leading-[1.18] tracking-tight sm:text-4xl lg:text-[2.5rem]">
                Everything you need to know before, during and after the drive.
              </h1>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base font-light">
                Buying guides, maintenance tips and dealership news from Mumbai's trusted MG team.
              </p>

              {/* Search Form */}
              <form onSubmit={(e) => e.preventDefault()} role="search" className="mt-8 flex max-w-md gap-2.5">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search articles, e.g. 'Hector maintenance'"
                    aria-label="Search articles"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-md border border-white/20 bg-white/5 py-3 pl-10 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/40 focus:border-brand-light focus:ring-2 focus:ring-brand-light/20"
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-white/50 hover:text-white"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className="shrink-0 rounded-md bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-light"
                >
                  Search
                </button>
              </form>

              {/* Stats Bar */}
              <div className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-white/15 pt-7">
                <div>
                  <p className="font-display text-xl font-semibold sm:text-2xl">{blogs.length}+</p>
                  <p className="mt-1 text-xs text-white/60">Articles published</p>
                </div>
                <div>
                  <p className="font-display text-xl font-semibold sm:text-2xl">5</p>
                  <p className="mt-1 text-xs text-white/60">Topics covered</p>
                </div>
                <div>
                  <p className="font-display text-xl font-semibold sm:text-2xl">Monthly</p>
                  <p className="mt-1 text-xs text-white/60">New stories added</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CATEGORY PILLS BAR */}
        <div className="bg-white pt-9">
          <div className="container-px mx-auto max-w-[1180px]">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
                    selectedCategory === cat
                      ? "border-brand bg-brand text-white"
                      : "border-slate-200 text-slate-600 hover:border-brand hover:text-brand"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FEATURED ARTICLE HERO CARD */}
        {featuredBlog && (
          <section className="bg-white pt-10">
            <div className="container-px mx-auto max-w-[1180px]">
              <Reveal variant="fade-up">
                <div className="grid overflow-hidden rounded-xl border border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.04)] lg:grid-cols-[1.05fr_1fr]">
                  <div className="relative min-h-[280px] lg:min-h-[340px]">
                    <Image
                      src={featuredBlog.coverImage}
                      alt={featuredBlog.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <span className="absolute left-5 top-5 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-brand shadow-sm">
                      Featured
                    </span>
                  </div>
                  <div className="flex flex-col justify-center p-8 lg:p-11">
                    <span className="inline-flex w-fit items-center rounded-md bg-brand/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand">
                      {featuredBlog.category}
                    </span>
                    <h2 className="mt-4 font-display text-2xl font-semibold leading-snug text-slate-900">
                      {featuredBlog.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-slate-500 font-light">
                      {featuredBlog.excerpt}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                      <span>{featuredBlog.category}</span>
                      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-slate-300" />
                      <span>{featuredBlog.readTime}</span>
                      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-slate-300" />
                      <span>{featuredBlog.date}</span>
                    </div>
                    <Link
                      href={`/blogs/${featuredBlog.slug}`}
                      className="group mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-light"
                    >
                      Read the full guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* LATEST ARTICLES — single-column list */}
        <section className="bg-white pb-16 pt-14">
          <div className="container-px mx-auto max-w-[1180px]">
            <div className="mb-2 flex items-baseline justify-between">
              <h3 className="font-display text-xl font-semibold text-slate-900">Latest articles</h3>
              <span className="text-sm text-slate-500">
                Showing {gridBlogs.length} of {blogs.length}
              </span>
            </div>

            <div className="divide-y divide-slate-200">
              {gridBlogs.map((post, i) => (
                <Reveal key={post.slug} delay={i * 50}>
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="group flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:gap-8"
                  >
                    <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-lg bg-slate-100 sm:w-72 lg:w-80">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 320px"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <span className="inline-flex w-fit items-center rounded-md bg-brand/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand">
                        {post.category}
                      </span>
                      <h3 className="mt-3 text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-brand sm:text-xl">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500 font-light">
                        {post.excerpt}
                      </p>
                      <div className="mt-4 flex items-center gap-2.5 text-xs text-slate-400">
                        <span>{post.date}</span>
                        <span aria-hidden="true" className="h-0.5 w-0.5 rounded-full bg-slate-300" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>

            {gridBlogs.length < blogs.length && (
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => setSelectedCategory("All")}
                  className="inline-flex items-center gap-2 rounded-md border border-brand bg-transparent px-6 py-3 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
                >
                  Show all articles
                </button>
              </div>
            )}
          </div>
        </section>

        {/* NEWSLETTER BANNER */}
        <section className="bg-white">
          <div className="container-px mx-auto max-w-[1180px] pb-20 pt-16">
            <div className="relative overflow-hidden rounded-xl bg-neutral-950 px-6 py-12 text-white sm:px-10 sm:py-14">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(500px 260px at 12% 20%, rgba(228,0,43,0.3), transparent 60%)",
                }}
              />
              <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                <div>
                  <h3 className="font-display text-2xl font-semibold">Never miss an update</h3>
                  <p className="mt-2 max-w-sm text-sm text-white/70 font-light">
                    New guides, maintenance reminders and offer alerts, straight to your inbox.
                  </p>
                </div>
                <div className="w-full sm:w-auto">
                  {subscribed ? (
                    <div className="rounded-md bg-emerald-500/20 border border-emerald-500/40 px-4 py-3 text-sm font-semibold text-emerald-400">
                      ✓ Subscribed successfully!
                    </div>
                  ) : (
                    <form onSubmit={handleSubscribe} className="flex gap-2.5">
                      <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        aria-label="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/40 focus:border-brand-light focus:ring-2 focus:ring-brand-light/20 sm:w-60"
                      />
                      <button
                        type="submit"
                        className="shrink-0 whitespace-nowrap rounded-md bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-light"
                      >
                        Subscribe
                      </button>
                    </form>
                  )}
                  <p className="mt-2.5 text-xs text-white/50">One email a month. No spam, ever.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM QUESTION / BOOK TEST DRIVE BANNER */}
        <section className="bg-brand py-12 lg:py-16">
          <div className="container-px mx-auto flex max-w-[1180px] flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
                Have a question about your next MG?
              </h2>
              <p className="mt-2 max-w-lg text-sm text-white/80 font-light">
                Our team can help you compare models, plan your finance or book a test drive at a showroom near you.
              </p>
            </div>
            <Link
              href="/#test-drive"
              className="group inline-flex shrink-0 items-center gap-2 rounded bg-white px-6 py-3 text-sm font-semibold text-brand transition-all hover:bg-white/90"
            >
              Book a Test Drive
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
