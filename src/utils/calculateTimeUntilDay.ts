export const calculateTimeUntilDays = (
  dDay: string,
  compareDate: Date,
  setTimeRemaining: (item: string) => void,
  setDayRemaining: (item: string) => void,
) => {
  const now = new Date()

  const difference = compareDate.getTime() - now.getTime()
  if (compareDate.getDate() - now.getDate() === 0) {
    return setDayRemaining(dDay)
  }
  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  )
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((difference % (1000 * 60)) / 1000)
  setDayRemaining(`D-${days + 1}`)
  setTimeRemaining(
    `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
  )
}

export const dateFomatter = (date: any): string => {
  const originalDate = new Date(date?.toString() as string)

  const year = originalDate.getFullYear().toString().substr(-2) // 연도의 뒤 2자리
  const month = (originalDate.getMonth() + 1).toString().padStart(2, '0') // 월
  const day = originalDate.getDate().toString().padStart(2, '0') // 일
  const hours = originalDate.getHours().toString().padStart(2, '0') // 시
  const minutes = originalDate.getMinutes().toString().padStart(2, '0') // 분

  const formattedDate = `${year}/${month}/${day} ${hours}:${minutes}`
  return formattedDate
}

export const dateDifference = (date: any): string => {
  const previous = new Date(date)
  const current = new Date()
  const millisecondsPerMinute: number = 60 * 1000
  const millisecondsPerHour: number = millisecondsPerMinute * 60
  const millisecondsPerDay: number = millisecondsPerHour * 24
  const millisecondsPerMonth: number = millisecondsPerDay * 30
  const millisecondsPerYear: number = millisecondsPerDay * 365

  const elapsed: number = current.getTime() - previous.getTime()

  if (elapsed < millisecondsPerMinute) {
    return `${Math.round(elapsed / 1000)}초 전`
  }
  if (elapsed < millisecondsPerHour) {
    return `${Math.round(elapsed / millisecondsPerMinute)}분 전`
  }
  if (elapsed < millisecondsPerDay) {
    return `${Math.round(elapsed / millisecondsPerHour)}시간 전`
  }
  if (elapsed < millisecondsPerMonth) {
    return `${Math.round(elapsed / millisecondsPerDay)}일 전`
  }
  if (elapsed < millisecondsPerYear) {
    return `${Math.round(elapsed / millisecondsPerMonth)}달 전`
  }

  return `${Math.round(elapsed / millisecondsPerYear)}년 전`
}
