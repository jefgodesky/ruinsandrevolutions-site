const getQuery = (q: URLSearchParams): { [key: string]: string | number } => {
  const query: { [key: string]: string | number } = {}
  for (const key of q.keys()) {
    let val = q.get(key) ?? ''
    const parsed = parseInt(val)
    query[key] = isNaN(parsed) ? val : parsed
  }
  return query
}

export default getQuery
