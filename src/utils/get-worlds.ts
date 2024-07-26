import axios from 'axios'

interface WorldRecord {
  name: string
  slug: string
}

const getWorlds = async (apiRoot: string, headers: { [key: string]: string }): Promise<WorldRecord[]> => {
  let worlds: WorldRecord[] = []
  let done = false
  let page = 1

  while (!done) {
    try {
      const { data } = await axios.get(`${apiRoot}/worlds?page=${page}&page_size=500`, { headers })
      worlds = [...worlds, ...data.worlds.map((world: any) => ({ name: world.name, slug: world.path.substring(8) }))]
      done = (worlds.length >= data.total)
    } catch (err) {
      console.error(err)
      done = true
    }
  }

  return worlds
}

export default getWorlds
export type { WorldRecord }
