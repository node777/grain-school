// The classroom clock, above the board: grain's one clock, ticking in this browser's local time.

import { useEffect, useState } from 'react'
import { oneClock } from './stamp'

export function Clock({ lit }: { lit: boolean }) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const s = oneClock(now)
  return (
    <div className={`clock${lit ? ' lit' : ''}`} title="grain's one clock: the day, a dot, the time (your local time)">
      <span className="clock-label">one clock</span>
      <time className="mono" dateTime={now.toISOString()}>{s.slice(0, 8)}<b>.</b>{s.slice(9)}</time>
    </div>
  )
}
