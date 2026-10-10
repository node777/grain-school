// The frame: the atlas's top bar, school edition, over the room the hash names.

import { useEffect } from 'react'
import { useStore } from '@/core/store'
import { applyTheme, settings } from '@/core/settings'
import { useRoute } from '@/core/router'
import { Mark } from '@/ui/Mark'
import { Classroom } from '@/school/Classroom'
import { Hall } from '@/school/Hall'
import { ATLAS_HOST, ATLAS_URL, GRAIN_URL } from '@/school/links'

export function Shell() {
  const s = useStore(settings)
  const route = useRoute()
  useEffect(() => applyTheme(s), [s])
  const inHall = route.room === 'hall'
  return (
    <div className="school">
      <header className="topbar">
        <a className="wordmark" href="#/" aria-label="Grain School, the classroom">
          <Mark size={22} />
          <span>Grain <em>School</em></span>
        </a>
        <nav className="rooms" aria-label="Rooms">
          <a href="#/" aria-current={!inHall ? 'page' : undefined}>Classroom</a>
          <a href="#/hall" aria-current={inHall ? 'page' : undefined}>Hall</a>
        </nav>
        <span className="spacer" />
        <a className="chip quiet" href={GRAIN_URL}>grain <span className="faint">on GitHub</span></a>
        <a className="chip cta" href={ATLAS_URL}>Open the Atlas <span className="faint">{ATLAS_HOST}</span> <span aria-hidden="true">↗</span></a>
        <button
          className="icon-btn side-btn"
          title={s.side === 'left' ? 'Teacher stands on the left; move to the right' : 'Teacher stands on the right; move to the left'}
          aria-label="Switch the teacher's side"
          onClick={() => settings.set({ side: s.side === 'left' ? 'right' : 'left' })}
        >
          {s.side === 'left' ? '⇥' : '⇤'}
        </button>
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
        {route.room === 'hall' ? <Hall /> : <Classroom key={route.lesson} lessonId={route.lesson} />}
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
