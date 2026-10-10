import { describe, expect, it } from 'vitest'
import { DOORS, QUESTIONS, lesson } from '@/school/lesson'
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

  it('keeps every line short enough for the bubble, and every answer pointing into the atlas', () => {
    for (const s of steps) expect(s.say.length).toBeLessThan(180)
    for (const q of QUESTIONS) {
      expect(q.answer.length).toBeLessThan(200)
      expect(q.link.href.startsWith(ATLAS_URL)).toBe(true)
    }
  })
})
