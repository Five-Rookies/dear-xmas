import { useState, useEffect } from 'react'
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

const SurveyGraph = ({surveyData, questionList, labels}) => {
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

  // surveyData를 5개씩 끊어서 배열로 나누는 함수
  const chunkSurveyData = (arr, size) => {
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
  };

  // surveyData를 5개씩 끊어서 매핑하는 부분 수정
  const chunkedSurveyData = chunkSurveyData(Object.entries(surveyData), 5);
  

  return (
    <div className={styles.toggleWrap}>
      <button className={styles.closeAll} onClick={handleAllToggle}>
        {isToggleListShow ? '전체 접기 ▲' : '전체 펼치기 ▼'}
      </button>
      <ul className={styles.toggleList}>
        {Object.entries(chunkedSurveyData).map(([key, value], index) => {
              const data = {
                labels: labels[index],
                datasets: [
                  {
                    label: key,
                    data: Object.values(surveyData),
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
