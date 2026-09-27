"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { about, nutrition } from "@/data/content";
import CountUp from "../CountUp";
import Reveal from "../Reveal";
import { Section } from "../Sections";

export default function About() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <Section id="about" title="About" hint="Read the label. Hover a row.">
      <div className="grid items-start gap-12 md:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          {about.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p className="text-xl leading-relaxed text-[var(--muted)] sm:text-2xl">
                {p}
              </p>
            </Reveal>
          ))}
          <Reveal delay={0.25} className="grid grid-cols-2 gap-4 pt-4">
            {nutrition.facts.map((f) => (
              <div key={f.label} className="card">
                <div className="text-4xl font-semibold tracking-tight">
                  <CountUp to={f.value} suffix={f.suffix} />
                </div>
                <div className="mt-1 text-sm text-[var(--muted)]">{f.label}</div>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <motion.div
            whileHover={{ rotate: 0, y: -4 }}
            initial={{ rotate: 1.5 }}
            className="nutrition rounded-sm p-4 font-[Helvetica,Arial,sans-serif]"
          >
            <div className="text-[40px] font-black leading-none tracking-tight">
              Nutrition Facts
            </div>
            <div className="mt-1 flex justify-between border-b-[10px] border-current pb-1 text-sm">
              <span className="font-bold">Serving size</span>
              <span className="font-bold">{nutrition.serving}</span>
            </div>

            <div className="flex items-end justify-between border-b-[5px] border-current py-1">
              <div>
                <div className="text-xs font-bold">Amount per serving</div>
                <div className="text-3xl font-black">
                  {nutrition.calories.label}
                </div>
              </div>
              <div className="text-5xl font-black">
                <CountUp
                  to={nutrition.calories.value}
                  suffix={nutrition.calories.suffix}
                />
              </div>
            </div>

            <div className="border-b border-current py-1 text-right text-xs font-bold">
              % Daily Value*
            </div>

            <ul onMouseLeave={() => setHover(null)}>
              {nutrition.rows.map((r, i) => (
                <li
                  key={r.label}
                  onMouseEnter={() => setHover(i)}
                  className="relative border-b border-current/40 py-1.5 text-sm"
                >
                  <motion.span
                    className="absolute inset-y-0 left-0 bg-[#FF5A36]"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${r.value}%` }}
                    viewport={{ once: true }}
                    animate={{ opacity: hover === i ? 0.35 : 0.12 }}
                    transition={{
                      width: { duration: 1, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 0.2 },
                    }}
                  />
                  <span className="relative flex justify-between">
                    <span className={hover === i ? "font-black" : "font-bold"}>
                      {r.label}
                    </span>
                    <span className="font-black">
                      <CountUp to={r.value} suffix="%" />
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <p className="border-t-[5px] border-current pt-2 text-[11px] leading-snug">
              <span className="font-bold">Ingredients:</span>{" "}
              {nutrition.ingredients}
            </p>
            <p className="mt-1 text-[11px] font-bold">{nutrition.warning}</p>
            <p className="mt-2 text-[10px] opacity-60">
              *Percent values are self-reported and deeply unscientific.
            </p>
          </motion.div>
        </Reveal>
      </div>
    </Section>
  );
}
