import { snacks } from "@/data/content";
import Reveal from "./Reveal";

function Heading({
  id,
  title,
  hint,
}: {
  id: string;
  title: string;
  hint?: string;
}) {
  const snack = snacks.find((s) => s.id === id)!;
  return (
    <Reveal className="mb-12">
      <div className="flex items-center gap-4">
        <span
          className="rounded-md px-2 py-0.5 font-mono text-xs font-semibold text-white"
          style={{ background: snack.color }}
        >
          {snack.code}
        </span>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>
        <span className="h-px flex-1 bg-[var(--line)]" />
      </div>
      {hint && (
        <p className="mt-3 pl-[52px] font-mono text-xs text-[var(--muted)]">
          {hint}
        </p>
      )}
    </Reveal>
  );
}

export function Section({
  id,
  title,
  hint,
  children,
}: {
  id: string;
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-5xl scroll-mt-20 px-6 py-24">
      <Heading id={id} title={title} hint={hint} />
      {children}
    </section>
  );
}
