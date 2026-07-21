"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cars, type Car, type CarCategory } from "@/lib/data";
import Reveal from "@/components/Reveal";
import CarModal from "@/components/CarModal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronRight } from "@/components/icons";

const categories: ("All" | CarCategory)[] = [
  "All",
  "SUV",
  "Hatchback",
  "Electric",
  "Select",
];

export default function CarsPage() {
  const [category, setCategory] = useState<"All" | CarCategory>("All");
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const filtered =
    category === "All"
      ? cars
      : category === "Electric"
      ? cars.filter((c) => c.category === "Electric" || c.fuel === "Electric")
      : cars.filter((c) => c.category === category);

  return (
    <>
      <Navbar />
      <main className="mt-[80px] min-h-screen bg-bg-2">
        {/* Hero Section */}
        <section className="bg-white py-12 lg:py-16 border-b border-border">
          <div className="container-px mx-auto max-w-[1400px]">
            <Reveal variant="fade-up">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                Our Lineup
              </p>
              <h1 className="mt-2 font-display text-3xl font-black tracking-wide text-text sm:text-4xl">
                Explore the Full MG Range
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                From zero-emission smart hatchbacks to premium connected SUVs, find the perfect MG vehicle that fits your lifestyle.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Catalog List Section */}
        <section className="py-12 lg:py-16">
          <div className="container-px mx-auto max-w-[1400px]">
            {/* Category selection */}
            <Reveal className="flex flex-wrap gap-2 border-b border-border pb-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    category === cat
                      ? "bg-brand text-white shadow-lg shadow-brand/20"
                      : "bg-white border border-border text-muted hover:text-text hover:bg-bg-2"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </Reveal>

            {/* Cars Grid */}
            <div className="mt-8">
              {filtered.length > 0 ? (
                <div key={category} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((car, i) => (
                    <Reveal
                      key={car.id}
                      delay={i * 80}
                      variant="slide-left"
                      className="h-full"
                    >
                       <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg">
                        {/* Image Container */}
                        <Link
                          href={`/cars/${car.id}`}
                          className="relative block w-full overflow-hidden bg-bg-2 cursor-pointer"
                          style={{ aspectRatio: "16/10" }}
                        >
                          <Image
                            src={car.image}
                            alt={car.alt}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                          />
                        </Link>

                        {/* Card Details */}
                        <div className="flex flex-1 flex-col p-6">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-brand">
                            {car.type}
                          </p>
                          <h3 className="mt-1 font-display text-lg font-black text-text hover:text-brand transition-colors">
                            <Link href={`/cars/${car.id}`}>
                              MG {car.name}
                            </Link>
                          </h3>
                          <p className="mt-2 text-xs text-muted">
                            Starts from{" "}
                            <span className="text-sm font-bold text-text">
                              ₹{car.price} Lakh*
                            </span>
                          </p>
                          <div className="mt-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted bg-bg-2 border border-border/80 rounded px-2.5 py-1 inline-block">
                              {car.fuel}
                            </span>
                          </div>

                          <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-muted">
                            {car.blurb}
                          </p>

                          <div className="mt-auto pt-5">
                            <Link
                              href={`/cars/${car.id}`}
                              className="group/link inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-brand transition-colors hover:text-brand-light"
                            >
                              Explore Details
                              <ChevronRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
                            </Link>
                          </div>
                        </div>
                      </article>
                    </Reveal>
                  ))}
                </div>
              ) : (
                <Reveal className="py-12 text-center bg-white rounded-xl border border-border">
                  <p className="text-base font-medium text-muted">
                    No models currently available under the <span className="font-bold text-brand uppercase">{category}</span> category.
                  </p>
                  <button
                    onClick={() => setCategory("All")}
                    className="mt-4 rounded bg-brand px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-brand-light transition-all"
                  >
                    View All Models
                  </button>
                </Reveal>
              )}
            </div>
          </div>
        </section>

        {/* Specifications Modal Overlay */}
        {selectedCar && (
          <CarModal car={selectedCar} onClose={() => setSelectedCar(null)} />
        )}
      </main>
      <Footer />
    </>
  );
}
