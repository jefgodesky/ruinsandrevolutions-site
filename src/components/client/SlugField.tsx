import React, { useEffect, useRef, useState, type ChangeEvent, type MouseEvent } from 'react'
import axios from 'axios'
import slugify from 'slugify'

interface SlugFieldProps {
  name: string
  slug: string
  slugNote: string
  placeholder: string
}

const SlugField: React.FC<SlugFieldProps> = ({ name, slug, slugNote, placeholder }) => {
  const AUTO_MODE = 'auto'
  const MANUAL_MODE = 'manual'

  const [nameValue, setNameValue] = useState('')
  const [slugValue, setSlugValue] = useState('')
  const [isAvailable, setIsAvailable] = useState<boolean>(true)
  const [mode, setMode] = useState<string>(AUTO_MODE)
  const debounceTimeout = useRef<number | null>(null)

  useEffect(() => {
    document.getElementById(name)?.remove()
    document.getElementById(slug)?.remove()
  }, [name, slug])

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
      const endpoint = `${base}/worlds/${slugValue}`
      await axios.head(endpoint)
      setIsAvailable(false)
    } catch (err: any) {
      setIsAvailable(true)
    }
  }

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNameValue(event.target.value)
    if (mode === AUTO_MODE) setSlugValue(slugify(event.target.value, { lower: true }))
  }

  const handleSlugChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSlugValue(event.target.value)
  }

  const handleEditClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setMode(MANUAL_MODE)
  }

  const displayAvailability = () => {
    if (isAvailable) {
      return (<span className='success'>/{slugValue} is available</span>)
    } else {
      return (<span className='failure'>/{slugValue} already exists</span>)
    }
  }

  return (
    <>
      <input
        type='text'
        name={name}
        id={name}
        placeholder={placeholder}
        value={nameValue}
        onChange={handleNameChange}
      />
      {mode === AUTO_MODE && (<input type="hidden" name={slug} value={slugValue}/>)}
      {slugValue && slugValue !== '' && mode === AUTO_MODE && <p className='slug'>
        <strong>Slug:</strong>&nbsp;
        /{slugValue}&nbsp;
        <a href='#' onClick={handleEditClick}>Edit</a>&nbsp;
        {displayAvailability()}
      </p>}
      {mode === MANUAL_MODE && (<>
        <label htmlFor={slug}>
          Slug
          <span className='note'>{slugNote}</span>
        </label>
        <input
          type='text'
           name={slug}
           id={slug}
          value={slugValue}
          onChange={handleSlugChange}
        />
        <p className='status'>{displayAvailability()}</p>
      </>)}
    </>
  )
}

export default SlugField
export type { SlugFieldProps }