import React, { useEffect, useRef, useState, type ChangeEvent, type MouseEvent } from 'react'

interface AffinityAversionProps {
  species: {
    affinities: string[]
    aversion: string
    [key: string]: any
  }
  physical: string[]
  mental: string[]
}

const AffinityAversionSelector: React.FC<AffinityAversionProps> = ({ species, physical = ['Strength', 'Dexterity', 'Constitution'], mental = ['Intelligence', 'Wisdom', 'Charisma'] }) => {
  const [affinities, setAffinities] = useState(species?.affinities ?? ['Dexterity', 'Charisma'])
  const [aversion, setAversion] = useState(species?.aversion ?? 'Strength')

  const isSameAbility = (a: string, b: string): boolean => {
    return a.toLowerCase() === b.toLowerCase()
  }

  const isInSet = (set: string[], ability: string): boolean => {
    return set.map(ability => ability.toLowerCase()).includes(ability.toLowerCase())
  }

  const getAffinity = (set: string[]): string => {
    for (const affinity of affinities) {
      if (isInSet(set, affinity)) return affinity
    }
    return set[0] ?? ''
  }

  const getNotAffinity = (affinities: string[]): string => {
    const abilities = [...physical, ...mental]
    console.log(abilities)
    const filtered = abilities.filter(ability => !isInSet(affinities, ability))
    return filtered.length ? filtered[0] : ''
  }

  const avoidAversionConflict = (affinities: string[]) => {
    if (isInSet(affinities, aversion)) {
      setAversion(getNotAffinity(affinities))
    }
  }

  const avoidAffinityConflict = (abilities: string[], aversion: string) => {
    if (isInSet(abilities, aversion)) {
      const filtered = abilities.filter(ability => !isSameAbility(ability, aversion))
      const newAffinities = affinities.filter((ability: string) => !isSameAbility(ability, aversion))
      if (filtered.length) newAffinities.push(filtered[0])
      setAffinities(newAffinities)
    }
  }

  const replaceAffinity = (oldAbility: string, newAbility: string) => {
    const newAffinities = [...affinities.filter((ability: string) => !isSameAbility(ability, oldAbility)), newAbility]
    setAffinities(newAffinities)
    avoidAversionConflict(newAffinities)
  }

  const setPhysicalAffinity = (ability: string) => {
    if (!isInSet(physical, ability)) return
    const currentPhysical = getAffinity(physical)
    replaceAffinity(currentPhysical, ability)
  }

  const setMentalAffinity = (ability: string) => {
    if (!isInSet(mental, ability)) return
    const currentMental = getAffinity(mental)
    replaceAffinity(currentMental, ability)
  }

  const pickAversion = (ability: string) => {
    setAversion(ability)
    if (isInSet(affinities, ability)) {
      const set = isInSet(physical, ability) ? physical : mental
      avoidAffinityConflict(set, ability)
    }
  }

  const renderAbility = (ability: string, type: string) => {
    const affinityClasses = ['selection', 'affinity']
    const aversionClasses = ['selection', 'aversion']
    const labelClasses = ['label']
    if (isInSet(affinities, ability)) { affinityClasses.push('selected'); labelClasses.push('affinity') }
    if (isSameAbility(aversion, ability)) { aversionClasses.push('selected'); labelClasses.push('aversion') }
    const onAffinityClick = type === 'physical' ? setPhysicalAffinity : setMentalAffinity

    return (<tr key={ability}>
      <td className={labelClasses.join(' ')}>{ability}</td>
      <td
        className={affinityClasses.join(' ')}
        onClick={() => onAffinityClick(ability)}
      >Affinity</td>
      <td
        className={aversionClasses.join(' ')}
        onClick={() => pickAversion(ability)}
      >Aversion</td>
    </tr>)
  }

  return (
    <>
      <label>
        Affinities &amp; Aversions
        <span className="note">Each species has two <strong>affinities</strong> &mdash;
          abilities that its members are naturally gifted at, due to their biological
          or magical nature &mdash; and one <strong>aversion</strong> &mdash; an ability
          that its members struggle with for a similarly innate reason.</span>
      </label>
      <input type="hidden" name="affinity1" value={affinities[0].toLowerCase()} />
      <input type="hidden" name="affinity2" value={affinities[1].toLowerCase()} />
      <input type="hidden" name="aversion" value={aversion.toLowerCase()} />
      <table className="affinities-aversion">
        <tbody>
        {physical.map(ability => renderAbility(ability, 'physical'))}
        {mental.map(ability => renderAbility(ability, 'mental'))}
        </tbody>
      </table>
    </>
  )
}

export default AffinityAversionSelector
export type { AffinityAversionProps }
