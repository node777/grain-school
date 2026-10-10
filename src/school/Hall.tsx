// The hall outside the classroom: a door for each grain tool, and Kyli, who keeps the hall and
// tells you about a door when you point at it. Open doors lead out; kept doors wait for the next
// tool.

import { useState } from 'react'
import { useStore } from '@/core/store'
import { prefersStill, settings } from '@/core/settings'
import { Character } from '@/voices/Character'
import { VOICES } from '@/voices/voices'
import { Bubble } from './Bubble'
import { HALL_GREETING, TOOLS, type Tool } from './tools'
import { useTyping } from './useTyping'

export function Hall() {
  useStore(settings, (s) => s.motion)
  const still = prefersStill()
  const [at, setAt] = useState<Tool | null>(null)
  const kyli = VOICES.kyli
  const say = at ? at.kyli : HALL_GREETING
  const { shown, done, finish } = useTyping(say, still)
  const link = at?.status === 'open' && at.href ? { label: `Go into ${at.name}`, href: at.href } : undefined

  return (
    <div className="hall">
      <div className="wall" aria-hidden="true"><div className="lamp" /><div className="wainscot" /><div className="floor" /></div>
      <section className="keeper" aria-label="Kyli, who keeps the hall">
        <Bubble voice={kyli} say={say} shown={shown} typing={!done} link={link} onFinish={finish}
          label={<span className="faint">{at ? `at room ${at.room}` : 'keeps the hall'}</span>}>
          <div className="bubble-controls sans">
            <a className="icon-btn" href="#/">‹ Back to class</a>
            <span className="spacer" />
            {at && <button className="icon-btn" onClick={() => setAt(null)}>Hello again</button>}
          </div>
        </Bubble>
        <div className="kyli">
          <Character look={kyli.look} size={170} speaking={!done} mood="happy" title="Kyli, Kyri's sister" />
          <span className="kyri-name sans">Kyli</span>
        </div>
      </section>
      <header className="hall-sign">
        <h1>The Hall</h1>
        <p>a door for each grain tool</p>
      </header>
      <ol className="doors" aria-label="Rooms off the hall">
        {TOOLS.map((t) => <Door key={t.id} tool={t} here={at?.id === t.id} onPoint={() => setAt(t)} />)}
      </ol>
    </div>
  )
}

function Door({ tool, here, onPoint }: { tool: Tool; here: boolean; onPoint: () => void }) {
  const inner = (
    <>
      <span className="plaque">
        <span className="plaque-room sans">room {tool.room}</span>
        <b>{tool.name}</b>
        <span className="plaque-what">{tool.plaque}</span>
        {tool.host && <span className="plaque-host mono">{tool.host}</span>}
        {tool.status === 'kept' && <span className="plaque-host sans">being kept</span>}
      </span>
      <span className="door-frame" aria-hidden="true">
        <span className="door-light" />
        <span className="door-leaf">
          <span className="door-pane" />
          {tool.status === 'kept' && (
            <svg className="door-sprout" viewBox="0 0 24 24"><path d="M12 22 V11" stroke="var(--sage)" strokeWidth="2" strokeLinecap="round" /><path d="M12 13 C6 13 4 9 4 6 C9 6 12 8 12 13 Z M12 11 C12 6 15 3 20 3 C20 8 17 11 12 11 Z" fill="var(--sage)" /></svg>
          )}
          <span className="door-knob" />
        </span>
      </span>
    </>
  )
  const props = { className: `door ${tool.status}${here ? ' here' : ''}`, onPointerEnter: onPoint, onFocus: onPoint }
  return (
    <li>
      {tool.status === 'open' && tool.href
        ? <a {...props} href={tool.href} aria-label={`${tool.name}: ${tool.plaque}, at ${tool.host}`}>{inner}</a>
        : <button {...props} onClick={onPoint} aria-label={`${tool.name}: ${tool.plaque}`}>{inner}</button>}
    </li>
  )
}
