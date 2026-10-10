import { describe, expect, it } from 'vitest'
import { DOORS, LESSONS, QUESTIONS, lesson } from '@/school/lesson'
import { TOOLS } from '@/school/tools'
import { CLASS, VOICES } from '@/voices/voices'
import { parseHash, hrefFor } from '@/core/router'
import { ATLAS_URL } from '@/school/links'
import { oneClock, partOfDay } from '@/school/stamp'

describe('one clock', () => {
  it('writes a moment as YYYYMMDD.HHMMSS in local time', () => {
    expect(oneClock(new Date(2026, 9, 10, 9, 30, 0))).toBe('20261010.093000')
    expect(oneClock(new Date(2026, 0, 2, 23, 4, 5))).toBe('20260102.230405')
  })
  it('names the part of the day for the greeting', () => {
    expect(partOfDay(new Date(2026, 9, 10, 8))).toBe('morning')
    expect(partOfDay(new Date(2026, 9, 10, 13))).toBe('afternoon')
    expect(partOfDay(new Date(2026, 9, 10, 21))).toBe('evening')
    expect(partOfDay(new Date(2026, 9, 10, 2))).toBe('evening')
  })
})

describe('the lesson', () => {
  const steps = lesson(new Date(2026, 9, 10, 9, 30, 0))

  it('greets by the time of day and writes the clock on the board', () => {
    expect(steps[0].say).toMatch(/^Good morning\. I am Kyri\./)
    const stamp = steps.flatMap((s) => s.board).find((l) => l.kind === 'stamp')
    expect(stamp && stamp.kind === 'stamp' && stamp.text).toBe('20261010.093000')
  })

  it('ends at the atlas', () => {
    const last = steps[steps.length - 1]
    expect(last.link?.href).toBe(ATLAS_URL)
    expect(last.board.some((l) => l.kind === 'link' && l.href === ATLAS_URL)).toBe(true)
  })

  it('opens the seven views of the atlas by their hash routes', () => {
    expect(DOORS.map((d) => d.name)).toEqual(['Fields', 'Ledger', 'Heavens', 'Sky', 'Journeys', 'Bench', 'Floor'])
    for (const d of DOORS) expect(d.href).toBe(`${ATLAS_URL}/#/${d.name.toLowerCase()}`)
  })

  it('keeps every answer short, and pointing into the atlas or the school', () => {
    for (const q of QUESTIONS) {
      expect(q.answer.length).toBeLessThan(200)
      expect(q.link.href.startsWith(ATLAS_URL) || q.link.href.startsWith('#/')).toBe(true)
    }
  })
})

describe('every lesson', () => {
  const now = new Date(2026, 9, 10, 9, 30, 0)
  for (const l of LESSONS) {
    const steps = l.steps(now)
    it(`${l.id}: speaks only in known voices, in lines that fit the bubble`, () => {
      for (const s of steps) {
        expect(VOICES[s.speaker ?? 'kyri']).toBeDefined()
        expect(s.say.length).toBeLessThan(180)
      }
    })
    it(`${l.id}: ends with a door into the atlas`, () => {
      expect(steps[steps.length - 1].link?.href.startsWith(ATLAS_URL)).toBe(true)
    })
    it(`${l.id}: has a route that leads back to it`, () => {
      const r = parseHash(hrefFor({ room: 'classroom', lesson: l.id }))
      expect(r).toEqual({ room: 'classroom', lesson: l.id })
    })
  }
  it('lesson two lets each classmate speak for themselves', () => {
    const speakers = LESSONS[1].steps(now).map((s) => s.speaker).filter(Boolean)
    expect(new Set(speakers)).toEqual(new Set(CLASS.map((v) => v.id)))
  })
})

describe('the voices and the hall', () => {
  it('gives every classmate something to say', () => {
    for (const v of CLASS) expect(v.lines.length).toBeGreaterThan(0)
  })
  it('opens the atlas first, and numbers its rooms in order', () => {
    expect(TOOLS[0]).toMatchObject({ id: 'atlas', status: 'open', href: ATLAS_URL })
    expect(TOOLS.map((t) => t.room)).toEqual(TOOLS.map((_, i) => i + 1))
    for (const t of TOOLS) if (t.status === 'open') expect(t.href).toMatch(/^https:\/\//)
  })
  it('routes the hall', () => {
    expect(parseHash('#/hall')).toEqual({ room: 'hall' })
    expect(parseHash('')).toEqual({ room: 'classroom', lesson: 'atlas' })
  })
})
