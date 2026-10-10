// The class, seen from the back of the room: Kyri's faculties and his sibling, facing the board.

import { Character } from '@/voices/Character'
import { CLASS } from '@/voices/voices'

export function Classmates() {
  return (
    <div className="classmates" aria-label="The class">
      {CLASS.map((v) => (
        <figure key={v.id} className="seat" title={`${v.name}: ${v.role}`}>
          <Character look={v.look} size={76} back title={`${v.name}, from behind`} />
          <figcaption className="chair sans">{v.name}</figcaption>
        </figure>
      ))}
    </div>
  )
}
