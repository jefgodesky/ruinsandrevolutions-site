import React, { type MouseEvent } from 'react'

interface StageDirectorProps {
  stages: string[]
}

const StageDirector: React.FC<StageDirectorProps> = ({ stages }) => {
  const [stageList, setStageList] = React.useState(stages)

  const handleRemove = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const lastId = stageList.pop() ?? ''
    const last = document.getElementById(lastId)
    if (last) last.remove()
    setStageList(stageList)
  }

  const getNextId = (): string => {
    const numbers = stageList.map(id => {
      const elems = id.split('-')
      return parseInt(elems[1])
    }).filter(x => !isNaN(x))
    const max = numbers.length ? Math.max(...numbers) : 0
    return `stage-${max + 1}`
  }

  const addNewStage = (wrapper: HTMLFieldSetElement) => {
    const existing = Array.from(wrapper.querySelectorAll('fieldset'))
    const last = existing.pop()
    if (!last) return

    const oldId = last.getAttribute('id') ?? ''
    const newId = getNextId()
    const newStage = last.cloneNode(true) as HTMLFieldSetElement
    newStage.setAttribute('id', newId)
    newStage.setAttribute('name', newId)
    newStage.setAttribute('key', newId)

    const labels = newStage.querySelectorAll('label')
    for (const label of labels) {
      const oldFor = label.getAttribute('for') ?? ''
      label.setAttribute('for', oldFor.replace(oldId, newId))
    }

    const inputs = newStage.querySelectorAll('input, textarea')
    for (const input of inputs) {
      const oldName = input.getAttribute('name') ?? ''
      const newName = oldName.replace(oldId, newId)
      input.setAttribute('name', newName)
      input.setAttribute('id', newName)
      input.removeAttribute('placeholder')
    }

    setStageList([...stageList, newId])
    last.insertAdjacentElement('afterend', newStage)
  }

  const handleAdd = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const wrapper = document.querySelector('fieldset.stages')
    if (!wrapper) return
    addNewStage(wrapper as HTMLFieldSetElement)
  }

  return (
    <div className="stage-director">
      <button onClick={handleRemove}>- Remove Stage</button>
      <button onClick={handleAdd}>+ Add Stage</button>
    </div>
  )
}

export default StageDirector
export type { StageDirectorProps }
