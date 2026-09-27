"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { experience } from "@/data/content";
import { play } from "@/lib/sound";
import Reveal from "../Reveal";
import { Section } from "../Sections";

// Deterministic barcode so server and client render the same bars.
const BARS = Array.from({ length: 48 }, (_, i) => ((i * 7919) % 5) + 1);

export default function Experience() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const printer = useRef<HTMLDivElement>(null);
  const printed = useInView(printer, { once: true, margin: "0px 0px -15% 0px" });

  useEffect(() => {
    if (printed && !reduce) play("print");
  }, [printed, reduce]);

  return (
    <Section
      id="experience"
      title="Experience"
      hint="Your receipt is printing. Tap a line item for details."
    >
      <div className="grid items-start gap-12 md:grid-cols-[1fr_460px]">
        <Reveal className="md:sticky md:top-28">
          <p className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Every role, <span className="text-[#F2B705]">itemized.</span>
          </p>
          <p className="mt-4 max-w-sm text-[var(--muted)]">
            From Spring Boot microservices at Amdocs to AI governance at
            Auditrol. 3+ years, no hidden fees.
          </p>
          <div className="mt-8 flex gap-2">
            {experience.map((job, i) => (
              <button
                key={job.role + job.org}
                onClick={() => setOpen(i)}
                aria-label={`Show ${job.role}`}
                className={`h-2 rounded-full transition-all ${
                  open === i ? "w-10 bg-[#F2B705]" : "w-2 bg-[var(--line)]"
                }`}
              />
            ))}
          </div>
        </Reveal>

        {/* Visibility is observed on this unclipped wrapper: a fully clipped
            element can report zero intersection and never start printing. */}
        <div ref={printer} className="relative">
          {/* Printer slot */}
          <div className="relative z-10 mx-auto h-4 w-[calc(100%+24px)] -translate-x-3 rounded-full bg-[var(--machine)] shadow-lg" />
          <motion.div
            initial={reduce ? false : { clipPath: "inset(0 0 100% 0)", y: -30 }}
            animate={printed ? { clipPath: "inset(0 0 0% 0)", y: 0 } : undefined}
            transition={{ duration: 1.8, ease: [0.45, 0, 0.2, 1] }}
            className="receipt -mt-2 px-5 pb-10 pt-8 font-mono text-[13px] sm:px-7"
          >
            <div className="text-center">
              <div className="text-base font-bold tracking-[0.3em]">
                PURVA&apos;S
              </div>
              <div className="text-[11px] opacity-60">
                CAREER RECEIPT · CHARLOTTE, NC
              </div>
            </div>
            <Dashes />

            <ul>
              {experience.map((job, i) => (
                <li key={job.role + job.org} className="border-b border-dashed border-black/15 last:border-0">
                  <button
                    onClick={() => {
                      play("click");
                      setOpen(open === i ? null : i);
                    }}
                    className="flex w-full items-start gap-3 py-3 text-left"
                    aria-expanded={open === i}
                  >
                    <span className="opacity-50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">
                      <span className="block font-bold uppercase">
                        {job.role}
                      </span>
                      <span className="block opacity-60">
                        @ {job.org} · {job.place}
                      </span>
                      <span className="mt-1 block text-[11px] opacity-70 sm:hidden">
                        {job.date}
                      </span>
                    </span>
                    <span className="hidden whitespace-nowrap text-right text-[11px] opacity-70 sm:inline">
                      {job.date.replace("Present", "NOW")}
                    </span>
                    <motion.span
                      animate={{ rotate: open === i ? 45 : 0 }}
                      className="ml-1 font-bold"
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open === i && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden pl-8"
                      >
                        {job.points.map((p) => (
                          <li key={p} className="pb-2 text-[12px] opacity-80">
                            › {p}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>

            <Dashes />
            <Line label="SUBTOTAL ROLES" value={String(experience.length)} />
            <Line label="COFFEE" value="∞" />
            <Line label="TAX" value="$0.00" />
            <div className="mt-2 flex justify-between text-base font-bold">
              <span>TOTAL EXPERIENCE</span>
              <span>3+ YRS</span>
            </div>
            <Dashes />

            <div className="mt-4 flex h-12 items-stretch justify-center gap-[2px]">
              {BARS.map((w, i) => (
                <span
                  key={i}
                  className="bg-black"
                  style={{ width: w, opacity: i % 3 === 0 ? 0 : 1 }}
                />
              ))}
            </div>
            <p className="mt-3 text-center text-[11px] opacity-60">
              THANK YOU FOR VISITING · COME BACK SOON
            </p>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

function Dashes() {
  return <div className="my-3 border-t-2 border-dashed border-black/25" />;
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-0.5 opacity-70">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
