// Attendance: which lessons this reader has heard to the end, kept in this browser only.

import { createStore } from './store'

export const progress = createStore<{ done: string[] }>({ done: [] }, 'grain-school:progress')

export function markDone(lesson: string): void {
  if (!progress.get().done.includes(lesson)) progress.set((p) => ({ done: [...p.done, lesson] }))
}
