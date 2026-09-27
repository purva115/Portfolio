"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useState, type PointerEvent, type SyntheticEvent } from "react";
import { profile } from "@/data/content";
import { play } from "@/lib/sound";
import Reveal from "../Reveal";
import { Section } from "../Sections";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [launch, setLaunch] = useState(false);
  const [sent, setSent] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      play("chime");
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const send = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!msg.trim()) return;
    play("fizz");
    setLaunch(true);
    setSent(true);
    const subject = encodeURIComponent(`Hello from ${name || "your portfolio"}`);
    const body = encodeURIComponent(msg);
    setTimeout(() => {
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    }, 1100);
    setTimeout(() => setLaunch(false), 2600);
  };

  return (
    <Section id="contact" title="Contact" hint="Put a message in the can and send it off.">
      <div className="grid items-center gap-12 md:grid-cols-[1.1fr_1fr]">
        <div>
          <Reveal>
            <p className="text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
              Got a problem worth building for?{" "}
              <span className="text-[#F25CA2]">Let&apos;s talk.</span>
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-3">
            <Magnetic>
              <button onClick={copy} className="btn-primary relative overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? "c" : "e"}
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -16, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    {copied ? "✓ Copied to clipboard" : `Copy ${profile.email}`}
                  </motion.span>
                </AnimatePresence>
              </button>
            </Magnetic>
            <a href={profile.linkedin} target="_blank" className="btn-ghost">
              LinkedIn ↗
            </a>
            <a href={profile.github} target="_blank" className="btn-ghost">
              GitHub ↗
            </a>
            <a href={`tel:${profile.phone.replace(/[^\d+]/g, "")}`} className="btn-ghost">
              {profile.phone}
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form onSubmit={send} className="card relative flex gap-5 overflow-visible p-5">
            <div className="relative flex w-20 shrink-0 items-end justify-center">
              <motion.div
                animate={
                  launch
                    ? { rotate: [0, -8, 8, -8, 8, 0], y: [0, 0, 0, 0, 0, -520], opacity: [1, 1, 1, 1, 1, 0] }
                    : { rotate: 0, y: 0, opacity: 1 }
                }
                transition={launch ? { duration: 1.3, times: [0, 0.1, 0.2, 0.3, 0.4, 1], ease: "easeIn" } : { type: "spring" }}
              >
                <Can filled={msg.length > 0} />
              </motion.div>
            </div>
            <div className="flex flex-1 flex-col gap-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="field"
                aria-label="Your name"
              />
              <textarea
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="What are we building?"
                rows={4}
                className="field resize-none"
                aria-label="Message"
                required
              />
              <motion.button
                whileTap={{ scale: 0.96 }}
                disabled={!msg.trim() || launch}
                className="btn-primary justify-center disabled:opacity-40"
              >
                {launch ? "Launching…" : "Send the can →"}
              </motion.button>
              <AnimatePresence>
                {sent && !launch && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-xs text-[var(--muted)]"
                  >
                    Your email app should have opened. If not, write to{" "}
                    <a href={`mailto:${profile.email}`} className="underline">
                      {profile.email}
                    </a>
                    .
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

function Can({ filled }: { filled: boolean }) {
  return (
    <div className="relative h-36 w-[72px]">
      <div className="absolute inset-x-1 top-0 h-3 rounded-t-md bg-[#c9c9cf]" />
      <div
        className="absolute inset-x-0 bottom-2 top-2.5 overflow-hidden rounded-[10px] shadow-lg"
        style={{
          background:
            "linear-gradient(90deg,rgba(0,0,0,.25),rgba(255,255,255,.35) 35%,rgba(0,0,0,.15)), #F25CA2",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="rotate-180 text-[11px] font-black tracking-widest text-white [writing-mode:vertical-rl]">
            HELLO SODA
          </span>
        </div>
        <motion.div
          className="absolute inset-x-0 bottom-0 bg-white/25"
          animate={{ height: filled ? "45%" : "0%" }}
        />
      </div>
      <div className="absolute inset-x-1 bottom-0 h-2.5 rounded-b-md bg-[#c9c9cf]" />
    </div>
  );
}

function Magnetic({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 15 });
  const sy = useSpring(y, { stiffness: 250, damping: 15 });

  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.3);
    y.set((e.clientY - r.top - r.height / 2) * 0.4);
  };

  return (
    <motion.div
      onPointerMove={move}
      onPointerLeave={() => (x.set(0), y.set(0))}
      style={{ x: sx, y: sy }}
    >
      {children}
    </motion.div>
  );
}
