"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { skills } from "@/data/content";
import { Section } from "../Sections";

const GROUP_COLORS: Record<string, string> = {
  Languages: "#FF5A36",
  Backend: "#F2B705",
  Frontend: "#F25CA2",
  "Data & Cloud": "#3B6EF5",
  "AI / ML": "#9B6BF2",
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function Skills() {
  const [active, setActive] = useState<string | null>(null);
  const groups = Object.entries(skills);

  return (
    <Section
      id="skills"
      title="Skills"
      hint="Hover a row to focus it."
      hintClassName="hidden [@media(hover:hover)]:block"
    >
      <ul
        className="border-b border-[var(--line)]"
        onMouseLeave={() => setActive(null)}
      >
        {groups.map(([group, items], i) => {
          const on = active === group;
          const dim = active !== null && !on;
          const color = GROUP_COLORS[group];
          return (
            <motion.li
              key={group}
              data-active={on}
              data-dim={dim}
              onMouseEnter={() => setActive(group)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              className="relative border-t border-[var(--line)]"
            >
              <motion.span
                aria-hidden
                className="absolute left-0 top-0 h-[2px]"
                style={{ background: color }}
                initial={false}
                animate={{ width: on ? "100%" : "0%" }}
                transition={{ duration: 0.5, ease }}
              />
              <div
                className="grid gap-3 py-6 transition-opacity duration-300 sm:grid-cols-[200px_1fr_auto] sm:items-baseline sm:gap-8"
                style={{ opacity: dim ? 0.35 : 1 }}
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] text-[var(--muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.14em]">
                    <span
                      className="h-1.5 w-1.5 rounded-full transition-transform duration-300"
                      style={{ background: color, transform: on ? "scale(1.6)" : "scale(1)" }}
                    />
                    {group}
                  </h3>
                </div>
                <p className="flex flex-wrap gap-x-5 gap-y-1.5 text-[17px] leading-relaxed text-[var(--ink)] sm:text-lg">
                  {items.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </p>
                <span className="hidden font-mono text-[11px] text-[var(--muted)] sm:block">
                  {String(items.length).padStart(2, "0")}
                </span>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </Section>
  );
}
