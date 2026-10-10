// The doors in the hall: one for each grain tool. Add a tool here and it gets a door, a brass
// plaque, and a line from Kyli. A room kept for a tool that is not ready yet stays shut, with a
// sprout on the door, so there is always room for the next one.

import { ATLAS_HOST, ATLAS_URL, GRAIN_URL } from './links'

export interface Tool {
  id: string
  room: number
  name: string
  /** what the plaque says it is, in a few words */
  plaque: string
  status: 'open' | 'kept'
  href?: string
  host?: string
  /** what Kyli says at this door, in her voice */
  kyli: string
}

export const TOOLS: Tool[] = [
  {
    id: 'atlas', room: 1, name: 'The Atlas', plaque: 'grain mapped seven ways', status: 'open',
    href: ATLAS_URL, host: ATLAS_HOST,
    kyli: 'This is the Atlas. It maps grain seven ways, and you can walk it at your own pace. If you open one door today, open this one.',
  },
  {
    id: 'stacks', room: 2, name: 'The Stacks', plaque: 'grain itself, read plainly', status: 'open',
    href: GRAIN_URL, host: 'github.com/grain-ww/grain',
    kyli: 'The Stacks are grain itself, every page just as it was written. Come here when you want the words without the map.',
  },
  {
    id: 'room-3', room: 3, name: 'Room three', plaque: 'kept for the next grain tool', status: 'kept',
    kyli: 'This room is empty for now. When the next grain tool is ready, it gets this door. Check back now and then.',
  },
  {
    id: 'room-4', room: 4, name: 'Room four', plaque: 'kept for the one after', status: 'kept',
    kyli: "This one's kept too. A school grows a room at a time. One play at a time, remember?",
  },
]

export const HALL_GREETING =
  "Welcome to the hall. I'm Kyli. Every door here opens a grain tool. Point at one and I'll tell you about it. Today, the Atlas is the one to try."
