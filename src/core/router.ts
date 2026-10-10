// Hash routes, so the static site deep-links without a server:
//   #/            the classroom, lesson one
//   #/voices      the classroom, lesson two
//   #/hall        the hall, with a door for each grain tool

import { useSyncExternalStore } from 'react'

export type Route = { room: 'classroom'; lesson: string } | { room: 'hall' }

export function parseHash(hash: string): Route {
  const id = hash.replace(/^#\/?/, '').split(/[/?]/)[0]
  if (id === 'hall') return { room: 'hall' }
  return { room: 'classroom', lesson: id || 'atlas' }
}

export const hrefFor = (r: Route): string =>
  r.room === 'hall' ? '#/hall' : r.lesson === 'atlas' ? '#/' : `#/${r.lesson}`

const subscribe = (fn: () => void) => {
  window.addEventListener('hashchange', fn)
  return () => window.removeEventListener('hashchange', fn)
}

/** The current route. Components compare on the hash string, so a snapshot never churns. */
export function useRoute(): Route {
  const hash = useSyncExternalStore(subscribe, () => location.hash)
  return parseHash(hash)
}
