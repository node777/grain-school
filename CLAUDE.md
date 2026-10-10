# Grain School -- notes for working in this repo

The homepage of grain.school: a static Vite + React + TypeScript classroom where Kyri teaches one
lesson and sends the reader to the Grain Atlas (https://atlas.grain.school). It is a landing page:
keep functionality small and every path pointing at the atlas.

It shares its design with grain-atlas (github.com/node777/grain-atlas). Like the atlas, it is
inspired by grain but is its own interface, so grain's development rules do not apply here.

## Commands

- `npm run dev` -- dev server
- `npm test` -- vitest (one-clock stamp, lesson shape)
- `npm run build` -- `tsc --noEmit` then `vite build`

## Conventions

- `src/styles/tokens.css` is copied from grain-atlas; change it there first, then copy. The room's
  own colours (board, chalk, wood, floor) are variables at the top of `src/styles/classroom.css`.
- Fonts are self-hosted via `@fontsource`; no external font or script hosts.
- Shape law: rounded, never square, never circular for an enclosure.
- Respect `prefersStill()` for any motion not triggered by the reader. The lesson does not run on
  its own when motion is still, and chalk appears without being written.
- Whoever talks speaks in their own voice (personas and phrases from grain-atlas
  `src/voices/voices.ts`): Kyri warm, plain and exact; Kyli a patient coach; Lattice counts;
  Scribble names new words; Lantern marks settled, proposed and unknown; Ember builds and proves.
  Set `speaker` on a lesson step for anyone but Kyri. Lines state only what the atlas and grain
  actually say (the atlas README is the source for the seven views).
- New grain tools get a door in `src/school/tools.ts`; keep the Atlas in room 1.
- `npm test` checks that every lesson ends with a door into the atlas.
- Verify UI changes in a real browser with Playwright. In the cloud sandbox, serve with
  `vite preview --host 0.0.0.0` and browse the host IP, because the proxy intercepts localhost.
