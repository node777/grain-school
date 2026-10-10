// Kyri at the front of the class: his face, a wheat-stalk pointer, and what he is saying. The
// controls under his words walk the lesson; a raised hand asks him a question instead.

import { useState } from 'react'
import { Character } from '@/voices/Character'
import { KYRI } from '@/voices/voices'
import type { Link, Step } from './lesson'
import { QUESTIONS } from './lesson'

interface Props {
  say: string
  shown: string
  typing: boolean
  point?: Step['point']
  mood?: Step['mood']
  link?: Link
  step: number
  steps: number
  answering: boolean
  auto: boolean
  onBack: () => void
  onNext: () => void
  onGoto: (i: number) => void
  onAsk: (i: number) => void
  onToggleAuto: () => void
  onFinish: () => void
}

export function Teacher(p: Props) {
  const [hand, setHand] = useState(false)
  const last = p.step === p.steps - 1 && !p.answering
  return (
    <section className="teacher" aria-label="Kyri, the teacher">
      <div className="bubble linen-fine" onClick={p.typing ? p.onFinish : undefined}>
        <div className="bubble-who sans">
          <b>Kyri</b> <span className="faint">{p.answering ? 'answers' : `lesson one · ${p.step + 1} of ${p.steps}`}</span>
        </div>
        {/* the full line is read out once; the typed copy is for the eye */}
        <p className="bubble-say" aria-hidden="true">{p.shown}<span className="caret" hidden={!p.typing} /></p>
        <p className="sr-only" aria-live="polite">{p.say}</p>
        {p.link && !p.typing && <a className="bubble-link" href={p.link.href}>{p.link.label} <span aria-hidden="true">↗</span></a>}
        <div className="bubble-controls sans">
          <button className="icon-btn" onClick={p.onBack} disabled={p.step === 0 && !p.answering} aria-label="Back">‹</button>
          <span className="dots" role="group" aria-label="Lesson steps">
            {Array.from({ length: p.steps }, (_, i) => (
              <button key={i} className={`dot${i === p.step && !p.answering ? ' on' : ''}`} onClick={() => p.onGoto(i)} aria-label={`Step ${i + 1}`} aria-current={i === p.step && !p.answering ? 'step' : undefined} />
            ))}
          </span>
          {last
            ? <a className="icon-btn next" href={p.link?.href}>Go <span aria-hidden="true">›</span></a>
            : <button className="icon-btn next" onClick={p.onNext} aria-label={p.answering ? 'Back to the lesson' : 'Next'}>{p.answering ? 'Lesson' : 'Next'} <span aria-hidden="true">›</span></button>}
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
      </div>
      <div className="kyri" data-point={p.point ?? 'none'}>
        <span className="pointer" aria-hidden="true">
          <svg viewBox="0 0 160 24" preserveAspectRatio="none">
            <path d="M6 12 H156" stroke="var(--brass)" strokeWidth="2.4" strokeLinecap="round" />
            {[6, 14, 22].map((x) => (
              <g key={x} fill="var(--gold)" stroke="var(--brass-dim)" strokeWidth="0.8">
                <ellipse cx={x + 4} cy="7.5" rx="4.2" ry="2.2" transform={`rotate(-24 ${x + 4} 7.5)`} />
                <ellipse cx={x + 4} cy="16.5" rx="4.2" ry="2.2" transform={`rotate(24 ${x + 4} 16.5)`} />
              </g>
            ))}
          </svg>
        </span>
        <Character look={KYRI.look} size={192} speaking={p.typing} mood={p.mood ?? 'idle'} title="Kyri, the standing voice of grain" />
        <span className="kyri-name sans">Kyri</span>
      </div>
    </section>
  )
}
