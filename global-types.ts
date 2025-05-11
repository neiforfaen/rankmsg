export type Record = {
  currenttier: number
  currenttierpatched: string
  images: {
    small: string
    large: string
    triangle_up: string
    triangle_down: string
  }
  match_id: string
  map: {
    id: string
    name: string
  }
  season_id: string
  ranking_in_tier: number
  mmr_change_to_last_game: number
  elo: number
  date: string
  date_raw: number
}

export type MMRHistory = Pick<
  Record,
  'date' | 'date_raw' | 'mmr_change_to_last_game'
>[]
