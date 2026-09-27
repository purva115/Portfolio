import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import About from "@/components/sections/About";
import Awards from "@/components/sections/Awards";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import { profile } from "@/data/content";

const TICKER = "OPEN 24/7  ✦  RESTOCKED DAILY  ✦  EXACT CHANGE NOT REQUIRED  ✦  NOW SERVING GOOD SOFTWARE  ✦  ";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Awards />
        <Contact />
      </main>
      <footer className="mt-16 border-t border-[var(--line)]">
        <div className="overflow-hidden border-b border-[var(--line)] py-3 font-mono text-xs tracking-widest text-[var(--muted)]">
          <div className="marquee flex w-max whitespace-nowrap [animation-duration:30s]">
            <span>{TICKER.repeat(3)}</span>
            <span>{TICKER.repeat(3)}</span>
          </div>
        </div>
        <div className="mx-auto flex max-w-5xl justify-between px-6 py-8 font-mono text-xs text-[var(--muted)]">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <a href="#top" className="hover:text-[var(--ink)]">
            Back to the machine ↑
          </a>
        </div>
      </footer>
    </>
  );
}
