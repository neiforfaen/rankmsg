import type { MMRHistory } from '@/global-types'
import { isToday } from './date-checker'

type AggregationTime = 'daily' | 'weekly'

type AggregatedMMR = {
  mmr: number
  wins: number
  losses: number
}

const aggregateMmr = (
  history: MMRHistory,
  time: AggregationTime
): AggregatedMMR => {
  if (time === 'daily') {
    const filteredHistory = history.filter((record) => isToday(record.date_raw))

    const { mmr, wins, losses } = filteredHistory.reduce(
      (acc, record) => {
        acc.mmr += record.mmr_change_to_last_game
        if (record.mmr_change_to_last_game > 0) {
          acc.wins++
        } else if (record.mmr_change_to_last_game < 0) {
          acc.losses++
        }
        return acc
      },
      { mmr: 0, wins: 0, losses: 0 }
    )

    return {
      mmr,
      wins,
      losses,
    }
  }

  if (time === 'weekly') {
    return {
      mmr: 0,
      wins: 0,
      losses: 0,
    }
  }

  throw new Error('Invalid or missing aggregation time')
}

export default aggregateMmr
