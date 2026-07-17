"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { Calendar, Clock, Search, ArrowRight } from "@/components/icons";
import { blogs } from "@/lib/data";

const categoryColors: Record<string, string> = {
  "Electric Vehicles": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "MG News": "bg-blue-50 text-blue-700 border-blue-200",
  "Ownership Tips": "bg-amber-50 text-amber-700 border-amber-200",
  Technology: "bg-violet-50 text-violet-700 border-violet-200",
  "Buying Guide": "bg-rose-50 text-rose-700 border-rose-200",
  "Car Care": "bg-slate-100 text-slate-700 border-slate-200",
};

export default function BlogsClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(blogs.map((b) => b.category)))],
    []
  );

  const filteredBlogs = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return blogs.filter((blog) => {
      const matchesSearch =
        !q ||
        blog.title.toLowerCase().includes(q) ||
        blog.excerpt.toLowerCase().includes(q) ||
        blog.category.toLowerCase().includes(q) ||
        blog.author.toLowerCase().includes(q);
      const matchesCategory =
        selectedCategory === "All" || blog.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const featuredBlog = filteredBlogs[0] || blogs[0];
  const gridBlogs = filteredBlogs.slice(1);
  const popularPosts = blogs.slice(0, 4);

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
      <main className="mt-[80px] min-h-screen bg-[#f8f8f8] text-slate-800">

        {/* CINEMATIC HERO */}
        <section className="relative overflow-hidden bg-neutral-950 text-white">
          <div className="absolute inset-0">
            <Image
              src="https://mgmotor.scene7.com/is/image/mgmotor/m9-night-full?fmt=webp-alpha&resMode=bisharp&fit=constrain&qlt=90&wid=1920"
              alt="MG Insights Hub"
              fill
              priority
              className="object-cover opacity-85 lg:object-[65%_center]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
          </div>

          <div className="container-px relative z-10 mx-auto max-w-[1400px] py-20 sm:py-28 lg:py-32">
            <Reveal variant="fade-up">
              <span className="inline-block rounded-full border border-brand/40 bg-brand/15 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-brand backdrop-blur-sm">
                MG Insights Hub
              </span>
              <h1 className="mt-5 max-w-2xl font-display text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                Car Insights.<br />
                <span className="text-brand">Expert</span> Advice.
              </h1>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/60 sm:text-base">
                Stay updated with the latest JSW MG Motor trends, electric vehicle guides, and official news from our Mumbai experts.
              </p>

              {/* Hero Search Bar */}
              <div className="mt-8 flex max-w-md overflow-hidden rounded-xl border border-white/10 bg-white/10 backdrop-blur-md transition-all duration-300 focus-within:border-brand focus-within:bg-white/15">
                <Search className="my-auto ml-4 h-4 w-4 shrink-0 text-white/50" />
                <input
                  type="text"
                  placeholder="Search articles, models, topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent px-3 py-4 text-sm text-white placeholder:text-white/40 focus:outline-none"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="mr-4 my-auto text-xs font-bold text-white/40 transition-colors hover:text-white"
                  >
                    x
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="mt-5 flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full border px-4 py-1.5 text-[11px] font-semibold transition-all duration-200 ${
                      selectedCategory === cat
                        ? "border-brand bg-brand text-white shadow-lg shadow-brand/30"
                        : "border-white/20 bg-white/10 text-white/70 backdrop-blur-sm hover:border-white/40 hover:bg-white/15 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
        </section>

        {/* MAIN CONTENT */}
        <section className="container-px mx-auto max-w-[1400px] py-12 sm:py-16">

          {searchTerm && (
            <Reveal className="mb-6 flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm shadow-sm ring-1 ring-slate-100">
              <Search className="h-4 w-4 text-brand" />
              <span className="text-slate-500">
                <strong className="text-slate-800">{filteredBlogs.length}</strong> result{filteredBlogs.length !== 1 ? "s" : ""} for{" "}
                <strong className="text-brand">"{searchTerm}"</strong>
              </span>
              <button onClick={() => setSearchTerm("")} className="ml-auto text-xs font-bold text-brand hover:underline">
                Clear
              </button>
            </Reveal>
          )}

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">

            {/* LEFT: ARTICLES */}
            <div className="min-w-0 space-y-10">

              {/* Featured Article */}
              {featuredBlog && (
                <Reveal variant="fade-up">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-brand">
                    {searchTerm || selectedCategory !== "All" ? "Top Result" : "Featured Article"}
                  </p>
                  <Link
                    href={`/blogs/${featuredBlog.slug}`}
                    className="group block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:shadow-xl hover:ring-brand/20 lg:grid lg:grid-cols-[1.15fr_1fr]"
                  >
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900 lg:aspect-auto lg:min-h-[360px]">
                      <Image
                        src={featuredBlog.coverImage}
                        alt={featuredBlog.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 55vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <span className={`absolute left-4 top-4 rounded-full border px-3 py-1 text-[10px] font-bold backdrop-blur-sm ${categoryColors[featuredBlog.category] || "bg-white/20 text-white border-white/30"}`}>
                        {featuredBlog.category}
                      </span>
                    </div>
                    <div className="flex flex-col justify-between p-7 sm:p-9">
                      <div>
                        <h2 className="font-display text-2xl font-black leading-snug text-slate-900 transition-colors group-hover:text-brand sm:text-3xl">
                          {featuredBlog.title}
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-slate-500 line-clamp-3">
                          {featuredBlog.excerpt}
                        </p>
                      </div>
                      <div className="mt-7">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand/10 text-[9px] font-bold text-brand">
                              {featuredBlog.author[0]}
                            </div>
                            <span className="font-medium text-slate-600">{featuredBlog.author}</span>
                          </div>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {featuredBlog.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {featuredBlog.readTime}
                          </span>
                        </div>
                        <div className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all group-hover:bg-brand-dark group-hover:gap-3 group-hover:shadow-lg group-hover:shadow-brand/30">
                          Read Article <ArrowRight className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              )}

              {/* Grid */}
              {gridBlogs.length > 0 && (
                <div>
                  <h3 className="mb-6 text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                    All Articles ({filteredBlogs.length})
                  </h3>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {gridBlogs.map((post, i) => (
                      <Reveal key={post.slug} delay={i * 60}>
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
                            <h4 className="font-display text-sm font-black leading-snug text-slate-900 transition-colors group-hover:text-brand line-clamp-2 sm:text-base">
                              {post.title}
                            </h4>
                            <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-400 line-clamp-2">
                              {post.excerpt}
                            </p>
                            <div className="mt-4 flex items-center justify-between text-[10px] text-slate-400">
                              <div className="flex items-center gap-1.5">
                                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand/10 text-[8px] font-bold text-brand">
                                  {post.author[0]}
                                </div>
                                <span className="font-medium text-slate-500">{post.author}</span>
                              </div>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {post.readTime}
                              </span>
                            </div>
                            <div className="mt-4 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-brand transition-all group-hover:text-brand-dark">
                              Read More <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </Link>
                      </Reveal>
                    ))}
                  </div>
                </div>
              )}

              {filteredBlogs.length === 0 && (
                <div className="rounded-2xl border-2 border-dashed border-slate-200 py-20 text-center">
                  <Search className="mx-auto h-10 w-10 text-slate-200" />
                  <p className="mt-4 text-sm font-semibold text-slate-400">
                    No articles found
                  </p>
                  <button
                    onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
                    className="mt-3 text-xs font-bold uppercase tracking-wider text-brand hover:underline"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>

            {/* RIGHT: SIDEBAR */}
            <aside className="space-y-6">

              <Reveal className="hidden lg:block">
                <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all focus-within:border-brand focus-within:shadow-md">
                  <Search className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-transparent py-3 pl-9 pr-4 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
              </Reveal>

              <Reveal className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                <h3 className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-800">
                  Categories
                </h3>
                <ul className="space-y-1">
                  {categories.map((cat) => (
                    <li key={cat}>
                      <button
                        onClick={() => setSelectedCategory(cat)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                          selectedCategory === cat
                            ? "bg-brand font-bold text-white shadow-sm"
                            : "text-slate-600 hover:bg-slate-50 hover:text-brand"
                        }`}
                      >
                        <span>{cat}</span>
                        <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                          selectedCategory === cat ? "bg-white/25 text-white" : "bg-slate-100 text-slate-400"
                        }`}>
                          {cat === "All" ? blogs.length : blogs.filter((b) => b.category === cat).length}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                <h3 className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-800">
                  Popular Posts
                </h3>
                <ul className="space-y-4">
                  {popularPosts.map((post) => (
                    <li key={post.slug}>
                      <Link href={`/blogs/${post.slug}`} className="group flex gap-3">
                        <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] font-bold leading-tight text-slate-800 transition-colors group-hover:text-brand line-clamp-2">
                            {post.title}
                          </p>
                          <p className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                            <Clock className="h-2.5 w-2.5" />
                            {post.readTime}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className="rounded-2xl bg-gradient-to-br from-neutral-950 to-brand-deep p-6 text-white shadow-lg">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand">Newsletter</span>
                <h3 className="mt-1 font-display text-base font-black leading-tight">Stay in the Know</h3>
                <p className="mt-2 text-[11px] leading-relaxed text-white/60">
                  Exclusive test drive invites, price drops, and green mobility updates.
                </p>
                {subscribed ? (
                  <div className="mt-4 rounded-lg border border-brand/30 bg-brand/20 p-3 text-center text-xs font-semibold text-brand">
                    Subscribed successfully!
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="mt-4 space-y-2.5">
                    <input
                      required
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-xs text-white placeholder:text-white/30 transition-all focus:border-brand focus:bg-white/10 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="w-full rounded-lg bg-brand py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/30"
                    >
                      Subscribe
                    </button>
                  </form>
                )}
              </Reveal>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
