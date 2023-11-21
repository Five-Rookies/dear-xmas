import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'

const formatRelativeDate = (dateString: string): string => {
  const formatDate = new Date(dateString)
  return formatDistanceToNow(formatDate, { addSuffix: true, locale: ko })
}

export default formatRelativeDate
