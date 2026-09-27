"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useEffect, useState } from "react";
import { profile, snacks } from "@/data/content";
import SoundToggle from "./SoundToggle";

export default function Nav() {
  const { scrollY, scrollYProgress } = useScroll();
  const [past, setPast] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  useMotionValueEvent(scrollY, "change", (y) => setPast(y > 500));

  // Highlight whichever section crosses the middle of the viewport.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    snacks.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    const hero = document.getElementById("hero");
    if (hero) io.observe(hero);
    return () => io.disconnect();
  }, []);

  const current = snacks.find((s) => s.id === active);

  return (
    <>
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-[#FF5A36] via-[#F2B705] to-[#F25CA2]"
      />
      <header
        className="fixed inset-x-0 top-0 z-40 border-b border-transparent backdrop-blur-md transition-colors data-[past=true]:border-[var(--line)]"
        data-past={past}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span>
              {profile.name.split(" ")[0]}
              <span className="text-[#FF5A36]">.</span>
            </span>
            <AnimatePresence mode="wait">
              {current && past && (
                <motion.span
                  key={current.code}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="rounded px-1.5 font-mono text-[10px] text-white sm:hidden"
                  style={{ background: current.color }}
                >
                  {current.code} {current.label}
                </motion.span>
              )}
            </AnimatePresence>
          </a>
          <div className="flex items-center gap-3">
          <nav className="hidden gap-1 sm:flex">
            {snacks.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`relative rounded-full px-3 py-1.5 text-sm transition-colors ${
                  active === s.id ? "text-white" : "text-[var(--muted)] hover:text-[var(--ink)]"
                }`}
              >
                {active === s.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: s.color }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{s.label}</span>
              </a>
            ))}
          </nav>
          <SoundToggle />
          </div>
        </div>
      </header>

      <AnimatePresence>
        {past && (
          <motion.a
            href="#top"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            whileHover={{ y: -3 }}
            className="fixed bottom-6 right-6 z-40 rounded-full bg-[var(--machine)] px-4 py-2.5 font-mono text-xs text-white shadow-lg"
          >
            ↑ Back to machine
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}
