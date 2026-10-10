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
- Kyri speaks warmly and plainly, in short sentences, and is exact. Lesson lines state only what
  the atlas and grain actually say (the atlas README is the source for the seven views).
- Verify UI changes in a real browser with Playwright. In the cloud sandbox, serve with
  `vite preview --host 0.0.0.0` and browse the host IP, because the proxy intercepts localhost.
