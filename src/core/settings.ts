// Reader preferences, kept in this browser only. The same two as the atlas: Hearth or Stone,
// full motion or still.

import { createStore } from './store'

export type Mode = 'hearth' | 'stone'

export interface Settings {
  mode: Mode
  motion: 'full' | 'still'
}

export const settings = createStore<Settings>({ mode: 'hearth', motion: 'full' }, 'grain-school:settings')

export function applyTheme(s: Settings): void {
  const root = document.documentElement
  root.dataset.mode = s.mode
  root.dataset.motion = s.motion
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', s.mode === 'hearth' ? '#2a2520' : '#ddd3bd')
}

export const prefersStill = (): boolean =>
  settings.get().motion === 'still' ||
  (typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches)
