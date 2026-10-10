// The classroom: a wall with the clock, the blackboard, Kyri at the front, the class, and your desk.
// A lesson runs on its own unless motion is still or the reader takes the controls. A raised hand
// or a tap on a classmate is an aside: that voice speaks, and the lesson waits where it was.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useStore } from '@/core/store'
import { prefersStill, settings } from '@/core/settings'
import { markDone } from '@/core/progress'
import { VOICES, type Line } from '@/voices/voices'
import { Blackboard } from './Blackboard'
import { Classmates } from './Classmates'
import { Clock } from './Clock'
import { Desk } from './Desk'
import { Teacher } from './Teacher'
import { QUESTIONS, lessonById, type BoardLine } from './lesson'
import { useTyping } from './useTyping'

interface Aside extends Line { speaker: string }

export function Classroom({ lessonId }: { lessonId: string }) {
  useStore(settings, (s) => s.motion)
  const still = prefersStill()
  const lesson = lessonById(lessonId)
  const steps = useMemo(() => lesson.steps(new Date()), [lesson])
  const [i, setI] = useState(0)
  const [prev, setPrev] = useState<BoardLine[]>([])
  const [aside, setAside] = useState<Aside | null>(null)
  const [auto, setAuto] = useState(!still)
  const heard = useRef<Record<string, number>>({})

  const step = steps[i]
  const speaker = aside?.speaker ?? step.speaker ?? 'kyri'
  const say = aside ? aside.say : step.say
  const { shown, done, finish } = useTyping(say, still)

  useEffect(() => { if (i === steps.length - 1) markDone(lesson.id) }, [i, steps.length, lesson.id])

  const go = useCallback((n: number) => {
    const k = Math.max(0, Math.min(steps.length - 1, n))
    setPrev(steps[i].board)
    setI(k)
    setAside(null)
  }, [i, steps])

  const leaveAside = () => { setPrev(step.board); setAside(null) }
  const next = () => { setAuto(false); if (aside) leaveAside(); else go(i + 1) }
  const back = () => { setAuto(false); if (aside) leaveAside(); else go(i - 1) }
  const ask = (n: number) => { setAuto(false); const q = QUESTIONS[n]; setAside({ speaker: 'kyri', say: q.answer, link: q.link }) }
  const pick = (id: string) => {
    setAuto(false)
    const v = VOICES[id]
    const k = heard.current[id] ?? 0
    heard.current[id] = k + 1
    setAside({ speaker: id, ...v.lines[k % v.lines.length] })
  }

  // the lesson runs on by itself, a reading pause after each line
  useEffect(() => {
    if (!auto || still || !done || aside || i >= steps.length - 1) return
    const t = setTimeout(() => go(i + 1), 2400 + say.length * 18)
    return () => clearTimeout(t)
  }, [auto, still, done, aside, i, steps.length, say, go])

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

  const point = speaker !== 'kyri' ? 'class' : aside ? 'desk' : step.point
  const link = aside ? aside.link : step.link
  return (
    <div className="classroom">
      <div className="wall" aria-hidden="true"><div className="lamp" /><div className="wainscot" /><div className="floor" /></div>
      <Clock lit={point === 'clock'} />
      <Blackboard board={step.board} prev={prev} />
      <Teacher
        lesson={lesson} voice={VOICES[speaker]} say={say} shown={shown} typing={!done} point={point}
        mood={aside ? 'happy' : step.mood} link={link}
        step={i} steps={steps.length} aside={aside !== null} auto={auto && !still}
        onBack={back} onNext={next} onGoto={(n) => { setAuto(false); go(n) }}
        onAsk={ask} onToggleAuto={() => setAuto(!auto)} onFinish={finish}
      />
      <Classmates speaking={speaker === 'kyri' ? undefined : speaker} typing={!done} onPick={pick} />
      <Desk called={point === 'desk' && done && speaker === 'kyri'} />
    </div>
  )
}
