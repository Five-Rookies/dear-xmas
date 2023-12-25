import { useState } from 'react'
import styles from '@/app/page.module.scss'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip)

interface IData {
  labels: string[]
  datasets: [
    {
      data: object
      backgroundColor: string
    },
  ]
}

interface ICheckList {
  title: string
  key: string
}

interface ISurvey {
  question: string
  checkList: ICheckList[]
}

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

const SurveyGraph = ({
  surveyData,
  surveyList,
}: {
  surveyData: object
  surveyList: ISurvey[]
}) => {
  const [isToggleListShow, setToggleListShow] = useState(false)
  const [toggleIndex, setToggleIndex] = useState<number>(0)

  const handleToggle = (index: number): void => {
    setToggleIndex(index === toggleIndex ? -1 : index)
  }

  const handleAllToggle = (): void => {
    setToggleListShow(!isToggleListShow)
    setToggleIndex(-1)
  }

  const bgColor: string[] = ['#DA3017', '#17914F', '#FFCC36']

  return (
    <div className={styles.toggleWrap}>
      <button className={styles.closeAll} onClick={handleAllToggle}>
        {isToggleListShow ? '전체 접기 ▲' : '전체 펼치기 ▼'}
      </button>
      <ul className={styles.toggleList}>
        {surveyList.map((survey: ISurvey, index: number) => {
          const data: IData = {
            labels: [],
            datasets: [
              {
                data: Object.values(surveyData),
                backgroundColor: bgColor[index],
              },
            ],
          }

          survey.checkList.map((check: ICheckList) => {
            data.labels.push(check.title)
          })

          return (
            <li
              className={`${styles.toggleItem} ${
                toggleIndex === index || isToggleListShow ? styles.active : ''
              }`}
              key={index}
            >
              <button
                onClick={() => handleToggle(index)}
              >{`Q. ${survey.question}`}</button>
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
