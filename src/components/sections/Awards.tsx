"use client";

import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { useState } from "react";
import { awards, education } from "@/data/content";
import { play } from "@/lib/sound";
import Reveal from "../Reveal";
import { Section } from "../Sections";

const MEDAL_COLORS = ["#F2B705", "#9B6BF2", "#FF5A36"];
const CONFETTI =["#FF5A36", "#F2B705", "#1FA67A", "#3B6EF5", "#9B6BF2", "#F25CA2"];

export default function Awards() {
  return (
    <Section
      id="education"
      title="Education & Awards"
      hint="Tear a ticket. Ring a medal."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {education.map((e, i) => (
          <Reveal key={e.degree} delay={i * 0.1}>
            <Ticket {...e} index={i} />
          </Reveal>
        ))}
      </div>
      <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
        {awards.map((a, i) => (
          <Reveal key={a.title} delay={0.15 + i * 0.1}>
            <Medal {...a} color={MEDAL_COLORS[i % MEDAL_COLORS.length]} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Ticket({
  degree,
  school,
  date,
  grade,
  index,
}: (typeof education)[number] & { index: number }) {
  const [torn, setTorn] = useState(false);
  const color = index ? "#3B6EF5" : "#9B6BF2";
  const toggle = () => {
    play(torn ? "click" : "tear");
    setTorn((t) => !t);
  };

  return (
    <div
      className="ticket group relative flex h-full cursor-pointer"
      onClick={toggle}
      role="button"
      tabIndex={0}
      aria-pressed={torn}
      onKeyDown={(e) => e.key === "Enter" && toggle()}
    >
      <div className="flex-1 rounded-l-2xl border border-r-0 border-[var(--line)] bg-[var(--card)] p-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--muted)]">
          Admit one · {date}
        </span>
        <h3 className="mt-2 text-xl font-semibold">{degree}</h3>
        <p className="text-[var(--muted)]">{school}</p>
      </div>
      <motion.div
        animate={torn ? { rotate: 14, x: 22, y: 18 } : { rotate: 0, x: 0, y: 0 }}
        whileHover={torn ? {} : { rotate: 3, x: 4 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
        style={{ transformOrigin: "0% 0%", background: color }}
        className="relative flex w-28 shrink-0 flex-col items-center justify-center rounded-r-2xl border-l-2 border-dashed border-white/60 text-white"
      >
        <span className="font-mono text-[9px] uppercase tracking-widest opacity-80">
          GPA
        </span>
        <span className="whitespace-pre-line text-center font-mono text-sm font-bold leading-tight">
          {grade.replace(/^C?GPA /, "").replace(" / ", "\n/ ")}
        </span>
        <span className="mt-2 font-mono text-[9px] opacity-70">
          {torn ? "↺ fix" : "tear ✂"}
        </span>
      </motion.div>
    </div>
  );
}

function Medal({
  title,
  note,
  color,
}: (typeof awards)[number] & { color: string }) {
  const [scope, animate] = useAnimate();
  const [bursts, setBursts] = useState<number[]>([]);

  const ring = () => {
    play("chime");
    play("pop");
    animate(scope.current, { rotate: [0, 22, -16, 10, -6, 0] }, { duration: 1.1 });
    const id = Date.now();
    setBursts((b) => [...b, id]);
    setTimeout(() => setBursts((b) => b.filter((x) => x !== id)), 1200);
  };

  return (
    <div className="flex flex-col items-center text-center">
      <button
        onClick={ring}
        aria-label={`Celebrate ${title}`}
        className="relative flex flex-col items-center"
      >
        <motion.div
          ref={scope}
          whileHover={{ rotate: [0, 8, -6, 0], transition: { duration: 0.8 } }}
          style={{ transformOrigin: "50% 0%" }}
          className="flex flex-col items-center"
        >
          {/* Ribbon */}
          <div className="flex gap-0.5">
            <span className="h-16 w-5 -skew-x-12" style={{ background: color, opacity: 0.8 }} />
            <span className="h-16 w-5 skew-x-12" style={{ background: color }} />
          </div>
          {/* Disc */}
          <div
            className="-mt-2 flex h-24 w-24 items-center justify-center rounded-full text-4xl text-white shadow-[inset_0_-6px_0_rgba(0,0,0,0.2),0_12px_24px_-10px_rgba(0,0,0,0.5)]"
            style={{
              background: `radial-gradient(circle at 35% 30%, #fff8 0 10%, transparent 40%), ${color}`,
            }}
          >
            <div className="flex h-[76px] w-[76px] items-center justify-center rounded-full border-2 border-dashed border-white/60">
              ★
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {bursts.map((id) => (
            <Confetti key={id} />
          ))}
        </AnimatePresence>
      </button>
      <h3 className="mt-4 text-sm font-semibold leading-snug">{title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">{note}</p>
    </div>
  );
}

function Confetti() {
  const [pieces] = useState(() => makePieces());
  return (
    <span className="pointer-events-none absolute left-1/2 top-[110px]">
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          className="absolute block rounded-[2px]"
          style={{ width: p.w, height: p.w * 0.5, background: p.c }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{ x: p.x, y: [0, p.y, p.y + 60], opacity: [1, 1, 0], rotate: p.r }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      ))}
    </span>
  );
}

function makePieces() {
  return Array.from({ length: 22 }, (_, i) => {
    const angle = (i / 22) * Math.PI * 2 + Math.random() * 0.4;
    const dist = 70 + Math.random() * 70;
    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist - 30,
      r: Math.random() * 540 - 270,
      c: CONFETTI[i % CONFETTI.length],
      w: 5 + Math.random() * 5,
    };
  });
}
