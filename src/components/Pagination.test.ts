import { expect, describe, it } from 'vitest'
import render from '../utils/testing/render.ts'
import Pagination from './Pagination.astro'

interface IPaginationLinks {
  first?: Element
  previous?: Element
  current?: Element
  next?: Element
  last?: Element
  numbered?: Element[]
}

describe('Pagination', () => {
  const base = '/test'

  const getNavLinks = (doc: DocumentFragment): IPaginationLinks => {
    return {
      first: doc.querySelector('a.first') ?? undefined,
      previous: doc.querySelector('a.prev') ?? undefined,
      current: doc.querySelector('.curr') ?? undefined,
      next: doc.querySelector('a.next') ?? undefined,
      last: doc.querySelector('a.last') ?? undefined,
      numbered: Array.from(doc.querySelectorAll('ol a'))
    }
  }

  const expectNumbered = (actual: Element[], expected: string[]) => {
    const map = actual.map(el => el.getAttribute('href'))
    expect(map).toEqual(expected)
  }

  it('renders nothing if there\'s only one page', async () => {
    const { first, previous, current, next, last, numbered } = getNavLinks(await render(
      Pagination,
      { props: { base, total: 1, curr: 1 } }
    ))

    expect(first).toBeUndefined()
    expect(previous).toBeUndefined()
    expect(current).toBeUndefined()
    expect(next).toBeUndefined()
    expect(last).toBeUndefined()
    expect(numbered).toHaveLength(0)
  })

  it('renders pagination for first of two pages', async () => {
    const { first, previous, current, next, last, numbered } = getNavLinks(await render(
      Pagination,
      { props: { base, total: 2, curr: 1 } }
    ))

    expect(first).toBeUndefined()
    expect(previous).toBeUndefined()
    expect(current?.innerHTML).toBe('1')
    expect(next?.getAttribute('href')).toBe(base + '/2')
    expect(last).toBeUndefined()
    expectNumbered(numbered!, [base + '/2'])
  })

  it('renders pagination for second of two pages', async () => {
    const { first, previous, current, next, last, numbered } = getNavLinks(await render(
      Pagination,
      { props: { base, total: 2, curr: 2 } }
    ))

    expect(first).toBeUndefined()
    expect(previous?.getAttribute('href')).toBe(base + '/1')
    expect(current?.innerHTML).toBe('2')
    expect(next).toBeUndefined()
    expect(last).toBeUndefined()
    expectNumbered(numbered!, [base + '/1'])
  })

  it('doesn\'t have first or previous on first page', async () => {
    const { first, previous, current, next, last, numbered } = getNavLinks(await render(
      Pagination,
      { props: { base, total: 10, curr: 1 } }
    ))

    const expected: string[] = []
    for (let i = 1; i <= 5; i++) {
      if (i !== 1) expected.push(`${base}/${i}`)
    }

    expect(first).toBeUndefined()
    expect(previous).toBeUndefined()
    expect(current?.innerHTML).toBe('1')
    expect(next?.getAttribute('href')).toBe(base + '/2')
    expect(last?.getAttribute('href')).toBe(base + '/10')
    expectNumbered(numbered!, expected)
  })

  it('doesn\'t have next or last on last page', async () => {
    const { first, previous, current, next, last, numbered } = getNavLinks(await render(
      Pagination,
      { props: { base, total: 10, curr: 10 } }
    ))

    const expected: string[] = []
    for (let i = 6; i <= 10; i++) {
      if (i !== 10) expected.push(`${base}/${i}`)
    }

    expect(first?.getAttribute('href')).toBe(base + '/1')
    expect(previous?.getAttribute('href')).toBe(base + '/9')
    expect(current?.innerHTML).toBe('10')
    expect(next).toBeUndefined()
    expect(last).toBeUndefined()
    expectNumbered(numbered!, expected)
  })

  it('shows everything in the middle', async () => {
    const { first, previous, current, next, last, numbered } = getNavLinks(await render(
      Pagination,
      { props: { base, total: 10, curr: 5 } }
    ))

    const expected: string[] = []
    for (let i = 3; i <= 7; i++) {
      if (i !== 5) expected.push(`${base}/${i}`)
    }

    expect(first?.getAttribute('href')).toBe(base + '/1')
    expect(previous?.getAttribute('href')).toBe(base + '/4')
    expect(current?.innerHTML).toBe('5')
    expect(next?.getAttribute('href')).toBe(base + '/6')
    expect(last?.getAttribute('href')).toBe(base + '/10')
    expectNumbered(numbered!, expected)
  })
})
