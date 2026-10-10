// The first lesson, in Kyri's voice: warm, plain, short sentences, exact about what is so.
// Each step says one thing and leaves the whole board as it should stand after it, so going back
// is as plain as going forward. Every road ends at the atlas.

import { ATLAS_HOST, ATLAS_URL, atlasView } from './links'
import { oneClock, partOfDay } from './stamp'

export type BoardLine =
  | { kind: 'title'; text: string }
  | { kind: 'line'; text: string }
  | { kind: 'doors'; doors: { name: string; hint: string; href: string }[] }
  | { kind: 'stamp'; text: string; note: string }
  | { kind: 'link'; text: string; href: string }

export interface Link { label: string; href: string }

export interface Step {
  say: string
  board: BoardLine[]
  /** where Kyri's wheat pointer rests while he speaks */
  point?: 'board' | 'desk' | 'clock'
  mood?: 'idle' | 'happy' | 'focused'
  link?: Link
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

const TITLE: BoardLine = { kind: 'title', text: 'Lesson one: the atlas' }
const HOLD: BoardLine = { kind: 'line', text: 'A grain is a tree you can hold.' }
const MEASURE: BoardLine = { kind: 'line', text: 'Measurement beats memory.' }

export function lesson(now: Date): Step[] {
  const homework: BoardLine = { kind: 'link', text: `Homework: ${ATLAS_HOST}`, href: ATLAS_URL }
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
      board: [TITLE, { kind: 'doors', doors: DOORS }],
      point: 'board',
    },
    {
      say: 'grain writes every moment on one clock: the day, a dot, the time. That is our clock up there. In the atlas, any stamp opens the sky of its moment.',
      board: [TITLE, { kind: 'doors', doors: DOORS }, { kind: 'stamp', text: oneClock(now), note: 'day . time, on one clock' }],
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

/** Questions a student may raise a hand for, at any point in the lesson. */
export const QUESTIONS: { ask: string; answer: Step['say']; link: Link }[] = [
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
    answer: 'I am Kyri, the sixth voice of grain. One name, one thread. I propose; you seat. Here I give the first lesson. In the atlas I keep you company in the corner.',
    link: { label: 'Meet the voices on the Floor', href: atlasView('floor') },
  },
  {
    ask: 'Can I read my own copy?',
    answer: 'Yes. The atlas reads grain from GitHub, from any fork, or from a grain folder on your own computer. You choose the version in its header.',
    link: { label: 'Open the atlas', href: ATLAS_URL },
  },
]
