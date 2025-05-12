import get from 'axios'
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

    const validRegions = new Set(['eu', 'na', 'apac'])

    if (!validRegions.has(region) || !name || !tag) {
      return c.json({ error: 'Invalid region or missing name/tag' }, 400)
    }

    const {
      data: { data },
    } = await get(
      `https://api.henrikdev.xyz/valorant/v2/mmr/${region}/${name}/${tag}?api_key=${VAL_API_KEY}`
    )

    if (!data) {
      return c.json({ message: 'Player not found' }, 404)
    }

    const { current_data, highest_rank } = data
    return c.json({
      message: `${current_data.currenttierpatched} [${current_data.ranking_in_tier}RR] | Peak: ${highest_rank.patched_tier} @ ${highest_rank.season}`,
    })
  } catch (error) {
    const { message } = error as Error
    return c.json({ error: message }, 500)
  }
})

export default rankRouter
