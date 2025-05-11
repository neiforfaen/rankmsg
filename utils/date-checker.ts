export const isToday = (timestamp: number): boolean => {
  const now = new Date()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() / 1000
  const endOfDay = startOfDay + 86400 - 1

  return timestamp >= startOfDay && timestamp <= endOfDay
}

export const isWithinPastWeek = () => null
