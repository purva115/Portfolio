"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useState, type PointerEvent } from "react";
import { projects } from "@/data/content";
import { play } from "@/lib/sound";
import Reveal from "../Reveal";
import { Section } from "../Sections";

const COLORS = ["#1FA67A", "#3B6EF5", "#FF5A36"];

export default function Projects() {
  return (
    <Section
      id="projects"
      title="Projects"
      hint="Collectible cards. Tilt them, then tap to flip."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.12}>
            <Card project={p} color={COLORS[i]} index={i} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Card({
  project,
  color,
  index,
}: {
  project: (typeof projects)[number];
  color: string;
  index: number;
}) {
  const reduce = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [10, -10]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(px, [0, 1], [-12, 12]), { stiffness: 200, damping: 20 });
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const shine = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.55), transparent 45%)`;
  const holo = useMotionTemplate`linear-gradient(115deg, transparent 20%, rgba(255,0,170,0.18) ${gx}, rgba(0,220,255,0.18), rgba(255,230,0,0.18), transparent 80%)`;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={reset}
      onClick={() => {
        play("flip");
        setFlipped((f) => !f);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className="group relative h-[380px] cursor-pointer"
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`${project.title}, flip card`}
      onKeyDown={(e) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        e.preventDefault();
        play("flip");
        setFlipped((f) => !f);
      }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        style={{ transformPerspective: 1400 }}
        transition={{ type: "spring", stiffness: 120, damping: 16 }}
        className="relative h-full w-full [transform-style:preserve-3d]"
      >
        {/* Front */}
        <div
          className="absolute inset-0 overflow-hidden rounded-[22px] p-2 [backface-visibility:hidden]"
          style={{ background: color }}
        >
          <div className="relative flex h-full flex-col rounded-[16px] bg-[var(--card)] p-5">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">
              <span>{project.kind}</span>
              <span>#{String(index + 1).padStart(3, "0")}</span>
            </div>
            <div
              className="mt-4 flex flex-1 flex-col items-center justify-center rounded-xl"
              style={{ background: `${color}1a` }}
            >
              <div className="text-6xl font-semibold tracking-tight" style={{ color }}>
                {project.stat}
              </div>
              <div className="mt-1 font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
                {project.statLabel}
              </div>
            </div>
            <h3 className="mt-4 min-h-[3.5rem] text-lg font-semibold leading-snug">
              {project.title}
            </h3>
            <div className="mt-2 flex items-center justify-between font-mono text-[11px] text-[var(--muted)]">
              <span>{project.tags.length} abilities</span>
              <span className="transition-transform group-hover:rotate-180">↻ flip</span>
            </div>
          </div>
          <motion.div className="pointer-events-none absolute inset-0 mix-blend-overlay" style={{ background: shine }} />
          <motion.div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" style={{ background: holo }} />
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 overflow-hidden rounded-[22px] p-2 [backface-visibility:hidden] [transform:rotateY(180deg)]"
          style={{ background: color }}
        >
          <div className="flex h-full flex-col rounded-[16px] bg-[var(--machine)] p-5 text-white">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">
              Card details
            </span>
            <h3 className="mt-3 text-lg font-semibold leading-snug">
              {project.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-white/75">
              {project.body}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full px-2.5 py-1 font-mono text-[11px] text-black"
                  style={{ background: color }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
