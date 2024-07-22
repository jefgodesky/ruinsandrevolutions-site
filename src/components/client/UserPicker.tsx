import React, { useState, useEffect, useRef, type ChangeEvent, type KeyboardEvent } from 'react'
import axios from 'axios'

interface UserPickerProps {
  src: string
  users: string
}

interface UserRecord {
  username: string
  name: string
}

const UserPicker: React.FC<UserPickerProps> = ({ src, users }) => {
  const [value, setValue] = useState('')
  const [candidates, setCandidates] = useState<UserRecord[]>([])
  const [userList, setUsers] = useState<UserRecord[]>([])
  const debounceTimeout = useRef<number | null>(null)
  const srcInput = useRef<HTMLInputElement | null>(null)
  const candidateItems = useRef<(HTMLLIElement | null)[]>([])
  const apiBase = 'https://api.ruinsandrevolutions.com/v1'

  useEffect(() => {
    srcInput.current = document.getElementById(src) as HTMLInputElement
    srcInput.current.setAttribute('type', 'hidden')
  }, [src])

  useEffect(() => {
    fetchInitialUsers()
  })

  useEffect(() => {
    if (srcInput.current) {
      const usernames = userList.map((user: UserRecord) => user.username)
      srcInput.current.value = usernames.join(', ')
    }
  }, [userList])

  function isNotNull<T>(value: T | null): value is T {
    return value !== null
  }

  const fetchInitialUsers = async (): Promise<void> => {
    if (!users || !users.length) return
    const usernames = users.split(',').map(username => username.trim())
    const fetchedUsers: (UserRecord | null)[] = await Promise.all(usernames.map(async (username: string) => {
      try {
        const res = await axios.get(`${apiBase}/users/${username}`)
        return { username: res.data.username, name: res.data.name }
      } catch (err) {
        console.error(`Error fetching ${username}:`, err)
        return null
      }
    }))
    const filteredUsers: UserRecord[] = fetchedUsers.filter(isNotNull)
    setUsers(filteredUsers)
  }

  const handleUserKeyDown = (event: KeyboardEvent<HTMLLIElement>, username: string) => {
    const remove = ['Enter', 'Escape', 'x', 'X']
    if (remove.includes(event.key)) {
      removeUser(username)
    }
  }

  const handleFinderKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && candidates.length > 0) {
      event.preventDefault()
      event.stopPropagation()
      addUser(candidates[0])
      setValue('')
      setCandidates([])
    } else if (event.key === 'ArrowDown' && candidates.length > 0) {
      event.preventDefault()
      candidateItems.current[0]?.focus()
    }
  }

  const handleCandidateKeyDown = (event: KeyboardEvent<HTMLLIElement>, index: number) => {
    event.preventDefault()
    if (event.key === 'ArrowDown') {
      const next = (index + 1) % candidates.length
      candidateItems.current[next]?.focus()
    } else if (event.key === 'ArrowUp') {
      const prev = (index - 1) % candidates.length
      candidateItems.current[prev]?.focus()
    } else if (event.key === 'Enter') {
      addUser(candidates[index])
      setValue('')
      setCandidates([])
    }
  }

  const handleFinderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setValue(value)
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current)
    debounceTimeout.current = window.setTimeout(() => {
      findUsers(value)
    }, 500)
  }

  const findUsers = async (query: string) => {
    if (query.trim() === '') {
      setCandidates([])
      return
    }

    try {
      const endpoint = `${apiBase}/users`
      const res = await axios.get(`${endpoint}?q=${value}`)
      const candidates = res.data.users.map((user: any) => ({
        username: user.username,
        name: user.name
      }))
      setCandidatesList(candidates)
    } catch (err) {
      console.error('Error fetching users:', err)
      setCandidates([])
    }
  }

  const setCandidatesList = (newCandidates: UserRecord[], selected: UserRecord[] = userList) => {
    const usernames = selected.map((user: UserRecord) => user.username)
    const filtered = newCandidates.filter((user: UserRecord) => !usernames.includes(user.username))
    setCandidates(filtered)
  }

  const addUser = (user: UserRecord) => {
    const newUsers: UserRecord[] = [...userList, user]
    setUsers(newUsers)
    setCandidatesList(candidates, newUsers)
  }

  const removeUser = (username: string) => {
    setUsers(userList.filter((user) => user.username !== username))
  }

  return (
    <>
      {userList && userList.length > 0 && (<ul className='user-picker-selected'>
        {userList.map((user: UserRecord) => (
          <li
            key={`${src}-users-${user.username}`}
            onClick={() => removeUser(user.username)}
            onKeyDown={(event: KeyboardEvent<HTMLLIElement>) => handleUserKeyDown(event, user.username)}
            tabIndex={0}
          >
            {user.name} ({user.username})
          </li>
        ))}
      </ul>)}
      <input
        type='text'
        name={`${src}-finder`}
        id={`${src}-finder`}
        value={value}
        onChange={handleFinderChange}
        onKeyDown={handleFinderKeyDown} />
      {candidates && candidates.length > 0 && (<ul className='user-picker-candidates'>
        {candidates.map((candidate: UserRecord, index: number) => (
          <li
            key={`${src}-candidates-${candidate.username}`}
            onClick={() => addUser(candidate)}
            onKeyDown={(event: KeyboardEvent<HTMLLIElement>) => handleCandidateKeyDown(event, index)}
            ref={el => candidateItems.current[index] = el}
            tabIndex={0}
          >
            {candidate.name} ({candidate.username})
          </li>
        ))}
      </ul>)}
    </>
  )
}

export default UserPicker
export type { UserPickerProps }
