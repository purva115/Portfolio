"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { skills } from "@/data/content";
import { play } from "@/lib/sound";
import Reveal from "../Reveal";
import { Section } from "../Sections";

const GROUP_COLORS: Record<string, string> = {
  Languages: "#FF5A36",
  Backend: "#F2B705",
  Frontend: "#F25CA2",
  "Data & Cloud": "#3B6EF5",
  "AI / ML": "#9B6BF2",
};

const GROUPS = Object.keys(skills);
const ALL = Object.entries(skills).flatMap(([group, items]) =>
  items.map((name) => ({ name, group, index: GROUPS.indexOf(group) + 1 }))
);

const pad = (n: number) => String(n).padStart(2, "0");

export default function Skills() {
  const [hover, setHover] = useState<string | null>(null);
  const [locked, setLocked] = useState<string | null>(null);
  const active = hover ?? locked;

  const select = (g: string) => {
    play("click");
    setLocked((l) => (l === g ? null : g));
  };

  return (
    <Section
      id="skills"
      title="Skills"
      hint="Hover or select a discipline to see what's in it."
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[240px_minmax(0,1fr)] md:gap-16">
        {/* Index of disciplines */}
        <Reveal className="min-w-0 md:sticky md:top-28 md:self-start">
          <p className="mb-6 hidden text-sm leading-relaxed text-[var(--muted)] md:block">
            {ALL.length} tools across {GROUPS.length} disciplines, used in
            production.
          </p>
          <ul
            className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 md:mx-0 md:block md:overflow-visible md:px-0 md:pb-0"
            onMouseLeave={() => setHover(null)}
          >
            {GROUPS.map((g, i) => {
              const on = active === g;
              const color = GROUP_COLORS[g];
              return (
                <li key={g} className="shrink-0">
                  <button
                    onClick={() => select(g)}
                    onMouseEnter={() => setHover(g)}
                    aria-pressed={locked === g}
                    className="group relative flex w-full items-baseline gap-3 whitespace-nowrap rounded-full border border-[var(--line)] px-4 py-2 text-left md:rounded-none md:border-0 md:border-b md:px-0 md:py-3.5"
                  >
                    <span
                      className="font-mono text-[11px] transition-colors"
                      style={{ color: on ? color : "var(--muted)" }}
                    >
                      {pad(i + 1)}
                    </span>
                    <span
                      className={`text-[15px] transition-colors ${
                        on ? "text-[var(--ink)]" : "text-[var(--muted)]"
                      }`}
                    >
                      {g}
                    </span>
                    <span className="ml-auto hidden font-mono text-[11px] text-[var(--muted)] md:inline">
                      {skills[g].length}
                    </span>
                    <motion.span
                      className="absolute -bottom-px left-0 hidden h-px md:block"
                      style={{ background: color }}
                      initial={false}
                      animate={{ width: on ? "100%" : "0%" }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </Reveal>

        {/* Type specimen */}
        <div className="min-w-0">
          <p className="text-[22px] font-medium leading-[1.55] tracking-tight sm:text-[34px] sm:leading-[1.5]">
            {ALL.map((s, i) => {
              const dim = active !== null && active !== s.group;
              const lit = active === s.group;
              return (
                <motion.span
                  key={s.name}
                  initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.018,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                >
                  <span
                    data-lit={lit}
                    onMouseEnter={() => setHover(s.group)}
                    onMouseLeave={() => setHover(null)}
                    className="cursor-default transition-[color,opacity] duration-300"
                    style={{
                      color: lit || !active ? "var(--ink)" : "var(--muted)",
                      opacity: dim ? 0.28 : 1,
                    }}
                  >
                    {s.name}
                    <sup
                      className="ml-0.5 font-mono text-[10px] font-normal tracking-normal transition-colors duration-300 sm:text-[11px]"
                      style={{
                        color: lit ? GROUP_COLORS[s.group] : "var(--muted)",
                      }}
                    >
                      {pad(s.index)}
                    </sup>
                  </span>
                  {i < ALL.length - 1 && (
                    <span
                      className="mx-2 font-light text-[var(--line)] sm:mx-3.5"
                      aria-hidden
                    >
                      /
                    </span>
                  )}
                </motion.span>
              );
            })}
          </p>

          <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[var(--line)] pt-5 font-mono text-[11px] uppercase tracking-widest text-[var(--muted)]">
            {GROUPS.map((g, i) => (
              <span key={g} className="flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: GROUP_COLORS[g] }}
                />
                {pad(i + 1)} {g}
              </span>
            ))}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
