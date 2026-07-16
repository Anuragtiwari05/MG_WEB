"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { Calendar, Clock, Search, ArrowRight } from "@/components/icons";
import { blogs } from "@/lib/data";

export default function BlogsClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Group blogs by categories and get counts
  const categories = ["All", ...Array.from(new Set(blogs.map((b) => b.category)))];

  const getCategoryCount = (cat: string) => {
    if (cat === "All") return blogs.length;
    return blogs.filter((b) => b.category === cat).length;
  };

  // Filtered blogs based on search and category
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Featured blog is the first one in the filtered list (or first in general if none matches)
  const featuredBlog = filteredBlogs[0] || blogs[0];
  const gridBlogs = filteredBlogs.slice(1);

  // Popular posts (we'll just show up to 4 posts)
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
      <main className="mt-[80px] min-h-screen bg-white text-slate-800">
        {/* ── HERO BANNER ── */}
        <section className="relative overflow-hidden bg-brand-deep py-12 text-white sm:py-16">
          <div className="absolute inset-0">
            <Image
              src="/images/blog-ev.png"
              alt="MG Motors Blog Hub banner"
              fill
              priority
              className="object-cover opacity-20"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-deep via-brand-deep/85 to-brand-deep/50" />
          </div>
          <div className="container-px relative mx-auto max-w-[1400px]">
            <Reveal variant="fade-up">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                MG Insights Hub
              </span>
              <h1 className="mt-2 font-display text-3xl font-black uppercase leading-tight sm:text-4xl">
                Car Insights.<br />Expert Advice.
              </h1>
              <p className="mt-3 max-w-lg text-xs leading-relaxed text-white/70">
                Stay updated with the latest JSW MG Motor trends, electric vehicle guides, and official news from our experts.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── MAIN CONTENT GRID ── */}
        <section className="container-px mx-auto max-w-[1400px] py-10 sm:py-14">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
            
            {/* LEFT COLUMN: ARTICLES */}
            <div className="space-y-10">
              
              {/* Featured Blog */}
              {featuredBlog && (
                <Reveal variant="fade-up">
                  <div className="mb-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand">
                      Featured Story
                    </span>
                  </div>
                  <div className="group overflow-hidden rounded-xl border border-slate-100 bg-slate-50/30 shadow-sm transition-all hover:shadow-md lg:grid lg:grid-cols-2">
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-50/80 p-5 lg:aspect-auto lg:h-full">
                      <Image
                        src={featuredBlog.image}
                        alt={featuredBlog.title}
                        fill
                        className="object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                    </div>
                    <div className="flex flex-col justify-center p-5 sm:p-7">
                      <span className="mb-2 w-fit rounded-full bg-brand-light/10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brand">
                        {featuredBlog.category}
                      </span>
                      <h2 className="font-display text-lg font-black text-slate-900 transition-colors group-hover:text-brand sm:text-xl line-clamp-2">
                        {featuredBlog.title}
                      </h2>
                      <div className="my-2.5 flex items-center gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {featuredBlog.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {featuredBlog.readTime}
                        </span>
                      </div>
                      <p className="mb-4 text-xs leading-relaxed text-slate-500 line-clamp-2">
                        {featuredBlog.excerpt}
                      </p>
                      <button 
                        onClick={() => alert(`Reading: ${featuredBlog.title}`)}
                        className="inline-flex w-fit items-center gap-1 text-xs font-bold uppercase tracking-wider text-brand transition-colors hover:text-brand-dark"
                      >
                        Read More <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </Reveal>
              )}

              {/* Grid of All Blogs */}
              <div>
                <h3 className="mb-5 font-display text-sm font-black uppercase tracking-wider text-slate-950">
                  All Articles ({filteredBlogs.length})
                </h3>
                
                {gridBlogs.length > 0 ? (
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {gridBlogs.map((post, i) => (
                      <Reveal key={post.title} delay={i * 80}>
                        <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                          <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-50/50 p-4">
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-105"
                              sizes="(max-width: 640px) 100vw, 30vw"
                            />
                          </div>
                          <div className="flex flex-1 flex-col p-4.5">
                            <span className="w-fit rounded-full bg-brand-light/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brand">
                              {post.category}
                            </span>
                            <h4 className="mt-2.5 text-sm font-bold leading-snug text-slate-900 transition-colors group-hover:text-brand line-clamp-2 min-h-[40px]">
                              {post.title}
                            </h4>
                            <p className="mt-1.5 text-xs leading-relaxed text-slate-400 line-clamp-2">
                              {post.excerpt}
                            </p>
                            <div className="mt-3.5 flex items-center gap-3 text-[10px] text-slate-400">
                              <span>{post.date}</span>
                              <span>•</span>
                              <span>{post.readTime}</span>
                            </div>
                            <button
                              onClick={() => alert(`Reading: ${post.title}`)}
                              className="mt-4 inline-flex w-fit items-center gap-1 text-xs font-bold uppercase tracking-wider text-brand transition-colors hover:text-brand-dark"
                            >
                              Read More <ArrowRight className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </article>
                      </Reveal>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-200 py-10 text-center">
                    <p className="text-xs font-medium text-slate-400">
                      No articles found matching your search.
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedCategory("All");
                      }}
                      className="mt-2 text-xs font-bold text-brand uppercase tracking-wider hover:underline"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: SIDEBAR */}
            <aside className="space-y-6">
              
              {/* Search Box */}
              <Reveal className="relative">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-2.5 pl-9 pr-4 text-xs transition-colors focus:border-brand focus:bg-white focus:outline-none"
                />
              </Reveal>

              {/* Categories */}
              <Reveal>
                <h3 className="mb-3 font-display text-[10px] font-black uppercase tracking-widest text-slate-950">
                  Categories
                </h3>
                <ul className="space-y-1.5">
                  {categories.map((cat) => (
                    <li key={cat}>
                      <button
                        onClick={() => setSelectedCategory(cat)}
                        className={`flex w-full items-center justify-between py-1 text-xs font-medium transition-colors ${
                          selectedCategory === cat
                            ? "text-brand font-bold"
                            : "text-slate-600 hover:text-brand"
                        }`}
                      >
                        <span>{cat}</span>
                        <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[8px] text-slate-400">
                          {getCategoryCount(cat)}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* Popular Posts */}
              <Reveal>
                <h3 className="mb-3 font-display text-[10px] font-black uppercase tracking-widest text-slate-950">
                  Popular Posts
                </h3>
                <ul className="space-y-3.5">
                  {popularPosts.map((post) => (
                    <li key={post.title}>
                      <button
                        onClick={() => alert(`Reading: ${post.title}`)}
                        className="flex gap-2.5 text-left group"
                      >
                        <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded bg-slate-50 p-1 border border-slate-100">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-contain p-1 transition-transform group-hover:scale-105"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-bold leading-tight text-slate-900 group-hover:text-brand line-clamp-2">
                            {post.title}
                          </p>
                          <p className="mt-0.5 text-[9px] text-slate-400">{post.date}</p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* Newsletter Box */}
              <Reveal className="rounded-xl bg-brand-deep p-5 text-white border border-white/5">
                <h3 className="font-display text-xs font-black uppercase tracking-wider">
                  Stay Informed
                </h3>
                <p className="mt-1.5 text-[11px] leading-relaxed text-white/60">
                  Subscribe to our newsletter for exclusive test drive invites, price drops, and green mobility updates.
                </p>
                {subscribed ? (
                  <div className="mt-3.5 rounded-lg bg-white/10 p-2.5 text-center text-xs font-semibold text-brand">
                    Subscribed successfully!
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="mt-3.5 space-y-2.5">
                    <input
                      required
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded bg-white/5 border border-white/10 px-3 py-1.5 text-xs text-white placeholder:text-white/40 focus:border-brand focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="w-full rounded bg-brand py-1.5 text-center text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-brand-dark"
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
