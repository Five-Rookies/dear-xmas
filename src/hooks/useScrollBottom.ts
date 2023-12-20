import { useState, useRef, useEffect } from 'react'

export function useScrollBottom(loadPosition: number): boolean {
  const [isBottom, setIsBottom] = useState(false)
  const timeoutIdRef = useRef<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      /**
       * document.documentElement.scrollTop : 요소의 콘텐츠가 수직으로 스크롤되는 픽셀 수
       * window.innerHeight : 창의 내부 높이를 픽셀 단위로 반환
       * 화면의 최상단으로부터의 거리(scrollTop)와 화면의 높이(innerHeight)를 더한 값
       * 현재 스크롤 위치의 하단을 나타냅니다
       */
      const scrollBottomPosition = Math.ceil(
        document.documentElement.scrollTop + window.innerHeight,
      )
      // 문서의 전체 높이 : 테두리, 패딩, 가로 스크롤 막대(렌더링된 경우)를 포함한 높이
      const documentHeight = document.documentElement.offsetHeight

      // 스크롤이 최하단에 가기 전에 미리 로드하기 위해 loadPosition을 더함
      const isScrollAtBottom =
        Math.ceil(scrollBottomPosition + loadPosition) >= documentHeight

      // isBottom 값이 변경되면, 0.5초 동안은 변경되지 않도록 setTimeout 사용
      if (timeoutIdRef.current === null) {
        setIsBottom(isScrollAtBottom)
        timeoutIdRef.current = window.setTimeout(() => {
          timeoutIdRef.current = null
        }, 500)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      // 컴포넌트가 언마운트될 때 스크롤 이벤트 정리
      window.removeEventListener('scroll', handleScroll)
      if (timeoutIdRef.current !== null) {
        // 컴포넌트 언마운트 시 timeout 취소
        clearTimeout(timeoutIdRef.current)
      }
    }
  }, [])

  return isBottom
}

export default useScrollBottom
