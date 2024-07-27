import React, { useEffect, useRef, useState, type ChangeEvent, type MouseEvent } from 'react'
import axios from 'axios'
import slugify from 'slugify'
import type { WorldRecord } from '../../utils/get-worlds'

interface SlugFieldProps {
  name: string
  slug: string
  world: WorldRecord | null
  worlds: WorldRecord[] | null
  collection: string
  nameField: string
  slugField: string
  slugNote: string
  worldField: string
  worldNote: string
  placeholder: string
  isEdit: boolean
}

const SlugField: React.FC<SlugFieldProps> = ({ name = '', slug = '', world, worlds, collection, nameField, slugField, slugNote, worldField, worldNote, placeholder, isEdit }) => {
  const AUTO_MODE = 'auto'
  const MANUAL_MODE = 'manual'
  const initialSlug = world
    ? [world.slug, slug].join('/')
    : slug
  const initialWorld = world
    ? world
    : worlds && worlds.length > 0
      ? worlds[0]
      : null
  const initialMode = name === '' && slug === ''
    ? AUTO_MODE
    : initialWorld
      ? initialSlug === [initialWorld.slug, slugify(name, { lower: true })].join('/') ? AUTO_MODE : MANUAL_MODE
      : slug === slugify(name, { lower: true }) ? AUTO_MODE : MANUAL_MODE

  const [nameValue, setNameValue] = useState(name)
  const [slugValue, setSlugValue] = useState(initialSlug)
  const [worldValue, setWorldValue] = useState(initialWorld)
  const [isAvailable, setIsAvailable] = useState<boolean>(true)
  const [mode, setMode] = useState<string>(initialMode)
  const debounceTimeout = useRef<number | null>(null)

  useEffect(() => {
    document.getElementById(nameField)?.remove()
    document.getElementById(slugField)?.remove()
  }, [nameField, slugField])

  useEffect(() => {
    if (slugValue) {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current)
      debounceTimeout.current = window.setTimeout(() => {
        checkAvailability()
      }, 500)
    }
  }, [slugValue])

  const checkAvailability = async (): Promise<void> => {
    try {
      const base = 'https://api.ruinsandrevolutions.com/v1'
      const endpoint = [base, collection, slugValue].join('/')
      await axios.head(endpoint)
      setIsAvailable(false)
    } catch (err: any) {
      setIsAvailable(true)
    }
  }

  const makeSlug = (value: string): string => {
    const slugElem = worldValue !== null && value.startsWith(worldValue.slug)
      ? value.substring(worldValue.slug.length + 1)
      : value
    return worldValue === null
      ? value
      : [worldValue.slug, slugElem].join('/')
  }

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNameValue(event.target.value)
    if (mode === AUTO_MODE) setSlugValue(makeSlug(slugify(event.target.value, { lower: true })))
  }

  const handleSlugChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSlugValue(makeSlug(event.target.value))
  }

  const handleWorldChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const slug = event.target.value
    const name = worlds?.find(w => w.slug === slug)?.name ?? slug
    setWorldValue({ name, slug })

    const slugElems = slugValue.split('/')
    setSlugValue([slug, slugElems[1]].join('/'))
  }

  const handleEditClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setMode(MANUAL_MODE)
  }

  const displayAvailability = () => {
    if (isEdit && slugValue === initialSlug) {
      return
    } else if (isAvailable) {
      return (<span className='success'>/{slugValue} is available</span>)
    } else {
      return (<span className='failure'>/{slugValue} already exists</span>)
    }
  }

  return (
    <>
      <input
        type='text'
        name={nameField}
        id={nameField}
        placeholder={placeholder}
        value={nameValue}
        onChange={handleNameChange}
      />
      {mode === AUTO_MODE && (<input type="hidden" name={slugField} value={slugValue.substring(slugValue.lastIndexOf('/') + 1)}/>)}
      {slugValue && slugValue !== '' && slugValue !== `${worldValue?.slug}/` && mode === AUTO_MODE && <p className='slug'>
        <strong>Slug:</strong>&nbsp;
        /{slugValue}&nbsp;
        <a href='#' onClick={handleEditClick}>Edit</a>&nbsp;
        {displayAvailability()}
      </p>}
      {mode === MANUAL_MODE && (<>
        <label htmlFor={slugField}>
          Slug
          <span className='note'>{slugNote}</span>
        </label>
        <input
          type='text'
           name={slugField}
           id={slugField}
          value={slugValue.substring(slugValue.lastIndexOf('/') + 1)}
          onChange={handleSlugChange}
        />
        <p className='status'>{displayAvailability()}</p>
      </>)}
      {worlds && worlds.length > 0 && (<>
        <label htmlFor={worldField}>
          World
          <span className='note'>{worldNote}</span>
        </label>
        <select name={worldField} id={worldField} onChange={handleWorldChange}>
          {worlds.map(world => (<option key={world.slug} value={world.slug}>{world.name}</option>))}
        </select>
      </>)}
    </>
  )
}

export default SlugField
export type { SlugFieldProps }
