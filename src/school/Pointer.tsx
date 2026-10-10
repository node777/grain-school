// Kyri's wheat-stalk pointer. He holds the bare end; the ear is at the tip, and its grains point
// up the stalk toward the tip, as wheat grows. It aims at whatever he is talking about by
// measuring the room, so it finds its mark from either side and at any size.

import { useLayoutEffect, useState, type CSSProperties, type RefObject } from 'react'
import type { Side } from '@/core/settings'

export type Target = 'board' | 'clock' | 'desk' | 'class'

/** Where in the room each target is, in viewport pixels. */
function spot(target: Target, side: Side): { x: number; y: number } | null {
  const centre = (sel: string, fy = 0.5) => {
    const el = document.querySelector(sel)
    if (!el) return null
    const r = el.getBoundingClientRect()
    return { x: r.left + r.width / 2, y: r.top + r.height * fy }
  }
  if (target === 'board') {
    const el = document.querySelector('.board-slate')
    if (!el) return null
    const r = el.getBoundingClientRect()
    return { x: side === 'left' ? r.left + r.width * 0.1 : r.right - r.width * 0.1, y: r.top + r.height * 0.55 }
  }
  if (target === 'clock') return centre('.clock', 0.9)
  if (target === 'desk') return centre('.book')
  return centre('.seat.turned .voice-character', 0.35) ?? centre('.classmates')
}

/** Rotation and length that lay the stalk from Kyri's hand to the target. */
export function useAim(kyri: RefObject<HTMLElement>, target: Target | undefined, side: Side, key: string): CSSProperties | undefined {
  const [aim, setAim] = useState<CSSProperties>()
  useLayoutEffect(() => {
    const measure = () => {
      const k = kyri.current
      const to = target && spot(target, side)
      if (!k || !to) { setAim(undefined); return }
      const r = k.getBoundingClientRect()
      // the pivot: the stalk's held end, at Kyri's side (see .pointer in classroom.css)
      const hx = r.left + (side === 'left' ? 0.78 : 0.22) * r.width
      const hy = r.top + 0.52 * r.height + 10
      const dx = to.x - hx, dy = to.y - hy
      const deg = (Math.atan2(dy, dx) * 180) / Math.PI - (side === 'left' ? 0 : 180)
      const len = Math.max(70, Math.min(1000, Math.hypot(dx, dy) - 6))
      setAim({ transform: `rotate(${Math.round(deg * 10) / 10}deg)`, width: `${Math.round(len)}px` })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [kyri, target, side, key])
  return aim
}

export function Pointer({ style }: { style?: CSSProperties }) {
  return (
    <span className="pointer" aria-hidden="true" style={style}>
      {/* drawn in pixels with no viewBox, so the stalk grows with the reach and the ear keeps its size */}
      <svg width="100%" height="24">
        <line x1="30" y1="12" x2="100%" y2="12" stroke="var(--brass)" strokeWidth="2.4" strokeLinecap="round" />
        <line x1="2" y1="12" x2="32" y2="12" stroke="var(--brass-dim)" strokeWidth="1.2" strokeLinecap="round" />
        <g fill="none" stroke="var(--brass-dim)" strokeWidth="0.7" strokeLinecap="round">
          {[8, 16, 24].map((x) => <g key={x}><path d={`M${x - 3} 8 L${x - 9} 3.5`} /><path d={`M${x - 3} 16 L${x - 9} 20.5`} /></g>)}
          <path d="M2.5 12 L-4 12" />
        </g>
        <g fill="var(--gold)" stroke="var(--brass-dim)" strokeWidth="0.8">
          {[8, 16, 24].map((x) => (
            <g key={x}>
              <ellipse cx={x} cy="9" rx="4.4" ry="2.3" transform={`rotate(28 ${x} 9)`} />
              <ellipse cx={x} cy="15" rx="4.4" ry="2.3" transform={`rotate(-28 ${x} 15)`} />
            </g>
          ))}
          <ellipse cx="3.5" cy="12" rx="3.6" ry="2" />
        </g>
      </svg>
    </span>
  )
}
