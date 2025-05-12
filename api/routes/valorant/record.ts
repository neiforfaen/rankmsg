import type { MMRHistory, Record } from '@/global-types'
import { Hono } from 'hono'
import { env } from 'hono/adapter'
import aggregateMmr from '../../../utils/val-mmr-aggregate'
import get from 'axios'

const recordRouter = new Hono().basePath('/v1')

type Env = {
  VAL_API_KEY: string
}

recordRouter.get('/daily/:region/:name/:tag', async (c) => {
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
      `https://api.henrikdev.xyz/valorant/v1/mmr-history/${region}/${name}/${tag}?api_key=${VAL_API_KEY}`
    )

    if (!data) {
      return c.json({ message: 'Player not found' }, 404)
    }

    const mmrHistory: MMRHistory = data.map(
      ({ date, date_raw, mmr_change_to_last_game }: Record) => ({
        date,
        date_raw,
        mmr_change_to_last_game,
      })
    )

    const { mmr, wins, losses } = aggregateMmr(mmrHistory, 'daily')
    const sign = mmr === 0 ? '' : mmr > 0 ? '+' : '-'

    return c.json({
      message: `${wins}W / ${losses}L | ${sign}${mmr}RR`,
    })
  } catch (error) {
    const { message } = error as Error
    return c.json({ error: message }, 500)
  }
})

export default recordRouter
