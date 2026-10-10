// The class, seen from the back of the room: Kyri's faculties and his sister, facing the board.
// Whoever speaks turns round to face you. Tap one and they say something in their own voice.

import { Character } from '@/voices/Character'
import { CLASS } from '@/voices/voices'

interface Props {
  speaking?: string
  typing: boolean
  onPick: (id: string) => void
}

export function Classmates({ speaking, typing, onPick }: Props) {
  return (
    <div className="classmates" role="group" aria-label="The class">
      {CLASS.map((v) => {
        const turned = v.id === speaking
        return (
          <button key={v.id} className={`seat${turned ? ' turned' : ''}`} onClick={() => onPick(v.id)} title={`${v.name}: ${v.role}. Tap to hear ${v.name}.`} aria-label={`${v.name}, ${v.role}`}>
            <Character look={v.look} size={76} back={!turned} speaking={turned && typing} mood={turned ? 'happy' : 'idle'} title={turned ? v.name : `${v.name}, from behind`} />
            <span className="chair sans">{v.name}</span>
          </button>
        )
      })}
    </div>
  )
}
