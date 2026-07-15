"use client";

import { useState } from "react";
import { faqData as defaultFaqData } from "@/lib/data";
import { ArrowRight } from "./icons";
import Reveal from "./Reveal";

export default function FAQ({
  id = "faq",
  data = defaultFaqData,
}: {
  id?: string;
  data?: { question: string; answer: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id={id} className="scroll-mt-24 bg-bg-2 py-16 lg:py-24 text-[#0a111a]">
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          
          {/* Left Column: Heading and Action */}
          <Reveal className="lg:col-span-1">
            <div className="sticky top-28">
              <h2 className="font-display text-4xl font-extrabold leading-[1.1] text-[#0a111a] sm:text-5xl">
                Frequently Asked
                <br />
                <span className="text-brand relative inline-block mt-1">
                  Questions.
                  <span className="absolute bottom-2 left-0 w-full h-[4px] bg-brand/15" />
                </span>
              </h2>
              <p className="mt-5 text-sm sm:text-base text-black/60 leading-relaxed max-w-sm">
                Still unsure about something? A quick test drive or chat with our experts clears it up faster than any FAQ.
              </p>
              
              <a
                href="#offers"
                className="mt-8 group inline-flex items-center gap-2 rounded-full border border-black/15 bg-transparent px-6 py-3 text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-black hover:text-white"
              >
                ASK US DIRECTLY
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>

          {/* Right Column: Accordion List */}
          <Reveal className="lg:col-span-2 space-y-0">
            <div className="divide-y divide-black/10 border-t border-b border-black/10">
              {data.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={i} className="py-4 sm:py-5">
                    <button
                      onClick={() => toggle(i)}
                      className="flex w-full items-center justify-between gap-4 text-left py-2 transition-colors group"
                    >
                      <span className={`text-base sm:text-lg font-bold tracking-tight transition-colors duration-300 ${
                        isOpen ? "text-brand" : "text-black group-hover:text-brand"
                      }`}>
                        {faq.question}
                      </span>
                      
                      {/* Plus to X rotatable custom SVG icon */}
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-black/[0.03] transition-colors group-hover:bg-black/[0.06]">
                        <svg
                          className={`h-4 w-4 shrink-0 transition-all duration-300 ${
                            isOpen ? "text-brand rotate-45" : "text-black/40 rotate-0"
                          }`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </span>
                    </button>
                    
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-sm leading-relaxed text-black/60 pr-8">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
