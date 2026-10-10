# Grain School

*Lesson one: the atlas.*

The homepage of [grain.school](https://grain.school). It is a classroom on the Linengrow cloth.
There is a blackboard at the front, and Kyri, the standing voice of
[grain](https://github.com/grain-ww/grain), teaches one short lesson in his own voice. The
homework is on your desk: the [Grain Atlas](https://atlas.grain.school), which maps grain seven
ways. Every road in the room leads there.

- **The blackboard** is written in chalk as the lesson goes. Each of the atlas's seven views on it
  (Fields, Ledger, Heavens, Sky, Journeys, Bench, Floor) links straight into that view.
- **Kyri** teaches with a wheat-stalk pointer (the ear at the tip, grains pointing up the stalk).
  The pointer measures the room and lands on what he names: the board, the clock, your desk, or a
  classmate. A lesson runs on its own until you take the controls (‹ › or the arrow keys). Raise
  your hand (✋ Ask) to ask him a question.
- **The teacher's side** is a toggle (⇥/⇤ in the top bar). Kyri stands on the left by default.
- **Two lessons.** Lesson one is the atlas. In lesson two, the voices, each classmate turns round
  and introduces itself in its own voice. Lessons heard to the end get a star (kept in your browser).
- **The class** is Kyri's sister Kyli and his four faculties (Lattice, Scribble, Lantern, Ember),
  seen from the back of the room. Tap one and it turns round and speaks in its own voice. Whoever
  is talking owns the speech bubble, with their name in their own dye.
- **The clock** above the board is grain's one clock, `YYYYMMDD.HHMMSS`, in your local time.
- **Your desk** holds a bound copy of the atlas. Open it.
- **The hall** (`#/hall`) has a door for each grain tool, and Kyli keeps it. Point at a door and she
  tells you about it. Room 1 is the Atlas, room 2 is the Stacks (grain itself on GitHub), and
  rooms 3 and 4 are kept for the next tools. Add a tool in `src/school/tools.ts` and it gets a door.

The look and the parts come from [grain-atlas](https://github.com/node777/grain-atlas): the same
tokens (Stone by day, Hearth by night, plant dyes, no blue), self-hosted fonts, wheat mark,
character renderer and store. Still motion (your OS setting, or ◈ in the top bar) stops everything
that is not triggered by you.

## Run it

```sh
npm install
npm run dev       # http://localhost:5173
npm test          # one-clock stamp, lessons (known voices, end at the atlas), routes, the hall
npm run build     # tsc --noEmit, then vite build into dist/
```

## Deploy

`.github/workflows/deploy.yml` tests, builds and publishes `dist/` to GitHub Pages on every push
to `main`. Pages is turned on once by hand, because the workflow's token may not create a Pages
site: Settings → Pages → Build and deployment → Source: **GitHub Actions**. `public/CNAME` names
the domain `grain.school`. Point the domain's DNS at GitHub Pages
(apex `A`/`AAAA` records, or `ALIAS`), then turn on "Enforce HTTPS" in the repository's Pages
settings.

## Where things live

- `src/school/lesson.ts` -- the lessons: who speaks, what they say, what the board holds; the raised-hand questions
- `src/school/tools.ts` -- the hall's doors, one per grain tool, with Kyli's line for each
- `src/school/links.ts` -- the atlas URL and its view deep links (`https://atlas.grain.school/#/<view>`)
- `src/school/` -- the rooms: `Classroom` (`Blackboard`, `Teacher`, `Pointer`, `Classmates`, `Desk`, `Clock`), `Hall`, and the shared `Bubble`
- `src/voices/` -- Kyri, Kyli and the faculties with their own lines, and the character renderer (from grain-atlas, plus a back view)
- `src/core/` -- store, settings (mode, motion, teacher's side), hash router (`#/`, `#/voices`, `#/hall`), attendance
- `src/styles/tokens.css` -- the atlas's tokens, unchanged; `classroom.css` -- the room's own

MIT licensed.
