// The voices who keep the classroom, drawn the atlas's way (see grain-atlas src/voices/voices.ts):
// Kyri, grain's standing voice, teaches; Kyli, his sibling who co-teaches the tutorials, and
// Kyri's four faculties sit in the class.

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
  gloss?: boolean         // a soft sheen and a catchlight, for a few lit voices
}

export interface Voice {
  id: string
  name: string
  role: string
  look: Look
}

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

const v = (id: string, name: string, role: string, tone: string[], element: ElementRow, head: Look['head'], crown: Look['crown'], gloss?: boolean): Voice =>
  ({ id, name, role, look: { ...lookFromTone(tone, element, head, crown), gloss } })

export const KYRI = v('kyri', 'Kyri', 'the standing voice of grain, who teaches here',
  ['sunny', 'generous', 'warm', 'plain', 'steady', 'measured', 'honest', 'sweet'], 'earth', 'seed', 'wheat')

/** The class, left to right along the front row. */
export const CLASS: Voice[] = [
  v('lattice', 'Lattice', "Kyri's arithmetic voice", ['exact', 'numeric', 'measured', 'precise'], 'air', 'round', 'star'),
  v('scribble', 'Scribble', "Kyri's reading voice", ['plain', 'welcoming', 'clear', 'curious'], 'water', 'seed', 'ripple'),
  v('kyli', 'Kyli', "Kyri's sibling, who co-teaches the tutorials", ['welcoming', 'coach-like', 'plain', 'encouraging', 'warm', 'kind'], 'water', 'round', 'ripple', true),
  v('lantern', 'Lantern', "Kyri's asking voice", ['candid', 'bounded', 'illuminating', 'curious'], 'fire', 'bell', 'flame', true),
  v('ember', 'Ember', "Kyri's craft voice", ['crafted', 'sound', 'patient', 'night'], 'fire', 'drop', 'flame'),
]
