import type { MMRHistory, Record } from '@/global-types'
import { Hono } from 'hono'
import { env } from 'hono/adapter'
import aggregateMmr from '../../../utils/val-mmr-aggregate'

const recordRouter = new Hono().basePath('/v1')

type Env = {
  VAL_API_KEY: string
}

recordRouter.get('/daily/:region/:name/:tag', async (c) => {
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
      `https://api.henrikdev.xyz/valorant/v1/mmr-history/${region}/${name}/${tag}?api_key=${VAL_API_KEY}`
    )
    const { data } = await raw.json()

    if (!data) {
      return c.json({ message: 'Player not found' }, 404)
    }

    const mmrHistory: MMRHistory = data.map((record: Record) => ({
      date: record.date,
      date_raw: record.date_raw,
      mmr_change_to_last_game: record.mmr_change_to_last_game,
    }))

    const { mmr, wins, losses } = aggregateMmr(mmrHistory, 'daily')

    return c.json({
      message: `${wins}W / ${losses}L | ${mmr > 0 ? '+' : '-'}${mmr}RR`,
    })
  } catch (error) {
    const { message } = error as Error
    return c.json({ error: message }, 500)
  }
})

export default recordRouter
