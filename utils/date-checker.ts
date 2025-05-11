export const isToday = (timestamp: number): boolean => {
  const date = new Date(timestamp * 1000)
  const today = new Date()

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

export const isWithinPastWeek = () => null
