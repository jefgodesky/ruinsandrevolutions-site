import { describe, it, expect, afterEach, vi } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import Card from './Card'

describe('Card', () => {
  const title = 'Card Title'
  const bodyText = 'This is the body of the card.'
  const url = '/test'
  const readMore = 'Read more'

  afterEach(cleanup)

  it('renders the card', () => {
    render(
      <Card title={title} url={url} prompt={readMore}>
        <p>{bodyText}</p>
      </Card>
    )

    expect(screen.getByText(title)).toBeDefined()
    expect(screen.getByText(bodyText)).toBeDefined()
    expect(screen.getByText(readMore).getAttribute('href')).toBe(url)
    expect(screen.getByText(readMore).className).toBe('dest')
  })

  it('skips the prompt', () => {
    render(
      <Card title={title} url={url}>
        <p>{bodyText}</p>
      </Card>
    )

    expect(screen.queryByText(readMore)).toBeNull()
  })

  it('handles clicks', () => {
    Object.defineProperty(window.location, 'assign', {
      writable: true,
      configurable: true,
      value: vi.fn()
    })

    const { container } = render(
      <Card title={title} url={url}>
        <p>{bodyText}</p>
      </Card>
    )

    const card = container.querySelector('article.card')
    fireEvent.click(card!)

    expect(window.location.assign).toHaveBeenCalledWith(url)
  })
})
