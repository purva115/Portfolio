"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
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

const ALL = Object.entries(skills).flatMap(([group, items]) =>
  items.map((name) => ({ name, group }))
);

export default function Skills() {
  const [filter, setFilter] = useState("All");
  const [order, setOrder] = useState(ALL.map((s) => s.name));
  const [picked, setPicked] = useState<string | null>(null);
  const box = useRef<HTMLDivElement>(null);

  const visible = useMemo(
    () =>
      order
        .map((n) => ALL.find((s) => s.name === n)!)
        .filter((s) => filter === "All" || s.group === filter),
    [order, filter]
  );

  const shuffle = () => {
    play("pop");
    setOrder((o) => [...o].sort(() => Math.random() - 0.5));
  };

  const tabs = ["All", ...Object.keys(skills)];
  const pickedSkill = ALL.find((s) => s.name === picked);

  return (
    <Section
      id="skills"
      title="Skills"
      hint="Pick 'n' mix. Filter, shuffle, or drag the pieces around."
    >
      <Reveal>
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <LayoutGroup id="skill-tabs">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => {
                  play("click");
                  setFilter(t);
                }}
                className="relative rounded-full px-4 py-2 text-sm"
              >
                {filter === t && (
                  <motion.span
                    layoutId="skill-tab"
                    className="absolute inset-0 rounded-full bg-[var(--ink)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span
                  className={`relative ${
                    filter === t ? "text-[var(--bg)]" : "text-[var(--muted)]"
                  }`}
                >
                  {t}
                </span>
              </button>
            ))}
          </LayoutGroup>
          <motion.button
            whileTap={{ rotate: 180, scale: 0.9 }}
            onClick={shuffle}
            className="ml-auto rounded-full border border-[var(--line)] bg-[var(--card)] px-4 py-2 font-mono text-xs"
          >
            ⤮ Shuffle
          </motion.button>
        </div>

        <div
          ref={box}
          className="relative min-h-[260px] overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--card)] p-6"
        >
          <motion.div layout className="flex flex-wrap gap-3">
            <AnimatePresence mode="popLayout">
              {visible.map((s, i) => {
                const c = GROUP_COLORS[s.group];
                return (
                  <motion.button
                    key={s.name}
                    layout
                    drag
                    dragConstraints={box}
                    dragElastic={0.25}
                    dragSnapToOrigin
                    initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.4, rotate: 20 }}
                    whileHover={{ y: -3, rotate: i % 2 ? 3 : -3 }}
                    whileDrag={{ scale: 1.15, rotate: 8, zIndex: 20, cursor: "grabbing" }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    onTap={() => {
                      play("pop");
                      setPicked(s.name);
                    }}
                    onDragStart={() => play("click")}
                    className="flex cursor-grab items-center gap-2 rounded-full py-2.5 pl-2.5 pr-4 text-sm font-medium text-white shadow-[inset_0_-3px_0_rgba(0,0,0,0.2),0_6px_14px_-6px_rgba(0,0,0,0.4)]"
                    style={{ background: c }}
                  >
                    <span className="h-3 w-3 rounded-full bg-white/60" />
                    {s.name}
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </motion.div>

          <div className="pointer-events-none absolute inset-x-6 bottom-4 flex items-end justify-between font-mono text-[11px] text-[var(--muted)]">
            <AnimatePresence mode="wait">
              <motion.span
                key={pickedSkill?.name ?? "none"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
              >
                {pickedSkill
                  ? `✦ ${pickedSkill.name} · ${pickedSkill.group}`
                  : "Tap a piece to inspect it"}
              </motion.span>
            </AnimatePresence>
            <span>{visible.length} in stock</span>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
