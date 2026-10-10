// The frame: the atlas's top bar, school edition, over the classroom.

import { useEffect } from 'react'
import { useStore } from '@/core/store'
import { applyTheme, settings } from '@/core/settings'
import { Mark } from '@/ui/Mark'
import { Classroom } from '@/school/Classroom'
import { ATLAS_HOST, ATLAS_URL, GRAIN_URL } from '@/school/links'

export function Shell() {
  const s = useStore(settings)
  useEffect(() => applyTheme(s), [s])
  return (
    <div className="school">
      <header className="topbar">
        <a className="wordmark" href="./" aria-label="Grain School, home">
          <Mark size={22} />
          <span>Grain <em>School</em></span>
        </a>
        <span className="here"><b>Lesson one</b> <span className="faint">-- the atlas, with Kyri</span></span>
        <span className="spacer" />
        <a className="chip quiet" href={GRAIN_URL}>grain <span className="faint">on GitHub</span></a>
        <a className="chip cta" href={ATLAS_URL}>Open the Atlas <span className="faint">{ATLAS_HOST}</span> <span aria-hidden="true">↗</span></a>
        <button
          className="icon-btn"
          aria-pressed={s.motion === 'still'}
          title={s.motion === 'still' ? 'Let things move' : 'Keep things still'}
          onClick={() => settings.set({ motion: s.motion === 'still' ? 'full' : 'still' })}
        >
          {s.motion === 'still' ? '◇' : '◈'}
        </button>
        <button
          className="icon-btn"
          title={s.mode === 'hearth' ? 'Stone (day) mode' : 'Hearth (night) mode'}
          onClick={() => settings.set({ mode: s.mode === 'hearth' ? 'stone' : 'hearth' })}
        >
          {s.mode === 'hearth' ? '☾' : '☼'}
        </button>
      </header>
      <main className="stage">
        <Classroom />
      </main>
      {/* chalk: a slight wobble to the strokes, and a few gaps where the stick skipped */}
      <svg className="defs" aria-hidden="true" focusable="false">
        <filter id="chalk" x="-2%" y="-10%" width="104%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed="7" result="wobble" />
          <feDisplacementMap in="SourceGraphic" in2="wobble" scale="1.8" xChannelSelector="R" yChannelSelector="G" result="drawn" />
          <feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="1" seed="3" result="grit" />
          <feColorMatrix in="grit" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  3.4 0 0 0 -0.7" result="gaps" />
          <feComposite in="drawn" in2="gaps" operator="in" />
        </filter>
      </svg>
    </div>
  )
}
