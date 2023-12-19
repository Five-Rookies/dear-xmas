import { useState, useEffect } from 'react'
import styles from '@/app/page.module.scss'
import { getSurveyResult } from '@/utils/apiRequest/surveyApiRequest'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import ISurvey from '@/type/SupabaseResponse'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip)

export const options = {
  indexAxis: 'y' as 'y' | 'x',
  elements: {
    bar: {
      borderWidth: 0,
    },
  },
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        align: 'start' as 'start' | 'center' | 'end' | 'inner' | undefined, // 왼쪽 정렬로 변경
      },
    },
    y: {
      ticks: {
        font: {
          size: 20,
          family: "'pretendard', sans-serif",
        },
      },
      grid: {
        display: false,
      },
    },
  },
  datasets: {
    bar: {
      barThickness: 40,
      barPercentage: 0.7,
    },
  },
}

const SurveyGraph = () => {
  const [surveyData, setSurveyData] = useState<ISurvey[]>([])
  const [isToggleListShow, setToggleListShow] = useState<boolean>(false)
  const [toggleIndex, setToggleIndex] = useState<number>(0)

  const handleToggle = (index: number): void => {
    setToggleIndex(index === toggleIndex ? -1 : index)
  }

  const handleAllToggle = (): void => {
    setToggleListShow(!isToggleListShow)
    setToggleIndex(-1)
  }

  useEffect(() => {
    const fetchSurveyData = async (): Promise<void> => {
      const data = await getSurveyResult()
      if (data) {
        setSurveyData(data)
      }
    }
    fetchSurveyData()
  }, [])

  const questionList: string[] = [
    '여러분은 산타를 몇살까지 믿었나요?',
    '마음에 들지 않은 선물을 받았을 때 어떻게 하시나요?',
    '크리스마스에 가장 받고 싶은 선물은 무엇인가요?',
  ]

  const bgColor: string[] = ['#DA3017', '#17914F', '#FFCC36']

  return (
    <div className={styles.toggleWrap}>
      <button className={styles.closeAll} onClick={handleAllToggle}>
        {isToggleListShow ? '전체 접기 ▲' : '전체 펼치기 ▼'}
      </button>
      <ul className={styles.toggleList}>
        {surveyData.length > 0 &&
          Object.entries(surveyData[0])
            .slice(2, 5)
            .map(([key, value], index) => {
              const data = {
                labels: Object.keys(value),
                datasets: [
                  {
                    label: key,
                    data: Object.values(value),
                    backgroundColor: bgColor[index],
                  },
                ],
              }

              return (
                <li
                  className={`${styles.toggleItem} ${
                    toggleIndex === index || isToggleListShow
                      ? styles.active
                      : ''
                  }`}
                  key={key}
                >
                  <button
                    onClick={() => handleToggle(index)}
                  >{`Q. ${questionList[index]}`}</button>
                  {(toggleIndex === index || isToggleListShow) && (
                    <div className={styles.toggleInner}>
                      <div>
                        <Bar options={options} data={data} height={110} />
                      </div>
                    </div>
                  )}
                </li>
              )
            })}
      </ul>
    </div>
  )
}

export default SurveyGraph
