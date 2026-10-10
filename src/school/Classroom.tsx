// The classroom: a wall with the clock, the blackboard, Kyri at the front, the class, and your desk.
// Kyri walks one short lesson; it runs on its own unless motion is still or the reader takes the
// controls. Every step, and every answer, ends at the atlas.

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useStore } from '@/core/store'
import { prefersStill, settings } from '@/core/settings'
import { Blackboard } from './Blackboard'
import { Classmates } from './Classmates'
import { Clock } from './Clock'
import { Desk } from './Desk'
import { Teacher } from './Teacher'
import { QUESTIONS, lesson, type BoardLine } from './lesson'
import { useTyping } from './useTyping'

export function Classroom() {
  useStore(settings, (s) => s.motion)
  const still = prefersStill()
  const steps = useMemo(() => lesson(new Date()), [])
  const [i, setI] = useState(0)
  const [prev, setPrev] = useState<BoardLine[]>([])
  const [q, setQ] = useState<number | null>(null)
  const [auto, setAuto] = useState(!still)

  const step = steps[i]
  const answer = q === null ? null : QUESTIONS[q]
  const say = answer ? answer.answer : step.say
  const { shown, done, finish } = useTyping(say, still)

  const go = useCallback((n: number) => {
    const k = Math.max(0, Math.min(steps.length - 1, n))
    setPrev(steps[i].board)
    setI(k)
    setQ(null)
  }, [i, steps])

  const next = () => { setAuto(false); if (q !== null) { setPrev(step.board); setQ(null) } else go(i + 1) }
  const back = () => { setAuto(false); if (q !== null) { setPrev(step.board); setQ(null) } else go(i - 1) }

  // the lesson runs on by itself, a reading pause after each line
  useEffect(() => {
    if (!auto || still || !done || q !== null || i >= steps.length - 1) return
    const t = setTimeout(() => go(i + 1), 2400 + say.length * 18)
    return () => clearTimeout(t)
  }, [auto, still, done, q, i, steps.length, say, go])

  // arrows walk the lesson too
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && e.target.closest('input, textarea, select')) return
      if (e.key === 'ArrowRight') { e.preventDefault(); next() }
      if (e.key === 'ArrowLeft') { e.preventDefault(); back() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const point = answer ? 'desk' : step.point
  return (
    <div className="classroom">
      <div className="wall" aria-hidden="true"><div className="lamp" /><div className="wainscot" /><div className="floor" /></div>
      <Clock lit={point === 'clock'} />
      <Blackboard board={step.board} prev={prev} />
      <Teacher
        say={say} shown={shown} typing={!done} point={point} mood={answer ? 'happy' : step.mood}
        link={answer ? answer.link : step.link}
        step={i} steps={steps.length} answering={answer !== null} auto={auto && !still}
        onBack={back} onNext={next} onGoto={(n) => { setAuto(false); go(n) }}
        onAsk={(n) => { setAuto(false); setQ(n) }}
        onToggleAuto={() => setAuto(!auto)} onFinish={finish}
      />
      <Classmates />
      <Desk called={point === 'desk' && done} />
    </div>
  )
}
