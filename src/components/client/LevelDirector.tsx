import React, { type MouseEvent } from 'react'

interface LevelDirectorProps {
  levels: string[]
}

const LevelDirector: React.FC<LevelDirectorProps> = ({ levels }) => {
  const [levelList, setLevelList] = React.useState(levels)

  const handleRemove = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const lastId = levelList.pop() ?? ''
    const last = document.getElementById(lastId)
    if (last) last.remove()
    setLevelList(levelList)
  }

  const getNextId = (): { id: string, num: number } => {
    const numbers = levelList.map(id => {
      const elems = id.split('-')
      return parseInt(elems[1])
    }).filter(x => !isNaN(x))
    const max = numbers.length ? Math.max(...numbers) : 0
    const num = max + 1
    const id = `level-${max + 1}`
    return { id, num }
  }

  const addNewLevel = (wrapper: HTMLFieldSetElement) => {
    const existing = Array.from(wrapper.querySelectorAll('fieldset'))
    const last = existing.pop()
    if (!last) return

    const oldId = last.getAttribute('id') ?? ''
    const { id, num } = getNextId()
    const newLevel = last.cloneNode(true) as HTMLFieldSetElement
    newLevel.setAttribute('id', id)
    newLevel.setAttribute('name', id)
    newLevel.setAttribute('key', id)

    const labels = newLevel.querySelectorAll('label')
    for (const label of labels) {
      const oldFor = label.getAttribute('for') ?? ''
      label.setAttribute('for', oldFor.replace(oldId, id))
      label.innerHTML = label.innerHTML.replace(/Level \d*/, `Level ${num}`)
    }

    const inputs = newLevel.querySelectorAll('input, textarea')
    for (const input of inputs) {
      const oldName = input.getAttribute('name') ?? ''
      const newName = oldName.replace(oldId, id)
      input.setAttribute('name', newName)
      input.setAttribute('id', newName)
      input.setAttribute('placeholder', input.getAttribute('placeholder')?.replace(/Level \d*/g, `Level ${num}`) ?? '')
      input.setAttribute('placeholder', input.getAttribute('placeholder')?.replace(/level \d*/g, `level ${num}`) ?? '')
    }

    setLevelList([...levelList, id])
    last.insertAdjacentElement('afterend', newLevel)
  }

  const handleAdd = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const wrapper = document.querySelector('fieldset.levels')
    if (!wrapper) return
    addNewLevel(wrapper as HTMLFieldSetElement)
  }

  return (
    <div className="level-director">
      <button onClick={handleRemove}>- Remove Level</button>
      <button onClick={handleAdd}>+ Add Level</button>
    </div>
  )
}

export default LevelDirector
export type { LevelDirectorProps }
