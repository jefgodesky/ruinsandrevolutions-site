const getRepeatableElements = <T>(orig: Array<T>, defaultNum: number = 3, param?: string): Array<T | null> => {
  const parsed = parseInt(param ?? `${defaultNum}`)
  const queried = isNaN(parsed) ? defaultNum : parsed
  const num = Math.max(queried, orig.length)
  const arr: Array<T | null> = []
  for (let i = 0; i < num; i++) arr.push(orig[i] ?? null)
  return arr
}

export default getRepeatableElements
