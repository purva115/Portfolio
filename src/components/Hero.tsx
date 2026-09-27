"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/content";
import VendingMachine from "./VendingMachine";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const words = profile.name.split(" ");

  return (
    <section id="hero" className="relative mx-auto grid min-h-svh max-w-6xl items-center gap-14 px-6 pb-16 pt-28 md:grid-cols-[1.1fr_1fr] md:gap-8">
      <div>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--muted)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {profile.status}
        </motion.span>

        <h1 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl">
          {words.map((w, i) => (
            <span key={w} className="block overflow-hidden pb-1">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.1 + i * 0.12 }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.45 }}
          className="mt-6 max-w-md text-lg text-[var(--muted)]"
        >
          <span className="font-medium text-[var(--ink)]">{profile.role}</span>{" "}
          in {profile.location}. {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.6 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <a href={profile.resume} target="_blank" className="btn-primary">
            Resume
          </a>
          <a href={profile.github} target="_blank" className="btn-ghost">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" className="btn-ghost">
            LinkedIn
          </a>
        </motion.div>
      </div>

      <div className="flex justify-center md:justify-end">
        <VendingMachine />
      </div>
    </section>
  );
}
