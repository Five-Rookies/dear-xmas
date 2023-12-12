export const calculateTimeUntilDays = (
  dDay: string,
  compareDate: Date,
  setTimeRemaining: (item: string) => void,
  setDayRemaining: (item: string) => void,
) => {
  const now = new Date()

  if (dDay === 'D-Day' && now.getMonth() === 11 && now.getDate() > 25) {
    compareDate.setFullYear(compareDate.getFullYear() + 1)
  }
  const difference = compareDate.getTime() - now.getTime()

  if (difference <= 0) {
    return setDayRemaining(dDay)
  }
  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  )
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((difference % (1000 * 60)) / 1000)
  setDayRemaining(`D-${days}`)
  setTimeRemaining(
    `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
  )
}
