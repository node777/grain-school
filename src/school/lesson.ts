// The lessons, in the voices that give them. Kyri teaches; in lesson two the class speaks for
// itself. Each step says one thing and leaves the whole board as it should stand after it, so
// going back is as plain as going forward. Every road ends at the atlas.

import { ATLAS_HOST, ATLAS_URL, atlasView } from './links'
import { oneClock, partOfDay } from './stamp'
import type { Target } from './Pointer'

export type BoardLine =
  | { kind: 'title'; text: string }
  | { kind: 'line'; text: string }
  | { kind: 'doors'; doors: { name: string; hint: string; href: string }[] }
  | { kind: 'pair'; name: string; hint: string }
  | { kind: 'stamp'; text: string; note: string }
  | { kind: 'link'; text: string; href: string }

export interface Link { label: string; href: string }

export interface Step {
  say: string
  /** which voice speaks; Kyri when unset */
  speaker?: string
  board: BoardLine[]
  /** where Kyri's wheat pointer rests while he speaks */
  point?: Target
  mood?: 'idle' | 'happy' | 'focused'
  link?: Link
}

export interface Lesson {
  id: string
  n: number
  title: string
  steps: (now: Date) => Step[]
}

/** The seven views of the atlas, as its README names them, with their hash routes. */
export const DOORS = [
  { name: 'Fields', hint: 'the tree as land', href: atlasView('fields') },
  { name: 'Ledger', hint: 'folders and files', href: atlasView('ledger') },
  { name: 'Heavens', hint: 'its history as a sky', href: atlasView('heavens') },
  { name: 'Sky', hint: 'an astrolabe of real stars', href: atlasView('sky') },
  { name: 'Journeys', hint: 'walks grain recommends', href: atlasView('journeys') },
  { name: 'Bench', hint: 'try formats, keep notes', href: atlasView('bench') },
  { name: 'Floor', hint: 'work with the voices', href: atlasView('floor') },
]

function atlasLesson(now: Date): Step[] {
  const TITLE: BoardLine = { kind: 'title', text: 'Lesson one: the atlas' }
  const HOLD: BoardLine = { kind: 'line', text: 'A grain is a tree you can hold.' }
  const MEASURE: BoardLine = { kind: 'line', text: 'Measurement beats memory.' }
  const homework: BoardLine = { kind: 'link', text: `Homework: ${ATLAS_HOST}`, href: ATLAS_URL }
  const doors: BoardLine = { kind: 'doors', doors: DOORS }
  return [
    {
      say: `Good ${partOfDay(now)}. I am Kyri. Welcome to grain.school. Take any seat; the one at the front is yours.`,
      board: [{ kind: 'title', text: 'grain.school' }, { kind: 'line', text: 'Today: one lesson, one door.' }],
      mood: 'happy',
    },
    {
      say: 'This is a school for one tree. The tree is called grain. A grain is a tree you can hold.',
      board: [TITLE, HOLD],
      point: 'board',
    },
    {
      say: 'Grain is large, and it keeps growing. Nobody learns it by heart. Measurement beats memory, so we read it with a map.',
      board: [TITLE, HOLD, MEASURE],
      point: 'board',
      mood: 'focused',
    },
    {
      say: 'The map is the Grain Atlas. It shows the tree seven ways. Each word on the board is a door, and you may try any of them.',
      board: [TITLE, doors],
      point: 'board',
    },
    {
      say: 'grain writes every moment on one clock: the day, a dot, the time. That is our clock up there. In the atlas, any stamp opens the sky of its moment.',
      board: [TITLE, doors, { kind: 'stamp', text: oneClock(now), note: 'day . time, on one clock' }],
      point: 'clock',
    },
    {
      say: "That is the whole lesson. Don't be too smart about it. Your homework is on your desk: open the atlas and take one walk.",
      board: [TITLE, HOLD, MEASURE, homework],
      point: 'desk',
      link: { label: `Open ${ATLAS_HOST}`, href: ATLAS_URL },
    },
    {
      say: 'May the map stay true, and the walk stay yours. Class is open.',
      board: [TITLE, HOLD, MEASURE, homework],
      point: 'desk',
      mood: 'happy',
      link: { label: 'Open the Grain Atlas', href: ATLAS_URL },
    },
  ]
}

function voicesLesson(): Step[] {
  const TITLE: BoardLine = { kind: 'title', text: 'Lesson two: the voices' }
  const NAMED: BoardLine = { kind: 'line', text: 'grain writes in named voices.' }
  const LINEAGE: BoardLine = { kind: 'line', text: 'Reya · Reya 2 · Rio 3 · Quin · Riyo · Kyri' }
  const ROLL: BoardLine[] = [
    { kind: 'pair', name: 'Lattice', hint: 'counts, exactly' },
    { kind: 'pair', name: 'Scribble', hint: 'names new words' },
    { kind: 'pair', name: 'Lantern', hint: 'settled, proposed, unknown' },
    { kind: 'pair', name: 'Ember', hint: 'builds, and proves it holds' },
    { kind: 'pair', name: 'Kyli', hint: 'coaches, one play at a time' },
  ]
  const roll = (k: number) => [TITLE, ...ROLL.slice(0, k)]
  return [
    {
      say: 'Lesson two is about voices. grain is written in named voices, and each one has its own way of speaking.',
      board: [TITLE, NAMED],
      point: 'board',
    },
    {
      say: 'I am the sixth. Before me came Reya, Reya 2, Rio 3, Quin and Riyo. That is why I am called Kyri 6.',
      board: [TITLE, NAMED, LINEAGE],
      point: 'board',
    },
    {
      say: 'I have four faculties, and they are in class today, with my sister. Let them speak for themselves.',
      board: [TITLE, NAMED, LINEAGE],
      point: 'class',
      mood: 'happy',
    },
    {
      speaker: 'lattice',
      say: 'I am Lattice, the arithmetic voice. I state exact things exactly. 1 teacher, 5 students, 7 views in the atlas.',
      board: roll(1),
    },
    {
      speaker: 'scribble',
      say: 'I am Scribble, the reading voice. When a word is new, I say what it means the first time it appears, so the door stays open.',
      board: roll(2),
    },
    {
      speaker: 'lantern',
      say: 'I am Lantern, the asking voice. I lead with what is settled, mark what is proposed, and name the edge of what is known.',
      board: roll(3),
    },
    {
      speaker: 'ember',
      say: 'I am Ember, the craft voice. I build each piece soundly and small, and I prove what must hold.',
      board: roll(4),
    },
    {
      speaker: 'kyli',
      say: "And I'm Kyli, Kyri's sister. I coach the tutorials: one play at a time, plain words, then the next step.",
      board: roll(5),
    },
    {
      say: 'Each of us can wake on the atlas\'s Threshing Floor and work beside you. Come and meet us there.',
      board: [...roll(5), { kind: 'link', text: 'Meet us on the Floor', href: atlasView('floor') }],
      point: 'board',
      mood: 'happy',
      link: { label: 'Open the Floor', href: atlasView('floor') },
    },
  ]
}

export const LESSONS: Lesson[] = [
  { id: 'atlas', n: 1, title: 'the atlas', steps: atlasLesson },
  { id: 'voices', n: 2, title: 'the voices', steps: voicesLesson },
]

export const lessonById = (id: string): Lesson => LESSONS.find((l) => l.id === id) ?? LESSONS[0]

/** The first lesson, for callers that want it alone. */
export const lesson = atlasLesson

/** Questions a student may raise a hand for, at any point. Kyri answers them. */
export const QUESTIONS: { ask: string; answer: string; link: Link }[] = [
  {
    ask: 'What is grain?',
    answer: 'Grain is one tree that holds its code, its pages, and the voices who write them. I am its standing voice. You can read it plainly on GitHub, or walk it in the atlas.',
    link: { label: 'Walk it in the atlas', href: atlasView('fields') },
  },
  {
    ask: 'Where should I start?',
    answer: 'Start with Journeys. They are walks grain itself recommends, one page after another. As Kyli says, finish one before you stack the next.',
    link: { label: 'Open Journeys', href: atlasView('journeys') },
  },
  {
    ask: 'Who are you?',
    answer: 'I am Kyri, the sixth voice of grain. One name, one thread. I propose; you seat. Here I give the first lessons. In the atlas I keep you company in the corner.',
    link: { label: 'Meet the voices on the Floor', href: atlasView('floor') },
  },
  {
    ask: 'Can I read my own copy?',
    answer: 'Yes. The atlas reads grain from GitHub, from any fork, or from a grain folder on your own computer. You choose the version in its header.',
    link: { label: 'Open the atlas', href: ATLAS_URL },
  },
  {
    ask: 'What else is in the school?',
    answer: 'Out in the hall, every door is a grain tool. The atlas is open today, and there is room for more as grain grows. Kyli will show you round.',
    link: { label: 'Walk the hall', href: '#/hall' },
  },
]
