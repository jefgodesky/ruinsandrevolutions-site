import { expect, describe, it } from 'vitest'
import getPageRange, { type IPageRangeOptions } from './get-page-range.ts'

describe('getPageRange', () => {
  it('gets a range around a number', async () => {
    const options: IPageRangeOptions = { anchor: 5, min: 1, max: 10, size: 5 }
    expect(getPageRange(options)).toEqual([3, 4, 5, 6, 7])
  })

  it('pushes up from the floor', async () => {
    const options: IPageRangeOptions = { anchor: 2, min: 1, max: 10, size: 5 }
    expect(getPageRange(options)).toEqual([1, 2, 3, 4, 5])
  })

  it('pushes down from the ceiling', async () => {
    const options: IPageRangeOptions = { anchor: 9, min: 1, max: 10, size: 5 }
    expect(getPageRange(options)).toEqual([6, 7, 8, 9, 10])
  })

  it('returns the whole range if size is greater than max - min', async () => {
    const options: IPageRangeOptions = { anchor: 5, min: 1, max: 10, size: 20 }
    expect(getPageRange(options)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })

  it('returns an empty array if anchor is not between min and max', async () => {
    const options: IPageRangeOptions = { anchor: 21, min: 1, max: 10, size: 5 }
    expect(getPageRange(options)).toEqual([])
  })

  it('returns an empty array if max is less than min', async () => {
    const options: IPageRangeOptions = { anchor: 5, min: 10, max: 1, size: 5 }
    expect(getPageRange(options)).toEqual([])
  })

  it('returns an empty array if anchor is not between min and max', async () => {
    const options: IPageRangeOptions = { anchor: 21, min: 1, max: 10, size: 5 }
    expect(getPageRange(options)).toEqual([])
  })
})
