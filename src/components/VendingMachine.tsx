"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type PanInfo,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { snacks, type Snack } from "@/data/content";
import { play } from "@/lib/sound";

type Phase = "idle" | "turning" | "dropping" | "landed";

const IDLE_TEXT = "SELECT A SNACK  ✦  A1 — B3  ✦  ";

export default function VendingMachine() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [active, setActive] = useState<Snack | null>(null);
  const [tray, setTray] = useState<Snack | null>(null);
  const [typed, setTyped] = useState("");
  const [credit, setCredit] = useState(false);
  const [coinBack, setCoinBack] = useState(true);
  const [dragging, setDragging] = useState(false);
  const [hintCoin, setHintCoin] = useState(false);
  const timers = useRef<number[]>([]);
  const body = useRef<HTMLDivElement>(null);
  const slot = useRef<HTMLDivElement>(null);

  // 3D tilt that follows the cursor anywhere on the page.
  const tiltX = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const tiltY = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  useEffect(() => {
    if (reduce || !matchMedia("(hover: hover)").matches) return;
    const onMove = (e: PointerEvent) => {
      const r = body.current?.getBoundingClientRect();
      if (!r || r.bottom < 0) return;
      const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
      const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
      tiltY.set(Math.max(-1, Math.min(1, dx)) * 14);
      tiltX.set(Math.max(-1, Math.min(1, dy)) * -10);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, tiltX, tiltY]);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const goTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const vend = useCallback(
    (snack: Snack) => {
      if (phase !== "idle") return;
      setActive(snack);
      setTyped("");
      setCredit(false);
      if (reduce) {
        goTo(snack.id);
        later(() => setActive(null), 400);
        return;
      }
      setTray(null);
      setPhase("turning");
      play("whirr");
      later(() => setPhase("dropping"), 650);
      later(() => {
        setPhase("landed");
        setTray(snack);
        play("thud");
      }, 1150);
      later(() => goTo(snack.id), 1800);
      later(() => {
        setPhase("idle");
        setActive(null);
      }, 2300);
    },
    [phase, reduce]
  );

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const onCoinDrop = (_: unknown, info: PanInfo) => {
    const r = slot.current?.getBoundingClientRect();
    if (!r || phase !== "idle") return;
    const x = info.point.x - window.scrollX;
    const y = info.point.y - window.scrollY;
    const pad = 28;
    const hit =
      x > r.left - pad && x < r.right + pad && y > r.top - pad && y < r.bottom + pad;
    if (!hit) return;
    play("coin");
    setCoinBack(false);
    setCredit(true);
    const surprise = snacks[Math.floor(Math.random() * snacks.length)];
    later(() => vend(surprise), 900);
    later(() => setCoinBack(true), 3200);
  };

  // Type a code like "a2" anywhere on the hero to vend.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement;
      if (el.closest("input, textarea, [contenteditable]")) return;
      // Only listen while the machine is on screen.
      const r = body.current?.getBoundingClientRect();
      if (!r || r.bottom < 0 || r.top > window.innerHeight) return;
      const k = e.key.toUpperCase();
      if (k === "A" || k === "B") {
        setTyped(k);
        play("click");
      } else if (/^[1-3]$/.test(k) && typed.length === 1) {
        play("click");
        const snack = snacks.find((s) => s.code === typed + k);
        if (snack) vend(snack);
        else setTyped("");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [typed, vend]);

  const lcd =
    phase === "idle"
      ? credit
        ? "CREDIT 1 ✦"
        : typed
          ? `CODE ${typed}_`
          : null
      : phase === "landed"
        ? "ENJOY  ✦"
        : `${active?.code}  ${active?.label.toUpperCase()}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ type: "spring", stiffness: 70, damping: 14, delay: 0.3 }}
      className="relative w-full max-w-[380px] select-none"
    >
      {/* Machine body */}
      <motion.div
        ref={body}
        style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1000 }}
        className="relative rounded-[30px] bg-[var(--machine)] p-4 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-[var(--machine-ring)]">
        {/* Header sign */}
        <div className="mb-4 flex items-center justify-between rounded-2xl bg-black/30 px-4 py-2.5">
          <span className="sign-flicker font-mono text-sm font-semibold tracking-[0.3em] text-[var(--sign)]">
            PURVA&apos;S
          </span>
          <div className="flex gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="bulb h-1.5 w-1.5 rounded-full bg-[var(--sign)]"
                style={{ animationDelay: `${i * 0.25}s` }}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          {/* Glass window */}
          <div className="glass relative flex-1 overflow-hidden rounded-2xl p-3">
            <div className="grid grid-cols-3 gap-x-2 gap-y-5">
              {snacks.map((s) => (
                <Slot
                  key={s.code}
                  snack={s}
                  onPick={() => vend(s)}
                  turning={active?.code === s.code && phase === "turning"}
                  dropped={
                    active?.code === s.code &&
                    (phase === "dropping" || phase === "landed")
                  }
                />
              ))}
            </div>
            <div className="glass-shine pointer-events-none absolute inset-0" />
          </div>

          {/* Control panel */}
          <div className="flex w-[104px] flex-col gap-3">
            <div className="lcd h-10 overflow-hidden rounded-lg px-2 font-mono text-[11px] leading-10 text-[var(--lcd-text)]">
              {lcd ? (
                <span className="whitespace-nowrap">{lcd}</span>
              ) : (
                <div className="marquee flex w-max whitespace-nowrap">
                  <span>{IDLE_TEXT}</span>
                  <span>{IDLE_TEXT}</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              {snacks.map((s) => (
                <motion.button
                  key={s.code}
                  whileTap={{ scale: 0.88, y: 2 }}
                  onClick={() => {
                    play("click");
                    vend(s);
                  }}
                  aria-label={`Vend ${s.label}`}
                  className={`h-8 rounded-md font-mono text-[11px] font-semibold transition-colors ${
                    active?.code === s.code || typed === s.code[0]
                      ? "bg-[var(--sign)] text-black"
                      : "bg-white/10 text-white/80 hover:bg-white/20"
                  }`}
                >
                  {s.code}
                </motion.button>
              ))}
            </div>

            <div
              ref={slot}
              className={`mt-auto flex flex-col items-center gap-1.5 rounded-lg py-2.5 transition-colors ${
                dragging ? "bg-[var(--sign)]/20 ring-1 ring-[var(--sign)]" : "bg-black/25"
              }`}
            >
              <motion.div
                animate={credit ? { boxShadow: "0 0 12px 2px var(--sign)" } : { boxShadow: "0 0 0 0 rgba(0,0,0,0)" }}
                className="h-7 w-1.5 rounded-full bg-black/60 ring-1 ring-white/10"
              />
              <span className="font-mono text-[8px] tracking-widest text-white/40">
                {dragging ? "DROP" : "COINS"}
              </span>
            </div>
          </div>
        </div>

        {/* Pickup tray */}
        <button
          onClick={() => tray && goTo(tray.id)}
          aria-label={tray ? `Open ${tray.label}` : "Pickup tray"}
          className="relative mt-4 flex h-20 w-full items-end justify-center overflow-hidden rounded-2xl bg-black/40 shadow-[inset_0_8px_16px_rgba(0,0,0,0.5)]"
        >
          <span className="absolute left-4 top-2 font-mono text-[9px] tracking-[0.3em] text-white/30">
            PUSH
          </span>
          <AnimatePresence>
            {tray && (
              <motion.div
                key={tray.code}
                initial={{ y: -90, rotate: 0, opacity: 0 }}
                animate={{ y: 0, rotate: 84, opacity: 1 }}
                exit={{ opacity: 0, x: 60 }}
                transition={{ type: "spring", stiffness: 260, damping: 14 }}
                className="mb-[-14px]"
              >
                <Bag snack={tray} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* Feet */}
        <div className="absolute -bottom-3 left-8 h-3 w-10 rounded-b-lg bg-[var(--machine)] opacity-80" />
        <div className="absolute -bottom-3 right-8 h-3 w-10 rounded-b-lg bg-[var(--machine)] opacity-80" />
      </motion.div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <motion.div
          className="relative h-11 w-11"
          animate={dragging || !coinBack ? { y: 0 } : { y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <AnimatePresence>
            {coinBack && (
              <motion.button
                key="coin"
                drag
                dragSnapToOrigin
                dragElastic={0.9}
                onDragStart={() => setDragging(true)}
                onDragEnd={(e, info) => {
                  setDragging(false);
                  onCoinDrop(e, info);
                }}
                onClick={() => setHintCoin(true)}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, opacity: 0, transition: { duration: 0.25 } }}
                transition={{ type: "spring", stiffness: 260, damping: 16 }}
                whileDrag={{ scale: 1.2, rotate: 25, cursor: "grabbing" }}
                aria-label="Coin: drag it into the coin slot for a surprise snack"
                className="coin absolute inset-0 z-30 flex cursor-grab items-center justify-center rounded-full font-mono text-sm font-black text-[#7a5200]"
              >
                P
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
        <p className="max-w-[230px] font-mono text-xs leading-relaxed text-[var(--muted)]">
          {hintCoin ? (
            <>Drag me into the <span className="text-[var(--ink)]">COINS</span> slot ↗</>
          ) : (
            <>
              Drag the coin into the slot for a surprise, tap a snack, or type{" "}
              <kbd className="kbd">A3</kbd>
            </>
          )}
        </p>
      </div>
    </motion.div>
  );
}

function Slot({
  snack,
  onPick,
  turning,
  dropped,
}: {
  snack: Snack;
  onPick: () => void;
  turning: boolean;
  dropped: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-[84px] items-end justify-center">
        <AnimatePresence mode="popLayout">
          {!dropped && (
            <motion.button
              key="bag"
              onClick={onPick}
              aria-label={`Vend ${snack.label}`}
              initial={{ opacity: 0, scale: 0.6, y: -10 }}
              animate={
                turning
                  ? {
                      x: 6,
                      y: 0,
                      opacity: 1,
                      scale: 1,
                      transition: { duration: 0.6, ease: "easeInOut" },
                    }
                  : { x: 0, y: 0, opacity: 1, scale: 1 }
              }
              exit={{
                y: 260,
                rotate: 25,
                transition: { duration: 0.5, ease: [0.55, 0, 1, 0.45] },
              }}
              whileHover={{ y: -4, rotate: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="cursor-pointer"
            >
              <Bag snack={snack} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      <Coil spinning={turning} />
      <span className="mt-1 rounded bg-black/40 px-1.5 font-mono text-[9px] text-white/60">
        {snack.code}
      </span>
    </div>
  );
}

function Bag({ snack }: { snack: Snack }) {
  return (
    <div
      className="bag relative flex h-[76px] w-[54px] items-center justify-center rounded-[10px]"
      style={{ ["--bag" as string]: snack.color }}
    >
      <span className="rotate-[-90deg] whitespace-nowrap text-[11px] font-bold tracking-wide text-white drop-shadow-sm">
        {snack.label}
      </span>
    </div>
  );
}

function Coil({ spinning }: { spinning: boolean }) {
  return (
    <div className="h-2.5 w-[58px] overflow-hidden">
      <motion.svg
        width="80"
        height="10"
        viewBox="0 0 80 10"
        animate={spinning ? { x: [0, -10, -20] } : { x: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <path
          d="M0 5 q2.5 -5 5 0 t5 0 t5 0 t5 0 t5 0 t5 0 t5 0 t5 0 t5 0 t5 0 t5 0 t5 0 t5 0 t5 0 t5 0 t5 0"
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="1.4"
        />
      </motion.svg>
    </div>
  );
}
