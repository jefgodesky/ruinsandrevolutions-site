import axios from 'axios'
import type { WorldRecord } from './get-worlds.ts'

interface CampaignRecord {
  name: string
  slug: string
  path: string
}

interface CampaignWorld {
  world: WorldRecord
  campaigns: CampaignRecord[]
}

interface CampaignDirectory {
  [key: string]: CampaignWorld
}

const getCampaigns = async (apiRoot: string, headers: { [key: string]: string }): Promise<CampaignDirectory> => {
  const directory: CampaignDirectory = {}
  let done = false
  let page = 1
  let count = 0

  while (!done) {
    try {
      const { data } = await axios.get(`${apiRoot}/campaigns?page=${page}&page_size=500`, { headers })
      for (const campaign of data.campaigns) {
        const worldSlug = campaign.world.path.substring(8)
        const world: WorldRecord = { name: campaign.world.name, slug: worldSlug }
        const record: CampaignRecord = { name: campaign.name, slug: campaign.slug, path: `${worldSlug}/${campaign.slug}`}
        if (!directory[worldSlug]) directory[worldSlug] = { world, campaigns: [] }
        directory[worldSlug].campaigns.push(record)
        count++
      }
      done = (count >= data.total)
    } catch (err) {
      console.error(err)
      done = true
    }
  }

  return directory
}

export default getCampaigns
export type { CampaignRecord, CampaignWorld, CampaignDirectory }
