'use client'

import { useState, CSSProperties, useEffect } from 'react'
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
import { faker } from '@faker-js/faker'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
)

export const options: chartOptions<"bar"> = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 0,
    },
  },
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false, // Hide grid lines for x-axis as well
      },
    },
    y: {
      ticks: {
        font: {
          size: 20, // Set the desired font size for y-axis labels
          family: "'pretendard', sans-serif"
        },
      },
      grid: {
        display: false, 
      },
    },
  },
  datasets: {
    bar: {
      barThickness: 40, // Set the desired thickness for the bars
      barPercentage: 0.5,
    },
  },
};


const SurveyGraph = () => {
  const [surveyData, setSurveyData] = useState([])
  const [isToggleListShow, setToggleListShow] = useState(true)

  const toggleToggleList = () => {
    setToggleListShow(!isToggleListShow)
  }

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const data = await getSurveyResult()
        setSurveyData(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchSurveyData()
  }, [])

  

  const survey2 = [
    {
      "id": 2,
      "created_at": "2023-12-10T08:42:34.67389+00:00",
      "first_baby": 8,
      "first_child": 12,
      "first_teenager": 2,
      "first_adult": 0,
      "first_stillTrust": 4,
      "second_pretend": 20,
      "second_pokerFace": 4,
      "second_honest": 1,
      "second_throwAway": 1,
      "second_sell": 1,
      "third_money": 12,
      "third_electronics": 9,
      "third_clothes": 2,
      "third_travelTicket": 3,
      "third_none": 0
    },
    {
      "id": 3,
      "created_at": "2023-12-10T08:42:34.67389+00:00",
      "first_baby": 8,
      "first_child": 12,
      "first_teenager": 2,
      "first_adult": 0,
      "first_stillTrust": 4,
      "second_pretend": 20,
      "second_pokerFace": 4,
      "second_honest": 1,
      "second_throwAway": 1,
      "second_sell": 1,
      "third_money": 12,
      "third_electronics": 9,
      "third_clothes": 2,
      "third_travelTicket": 3,
      "third_none": 0
    }
  ]

  
  

  
 
  const survey = getSurveyResult()
  console.log(Object.keys(survey))

  const labels = Object.keys(survey2[0])
  //console.log(labels)

  // const object1 = {
  //   a: 'somestring',
  //   b: 42,
  //   c: false,
  // };
  
  // console.log(Object.keys(object1));
  
  const data: chartData<"bar"> = {
    labels,
    datasets: [
      {
        labels,
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
        backgroundColor: 'rgb(218, 48, 23)',
      },
    ],
  };
  
  // export const style: CSSProperties = {
  //   width: "40rem",
  //   height: "30rem",
  // };

  return (
    <div className={styles.toggleWrap}>
      <ul
        className={`${styles.toggleList} ${
          isToggleListShow ? '' : styles.hidden
        }`}
      >
        <li className={styles.toggleItem}>
          <button>Q. 여러분은 산타를 몇살까지 믿었나요?</button>
          <div className={styles.toggleInner}>
            <div>
              {/* <div className={styles.graph}></div> */}
              <Bar 
                options={options}
                data={data}
                // style={style}
              />
            </div>
          </div>
        </li>
        <li className={styles.toggleItem}>
          <button>
            Q. 마음에 들지 않은 선물을 받았을 때 어떻게 하시나요?
          </button>
          <div></div>
        </li>
        <li className={styles.toggleItem}>
          <button>Q. 크리스마스에 가장 받고 싶은 선물은 무엇인가요?</button>
          <div></div>
        </li>
      </ul>
    </div>
  );
};

export default SurveyGraph;