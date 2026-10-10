// grain's one clock: a moment written as YYYYMMDD.HHMMSS, local time, digits only.

const two = (n: number) => String(n).padStart(2, '0')

export function oneClock(d: Date): string {
  return `${d.getFullYear()}${two(d.getMonth() + 1)}${two(d.getDate())}.${two(d.getHours())}${two(d.getMinutes())}${two(d.getSeconds())}`
}

/** The part of the day a lesson is given in, for Kyri's greeting. */
export function partOfDay(d: Date): 'morning' | 'afternoon' | 'evening' {
  const h = d.getHours()
  return h >= 4 && h < 12 ? 'morning' : h >= 12 && h < 18 ? 'afternoon' : 'evening'
}
