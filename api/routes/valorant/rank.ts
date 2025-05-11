import { Hono } from 'hono'
import { env } from 'hono/adapter'

const rankRouter = new Hono()

type Env = {
  VAL_API_KEY: string
}

rankRouter.get('/v1/:region/:name/:tag', async (c) => {
  try {
    const { VAL_API_KEY } = env<Env>(c, 'edge-light')
    const { name, tag, region } = c.req.param()

    if (!['eu', 'na', 'ap', 'kr'].includes(region)) {
      return c.json({ error: 'Invalid region' }, 400)
    }

    if (!name || !tag) {
      return c.json({ error: 'Name and tag are required' }, 400)
    }

    const raw = await fetch(
      `https://api.henrikdev.xyz/valorant/v2/mmr/${region}/${name}/${tag}?api_key=${VAL_API_KEY}`
    )
    const { data } = await raw.json()

    if (!data) {
      return c.json({ message: 'Player not found' }, 404)
    }

    const currentRank: string = data.current_data.currenttierpatched
    const currentMMR: number = data.current_data.ranking_in_tier
    const peakRank: string = data.highest_rank.patched_tier
    const peakSeason: string = data.highest_rank.season.toUpperCase()

    return c.json({
      message: `${currentRank} [${currentMMR}RR] | Peak: ${peakRank} @ ${peakSeason}`,
    })
  } catch (error) {
    const { message } = error as Error
    return c.json({ error: message }, 500)
  }
})

export default rankRouter
