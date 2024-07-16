const makeQueryString = (orig: { [key: string]: string | number }, changes: { [key: string]: string | number }): string => {
  const newQuery = Object.assign({}, orig, changes)
  const elems = Object.keys(newQuery).map(key => `${key}=${newQuery[key]}`)
  return `?${elems.join('&')}`
}

export default makeQueryString
