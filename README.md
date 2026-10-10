# Grain School

*Lesson one: the atlas.*

The homepage of [grain.school](https://grain.school). It is a classroom on the Linengrow cloth.
There is a blackboard at the front, and Kyri, the standing voice of
[grain](https://github.com/grain-ww/grain), teaches one short lesson in his own voice. The
homework is on your desk: the [Grain Atlas](https://atlas.grain.school), which maps grain seven
ways. Every road in the room leads there.

- **The blackboard** is written in chalk as Kyri speaks. Each of the atlas's seven views on it
  (Fields, Ledger, Heavens, Sky, Journeys, Bench, Floor) links straight into that view.
- **Kyri** walks the lesson with a wheat-stalk pointer. The lesson runs on its own until you take
  the controls (‹ › or the arrow keys). Raise your hand (✋ Ask) to ask him a question.
- **The clock** above the board is grain's one clock, `YYYYMMDD.HHMMSS`, in your local time.
- **The class** is Kyri's sibling Kyli and his four faculties (Lattice, Scribble, Lantern, Ember),
  seen from the back of the room.
- **Your desk** holds a bound copy of the atlas. Open it.

The look and the parts come from [grain-atlas](https://github.com/node777/grain-atlas): the same
tokens (Stone by day, Hearth by night, plant dyes, no blue), self-hosted fonts, wheat mark,
character renderer and store. Still motion (your OS setting, or ◈ in the top bar) stops everything
that is not triggered by you.

## Run it

```sh
npm install
npm run dev       # http://localhost:5173
npm test          # the one-clock stamp, and the lesson's shape: it greets, it ends at the atlas
npm run build     # tsc --noEmit, then vite build into dist/
```

## Deploy

`.github/workflows/deploy.yml` tests, builds and publishes `dist/` to GitHub Pages on every push
to `main`. `public/CNAME` names the domain `grain.school`. Point the domain's DNS at GitHub Pages
(apex `A`/`AAAA` records, or `ALIAS`), then turn on "Enforce HTTPS" in the repository's Pages
settings.

## Where things live

- `src/school/lesson.ts` -- what Kyri says and what the board holds, step by step; the raised-hand questions
- `src/school/links.ts` -- the atlas URL and its view deep links (`https://atlas.grain.school/#/<view>`)
- `src/school/` -- the room: `Classroom`, `Blackboard`, `Teacher`, `Classmates`, `Desk`, `Clock`
- `src/voices/` -- Kyri and the class, and the character renderer (from grain-atlas, plus a back view)
- `src/styles/tokens.css` -- the atlas's tokens, unchanged; `classroom.css` -- the room's own

MIT licensed.
