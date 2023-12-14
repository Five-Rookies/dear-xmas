import { useState } from 'react'

const useLoadMore = (initialCount: number, increment: number) => {
  const [loadedCount, setLoadedCount] = useState(initialCount)

  const loadMore = () => {
    setLoadedCount(prevCount => prevCount + increment)
  }

  return { loadedCount, loadMore }
}

export default useLoadMore