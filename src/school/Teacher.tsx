// Kyri at the front of the class: his face, his wheat pointer, and the bubble for whoever is
// speaking. The controls under the words walk the lesson; a raised hand asks Kyri a question.

import { useRef, useState } from 'react'
import { useStore } from '@/core/store'
import { progress } from '@/core/progress'
import { settings } from '@/core/settings'
import { hrefFor } from '@/core/router'
import { Character } from '@/voices/Character'
import { KYRI, type Voice } from '@/voices/voices'
import { Bubble } from './Bubble'
import { Pointer, useAim } from './Pointer'
import { LESSONS, QUESTIONS, type Lesson, type Link, type Step } from './lesson'

interface Props {
  lesson: Lesson
  voice: Voice
  say: string
  shown: string
  typing: boolean
  point?: Step['point']
  mood?: Step['mood']
  link?: Link
  step: number
  steps: number
  aside: boolean
  auto: boolean
  onBack: () => void
  onNext: () => void
  onGoto: (i: number) => void
  onAsk: (i: number) => void
  onToggleAuto: () => void
  onFinish: () => void
}

const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

export function Teacher(p: Props) {
  const [hand, setHand] = useState(false)
  const done = useStore(progress, (s) => s.done)
  const last = p.step === p.steps - 1 && !p.aside
  const nextLesson = LESSONS.find((l) => l.n === p.lesson.n + 1)
  const kyriTalking = p.voice.id === 'kyri' && p.typing
  const side = useStore(settings, (s) => s.side)
  const kyri = useRef<HTMLDivElement>(null)
  const aim = useAim(kyri, p.point, side, `${p.voice.id}:${p.step}`)
  return (
    <section className="teacher" aria-label="Kyri, the teacher">
      <Bubble
        voice={p.voice} say={p.say} shown={p.shown} typing={p.typing} link={p.link} onFinish={p.onFinish}
        label={<span className="faint">{p.aside ? (p.voice.id === 'kyri' ? 'answers' : 'says') : `lesson ${WORDS[p.lesson.n]} · ${p.step + 1} of ${p.steps}`}</span>}
      >
        <div className="bubble-controls sans">
          <button className="icon-btn" onClick={p.onBack} disabled={p.step === 0 && !p.aside} aria-label="Back">‹</button>
          <span className="dots" role="group" aria-label="Lesson steps">
            {Array.from({ length: p.steps }, (_, i) => (
              <button key={i} className={`dot${i === p.step && !p.aside ? ' on' : ''}`} onClick={() => p.onGoto(i)} aria-label={`Step ${i + 1}`} aria-current={i === p.step && !p.aside ? 'step' : undefined} />
            ))}
          </span>
          {last
            ? nextLesson
              ? <a className="icon-btn next" href={hrefFor({ room: 'classroom', lesson: nextLesson.id })}>Lesson {WORDS[nextLesson.n]} <span aria-hidden="true">›</span></a>
              : <a className="icon-btn next" href="#/hall">The hall <span aria-hidden="true">›</span></a>
            : <button className="icon-btn next" onClick={p.onNext} aria-label={p.aside ? 'Back to the lesson' : 'Next'}>{p.aside ? 'Lesson' : 'Next'} <span aria-hidden="true">›</span></button>}
          <span className="spacer" />
          <button className="icon-btn" onClick={p.onToggleAuto} aria-pressed={p.auto} title={p.auto ? 'Pause the lesson' : 'Let the lesson run on its own'}>{p.auto ? '❚❚' : '▶'}</button>
          <button className={`icon-btn hand${hand ? ' up' : ''}`} onClick={() => setHand(!hand)} aria-expanded={hand} title="Raise your hand to ask Kyri a question">✋ Ask</button>
        </div>
        {hand && (
          <ul className="questions sans">
            {QUESTIONS.map((q, i) => (
              <li key={q.ask}><button className="chip" onClick={() => { p.onAsk(i); setHand(false) }}>{q.ask}</button></li>
            ))}
          </ul>
        )}
        <nav className="lessons sans" aria-label="Lessons">
          {LESSONS.map((l) => (
            <a key={l.id} href={hrefFor({ room: 'classroom', lesson: l.id })} aria-current={l.id === p.lesson.id ? 'page' : undefined}>
              Lesson {WORDS[l.n]}: {l.title}{done.includes(l.id) && <span className="star" title="heard to the end"> ★</span>}
            </a>
          ))}
        </nav>
      </Bubble>
      <div className="kyri" ref={kyri} data-point={p.point ?? 'none'}>
        <Pointer style={aim} />
        <Character look={KYRI.look} size={192} speaking={kyriTalking} mood={p.mood ?? 'idle'} title="Kyri, the standing voice of grain" />
        <span className="kyri-name sans">Kyri</span>
      </div>
    </section>
  )
}
