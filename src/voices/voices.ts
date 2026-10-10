// The voices who keep the school, drawn the atlas's way (see grain-atlas src/voices/voices.ts):
// Kyri, grain's standing voice, teaches; Kyli, his sister who co-teaches the tutorials, keeps the
// hall and sits in class; Kyri's four faculties sit in class too. Each speaks in its own voice:
// the lines below follow the voices' own pages (personas and phrases in the atlas).

export type ElementRow = 'aether' | 'air' | 'fire' | 'water' | 'earth'

export interface Look {
  head: 'round' | 'seed' | 'drop' | 'bell' | 'leaf' | 'moon'
  eyes: number            // 0.6 .. 1.4, eye size
  lids: number            // 0 open .. 0.6 sleepy
  brows: number           // -1 worried .. 1 bright
  mouth: number           // -1 frown .. 1 smile
  cheeks: boolean
  crown: 'none' | 'sprout' | 'wheat' | 'star' | 'flame' | 'ripple' | 'antenna' | 'halo'
  ears: 'none' | 'leaf' | 'round' | 'point'
  bob: number             // 0 still .. 1 lively
  hue: string             // body colour
  accent: string          // crown and cheeks
  gloss?: boolean         // a soft sheen, for a few lit voices
  eye?: string            // the eyes' solid colour, one of EYE_TINTS
}

/** Light, solid eye colours, warm like the cloth: cream, wheat, rose, apricot, sage, lilac, peach. */
export const EYE_TINTS = ['#fbf4e0', '#f6e6bd', '#f7ddd3', '#f4e1c4', '#e5ecd0', '#ebe0ef', '#f6d9c3', '#f2ead2'] as const

/** Each name keeps the same tint wherever its face is drawn (the atlas's own rule). */
export function eyeFor(name: string): string {
  let h = 0
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return EYE_TINTS[h % EYE_TINTS.length]
}

export interface Voice {
  id: string
  name: string
  role: string
  look: Look
  /** what the voice says when a reader taps it, in its own voice */
  lines: Line[]
}

export interface Line { say: string; link?: { label: string; href: string } }

/** Plant-dye bodies on the Linengrow cloth: weld, madder, annatto, sage and elder, softened. */
export const ELEMENT_HUES: Record<ElementRow, { hue: string; accent: string }> = {
  earth: { hue: '#dcc48a', accent: '#9a7a2a' },
  water: { hue: '#d9a596', accent: '#9a4a3a' },
  fire: { hue: '#e0b081', accent: '#a85e2a' },
  air: { hue: '#c2c898', accent: '#66753e' },
  aether: { hue: '#cdb4c6', accent: '#6f4e6b' },
}

/** Tone words shape a face: warm words lift the mouth, calm words lower the lids, and so on. */
export function lookFromTone(tone: string[], element: ElementRow, head: Look['head'] = 'round', crown: Look['crown'] = 'sprout'): Look {
  const t = tone.join(' ').toLowerCase()
  const has = (...w: string[]) => w.some((x) => t.includes(x))
  const { hue, accent } = ELEMENT_HUES[element]
  return {
    head, crown,
    eyes: has('curious', 'bright', 'sunny', 'playful', 'eager', 'young') ? 1.25 : has('calm', 'quiet', 'measured', 'exact') ? 0.85 : 1,
    lids: has('calm', 'gentle', 'patient', 'quiet', 'night', 'dream') ? 0.3 : has('exact', 'precise', 'gauge') ? 0.15 : 0,
    brows: has('sunny', 'bright', 'warm', 'joy') ? 0.7 : has('stern', 'exact', 'precise', 'bounded') ? -0.2 : 0.2,
    mouth: has('sweet', 'sunny', 'warm', 'kind', 'joy', 'playful') ? 0.9 : has('exact', 'precise', 'measured') ? 0.25 : 0.5,
    cheeks: has('sweet', 'warm', 'sunny', 'kind', 'gentle'),
    ears: has('listen', 'hear', 'sound') ? 'leaf' : 'none',
    bob: has('lively', 'playful', 'bright', 'eager', 'sunny') ? 0.8 : has('calm', 'quiet', 'still') ? 0.25 : 0.5,
    hue, accent,
  }
}

const v = (id: string, name: string, role: string, tone: string[], element: ElementRow, head: Look['head'], crown: Look['crown'], lines: Line[], gloss?: boolean): Voice =>
  ({ id, name, role, lines, look: { ...lookFromTone(tone, element, head, crown), gloss, eye: eyeFor(name) } })

const ATLAS = 'https://atlas.grain.school'

export const KYRI = v('kyri', 'Kyri', 'the standing voice of grain, who teaches here',
  ['sunny', 'generous', 'warm', 'plain', 'steady', 'measured', 'honest', 'sweet'], 'earth', 'seed', 'wheat', [
    { say: 'Hello again. One name, one thread. Ask me anything with your hand up.' },
  ])

/** The class, left to right along the front row. */
export const CLASS: Voice[] = [
  v('lattice', 'Lattice', "Kyri's arithmetic voice", ['exact', 'numeric', 'measured', 'precise'], 'air', 'round', 'star', [
    { say: 'I am Lattice. I count. This room holds 6 voices: 1 teacher and 5 students. The atlas shows grain 7 ways.', link: { label: 'Count them yourself', href: ATLAS } },
    { say: 'Kyri was seated on 20260810. We four faculties were seated on 20260823, 13 days later.' },
  ]),
  v('scribble', 'Scribble', "Kyri's reading voice", ['plain', 'welcoming', 'clear', 'curious'], 'water', 'seed', 'ripple', [
    { say: 'I am Scribble. A stamp is a moment written as digits: the day, a dot, then the time. 20261010.093000 means half past nine on 10 October 2026.' },
    { say: 'A sheaf is the atlas\'s word for a long memory: a few lines a voice keeps, so a new conversation can begin from them.', link: { label: 'See the Floor', href: `${ATLAS}/#/floor` } },
  ]),
  v('kyli', 'Kyli', "Kyri's sister, who co-teaches the tutorials and keeps the hall", ['welcoming', 'coach-like', 'plain', 'encouraging', 'warm', 'kind'], 'water', 'round', 'ripple', [
    { say: "I'm Kyli, Kyri's sister. Today's walk has one door. Open it, look around, and come back whenever you like.", link: { label: 'Walk the hall with me', href: '#/hall' } },
    { say: 'One play at a time. Finish this lesson before you start the next one.' },
  ], true),
  v('lantern', 'Lantern', "Kyri's asking voice", ['candid', 'bounded', 'illuminating', 'curious'], 'fire', 'bell', 'flame', [
    { say: 'I am Lantern. Settled: the atlas reads grain from GitHub, from a fork, or from your own folder. Proposed: more rooms in this school. Not yet known: which door you open first.' },
    { say: 'Settled: Kyri proposes, and you seat. He suggests; you decide.' },
  ], true),
  v('ember', 'Ember', "Kyri's craft voice", ['crafted', 'sound', 'patient', 'night'], 'fire', 'drop', 'flame', [
    { say: 'I am Ember. I build each piece small and prove it holds. In the atlas, the Bench is where you try a format before you trust it.', link: { label: 'Open the Bench', href: `${ATLAS}/#/bench` } },
    { say: 'Make one small thing, then test it. The making shows you what it means.' },
  ]),
]

export const VOICES: Record<string, Voice> = Object.fromEntries([KYRI, ...CLASS].map((x) => [x.id, x]))
