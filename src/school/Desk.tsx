// Your desk, nearest of all, with the homework on it: a bound copy of the Grain Atlas.

import { Mark } from '@/ui/Mark'
import { ATLAS_HOST, ATLAS_URL } from './links'

export function Desk({ called }: { called: boolean }) {
  return (
    <div className={`mydesk${called ? ' called' : ''}`}>
      <div className="desk-top" aria-hidden="true" />
      <a className="book" href={ATLAS_URL} aria-label={`Open the Grain Atlas at ${ATLAS_HOST}`}>
        <span className="book-spine" aria-hidden="true" />
        <span className="book-cover">
          <Mark size={30} />
          <span className="book-title">Grain <em>Atlas</em></span>
          <span className="book-sub sans">open at {ATLAS_HOST}</span>
        </span>
      </a>
      <span className="nameplate sans" aria-hidden="true">your seat</span>
    </div>
  )
}
