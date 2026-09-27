"use client";

import { motion } from "framer-motion";
import { useSyncExternalStore } from "react";
import { soundStore } from "@/lib/sound";

export default function SoundToggle() {
  const on = useSyncExternalStore(soundStore.subscribe, soundStore.get, soundStore.getServer);

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={soundStore.toggle}
      aria-label={on ? "Mute sound effects" : "Turn on sound effects"}
      aria-pressed={on}
      title={on ? "Sound on" : "Sound off"}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--card)] text-[var(--ink)]"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 5 6 9H2v6h4l5 4V5z" fill="currentColor" />
        {on ? (
          <>
            <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} d="M15.5 8.5a5 5 0 0 1 0 7" />
            <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.1 }} d="M18.5 5.5a9 9 0 0 1 0 13" />
          </>
        ) : (
          <path d="m16 9 6 6m0-6-6 6" />
        )}
      </svg>
    </motion.button>
  );
}
