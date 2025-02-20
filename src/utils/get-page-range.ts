interface IPageRangeOptions {
  anchor: number
  min: number
  max: number
  size: number
}

const getPageRange = ({ anchor, min, max, size}: IPageRangeOptions): number[] => {
  if (anchor < min || anchor > max) return []
  if (max < min) return []

  const arr: number[] = [anchor]
  for (let i = 1; i < size; i++) {
    const up = anchor + i
    const down = anchor - i

    const tooHigh = up > max
    const tooLow = down < min

    if (tooHigh && tooLow) break
    if (arr.length >= size) break

    if (!tooHigh) arr.push(up)
    if (!tooLow) arr.push(down)
  }

  return arr.sort((a: number, b: number) => a - b)
}

export default getPageRange
export { type IPageRangeOptions }
