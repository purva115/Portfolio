"use client";

// Tiny synthesized sound kit. No audio files: everything is generated with
// the Web Audio API on demand, so the AudioContext only starts after a user
// gesture (which is when every sound here is triggered).

export type SoundName =
  | "click"
  | "coin"
  | "whirr"
  | "thud"
  | "flip"
  | "pop"
  | "print"
  | "tear"
  | "chime"
  | "fizz";

const KEY = "purva-sound";
let ctx: AudioContext | null = null;
let enabled = true;
const listeners = new Set<() => void>();

// Browsers block audio until the first gesture. Sounds requested before that
// (e.g. on scroll) are dropped instead of queuing up and firing in a burst.
let unlocked = false;

if (typeof window !== "undefined") {
  try {
    enabled = localStorage.getItem(KEY) !== "off";
  } catch {}
  const unlock = () => {
    unlocked = true;
    ["pointerdown", "keydown", "touchstart"].forEach((e) =>
      window.removeEventListener(e, unlock, true)
    );
  };
  ["pointerdown", "keydown", "touchstart"].forEach((e) =>
    window.addEventListener(e, unlock, true)
  );
}

export const soundStore = {
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  get: () => enabled,
  getServer: () => true,
  toggle() {
    enabled = !enabled;
    try {
      localStorage.setItem(KEY, enabled ? "on" : "off");
    } catch {}
    listeners.forEach((l) => l());
    if (enabled) play("click");
  },
};

function audio() {
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function tone(
  a: AudioContext,
  {
    type = "sine",
    from,
    to = from,
    start = 0,
    dur,
    vol = 0.15,
    out,
  }: {
    type?: OscillatorType;
    from: number;
    to?: number;
    start?: number;
    dur: number;
    vol?: number;
    out?: AudioNode;
  }
) {
  const t = a.currentTime + start;
  const o = a.createOscillator();
  const g = a.createGain();
  o.type = type;
  o.frequency.setValueAtTime(from, t);
  o.frequency.exponentialRampToValueAtTime(Math.max(to, 1), t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(out ?? a.destination);
  o.start(t);
  o.stop(t + dur + 0.02);
  return o;
}

function noise(
  a: AudioContext,
  {
    start = 0,
    dur,
    vol = 0.12,
    filter = "bandpass",
    freq = 1500,
    freqTo,
    q = 1,
  }: {
    start?: number;
    dur: number;
    vol?: number;
    filter?: BiquadFilterType;
    freq?: number;
    freqTo?: number;
    q?: number;
  }
) {
  const t = a.currentTime + start;
  const len = Math.ceil(a.sampleRate * dur);
  const buf = a.createBuffer(1, len, a.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  const src = a.createBufferSource();
  src.buffer = buf;
  const f = a.createBiquadFilter();
  f.type = filter;
  f.Q.value = q;
  f.frequency.setValueAtTime(freq, t);
  if (freqTo) f.frequency.exponentialRampToValueAtTime(freqTo, t + dur);
  const g = a.createGain();
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(f).connect(g).connect(a.destination);
  src.start(t);
}

const kit: Record<SoundName, (a: AudioContext) => void> = {
  click: (a) => tone(a, { type: "square", from: 1100, to: 900, dur: 0.04, vol: 0.04 }),
  coin: (a) => {
    tone(a, { type: "triangle", from: 1320, dur: 0.12, vol: 0.12 });
    tone(a, { type: "triangle", from: 1980, start: 0.09, dur: 0.35, vol: 0.12 });
    noise(a, { start: 0.3, dur: 0.12, vol: 0.05, freq: 5000, q: 4 });
  },
  whirr: (a) => {
    const o = tone(a, { type: "sawtooth", from: 90, to: 130, dur: 0.6, vol: 0.05 });
    const lfo = a.createOscillator();
    const lg = a.createGain();
    lfo.frequency.value = 18;
    lg.gain.value = 12;
    lfo.connect(lg).connect(o.frequency);
    lfo.start();
    lfo.stop(a.currentTime + 0.62);
  },
  thud: (a) => {
    tone(a, { from: 180, to: 45, dur: 0.22, vol: 0.35 });
    noise(a, { dur: 0.08, vol: 0.12, filter: "lowpass", freq: 600 });
  },
  flip: (a) => noise(a, { dur: 0.22, vol: 0.09, freq: 700, freqTo: 3500, q: 2 }),
  pop: (a) => {
    tone(a, { from: 500, to: 1100, dur: 0.08, vol: 0.1 });
    noise(a, { dur: 0.05, vol: 0.06, freq: 2500 });
  },
  print: (a) => {
    for (let i = 0; i < 18; i++)
      noise(a, { start: i * 0.085, dur: 0.035, vol: 0.05, freq: 3200, q: 6 });
    tone(a, { type: "square", from: 60, dur: 1.55, vol: 0.012 });
  },
  tear: (a) => {
    for (let i = 0; i < 6; i++)
      noise(a, { start: i * 0.03, dur: 0.05, vol: 0.08, freq: 1800 + i * 300, q: 3 });
  },
  chime: (a) => {
    [880, 1109, 1319].forEach((f, i) =>
      tone(a, { from: f, start: i * 0.07, dur: 0.4, vol: 0.08 })
    );
  },
  fizz: (a) => {
    noise(a, { dur: 0.12, vol: 0.18, filter: "highpass", freq: 2500 });
    noise(a, { start: 0.1, dur: 1.1, vol: 0.06, filter: "highpass", freq: 4000, freqTo: 9000 });
    tone(a, { from: 200, to: 900, start: 0.6, dur: 0.6, vol: 0.06 });
  },
};

export function play(name: SoundName) {
  if (!enabled || !unlocked || typeof window === "undefined") return;
  try {
    const a = audio();
    if (a) kit[name](a);
  } catch {}
}
