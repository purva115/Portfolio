# aboutpurva.work

Personal portfolio of Purva Jagtap. A one-page site built around an interactive vending machine: each snack is a section of the page.

**Stack:** Next.js 16 (App Router), Tailwind CSS 4, Framer Motion, Web Audio API for synthesized sound effects.

## Develop

```bash
npm install
npm run dev
```

## Editing content

All copy (experience, projects, skills, education, awards) lives in `src/data/content.ts`. The resume PDF is served from `public/Purva_Jagtap_Resume.pdf`.

## Structure

- `src/components/VendingMachine.tsx`: hero machine (vending, coin drop, tilt, keyboard codes)
- `src/components/sections/`: one file per section (About, Experience, Projects, Skills, Awards, Contact)
- `src/lib/sound.ts`: sound kit and mute state
