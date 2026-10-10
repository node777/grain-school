// Kyri speaks a line a few letters at a time; still motion gives the whole line at once.

import { useEffect, useState } from 'react'

export function useTyping(text: string, still: boolean, msPerChar = 26): { shown: string; done: boolean; finish: () => void } {
  const [n, setN] = useState(still ? text.length : 0)
  useEffect(() => {
    if (still) { setN(text.length); return }
    setN(0)
    const id = setInterval(() => setN((k) => {
      if (k >= text.length) { clearInterval(id); return k }
      // pause a beat after the end of a sentence or a clause
      const c = text[k]
      return c === '.' || c === ',' || c === ';' || c === ':' ? k + 0.25 : k + 1
    }), msPerChar)
    return () => clearInterval(id)
  }, [text, still, msPerChar])
  const k = Math.floor(n)
  return { shown: text.slice(0, k), done: k >= text.length, finish: () => setN(text.length) }
}
