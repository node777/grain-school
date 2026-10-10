// A speech bubble for whichever voice is talking: its name in its own dye, the line typed out as
// it speaks (and read whole to screen readers), an optional door to walk through, and whatever
// controls the room puts underneath.

import type { CSSProperties, ReactNode } from 'react'
import type { Voice } from '@/voices/voices'
import type { Link } from './lesson'

interface Props {
  voice: Voice
  label?: ReactNode
  say: string
  shown: string
  typing: boolean
  link?: Link
  onFinish: () => void
  children?: ReactNode
}

export function Bubble({ voice, label, say, shown, typing, link, onFinish, children }: Props) {
  const dye = { ['--who-hue' as string]: voice.look.hue, ['--who-accent' as string]: voice.look.accent } as CSSProperties
  return (
    <div className="bubble linen-fine" style={dye} onClick={typing ? onFinish : undefined}>
      <div className="bubble-who sans">
        <b>{voice.name}</b> {label}
      </div>
      {/* the full line is read out once; the typed copy is for the eye */}
      <p className="bubble-say" aria-hidden="true">{shown}<span className="caret" hidden={!typing} /></p>
      <p className="sr-only" aria-live="polite">{voice.name}: {say}</p>
      {link && !typing && <a className="bubble-link" href={link.href}>{link.label} <span aria-hidden="true">{link.href.startsWith('#') ? '›' : '↗'}</span></a>}
      {children}
    </div>
  )
}
