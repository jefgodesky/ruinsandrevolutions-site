import React, { type ReactElement } from 'react'

interface ICardProps {
  title: string
  url: string
  prompt?: string
  classes?: string[]
  children: React.ReactNode
}

export default function Card (props: ICardProps): ReactElement {
  const { title, url, prompt, children } = props
  const classes = props.classes ?? []
  const cardClasses = ['card', ...classes]
    .map(cls => cls.trim())
    .join(' ')

  return (
    <article
      className={cardClasses}
      onClick={() => { window.location.assign(url) }}
    >
      <h3>{title}</h3>
      {children}
      {prompt && <a href={url} className='dest'>{prompt}</a>}
    </article>
  )
}
