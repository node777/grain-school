// The blackboard at the front of the room. Lines already on the board stay; new lines are written
// in chalk one after another, left to right. Every door on it opens a view of the atlas.

import type { CSSProperties } from 'react'
import type { BoardLine } from './lesson'

const keyOf = (l: BoardLine): string =>
  l.kind === 'doors' ? 'doors' : `${l.kind}:${l.text}`

const lenOf = (l: BoardLine): number =>
  l.kind === 'doors' ? 7 * 10 : l.text.length

/** Chalk moves at about this many milliseconds a letter. */
const MS_PER_CHAR = 42

export function Blackboard({ board, prev }: { board: BoardLine[]; prev: BoardLine[] }) {
  const had = new Set(prev.map(keyOf))
  let delay = 0
  return (
    <section className="board" aria-label="The blackboard" aria-live="polite">
      <div className="board-slate">
        <div className="board-writing">
          {board.map((l) => {
            const fresh = !had.has(keyOf(l))
            const dur = Math.min(2200, lenOf(l) * MS_PER_CHAR)
            const style = fresh ? { ['--delay' as string]: `${delay}ms`, ['--dur' as string]: `${dur}ms` } : undefined
            if (fresh) delay += dur + 120
            return <Line key={keyOf(l)} line={l} fresh={fresh} style={style} />
          })}
        </div>
      </div>
      <div className="board-tray" aria-hidden="true">
        <i className="chalk-stick" /><i className="chalk-stick yellow" /><i className="chalk-stick short" />
        <i className="eraser" />
      </div>
    </section>
  )
}

function Line({ line, fresh, style }: { line: BoardLine; fresh: boolean; style?: CSSProperties }) {
  const cls = fresh ? ' chalk-in' : ''
  switch (line.kind) {
    case 'title':
      return <h2 className={`chalk chalk-title${cls}`} style={style}>{line.text}</h2>
    case 'line':
      return <p className={`chalk chalk-line${cls}`} style={style}>{line.text}</p>
    case 'stamp':
      return (
        <p className={`chalk chalk-stamp${cls}`} style={style}>
          <span className="mono">{line.text}</span> <span className="chalk-note">{line.note}</span>
        </p>
      )
    case 'link':
      return <p className={`chalk chalk-line${cls}`} style={style}><a className="chalk-link" href={line.href}>{line.text}</a></p>
    case 'doors':
      return (
        <ol className={`chalk chalk-doors${cls}`} style={style}>
          {line.doors.map((d) => (
            <li key={d.name}><a className="chalk-link" href={d.href}>{d.name}</a> <span className="chalk-note">{d.hint}</span></li>
          ))}
        </ol>
      )
  }
}
