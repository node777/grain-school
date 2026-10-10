// Reader preferences, kept in this browser only: Hearth or Stone and full motion or still, as in
// the atlas, plus which side of the room the teacher stands on.

import { createStore } from './store'

export type Mode = 'hearth' | 'stone'
export type Side = 'left' | 'right'

export interface Settings {
  mode: Mode
  motion: 'full' | 'still'
  side: Side
}

export const settings = createStore<Settings>({ mode: 'hearth', motion: 'full', side: 'left' }, 'grain-school:settings')

export function applyTheme(s: Settings): void {
  const root = document.documentElement
  root.dataset.mode = s.mode
  root.dataset.motion = s.motion
  root.dataset.side = s.side
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', s.mode === 'hearth' ? '#2a2520' : '#ddd3bd')
}

export const prefersStill = (): boolean =>
  settings.get().motion === 'still' ||
  (typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches)
