'use client'

import { ChangeEvent, ChangeEventHandler, useState } from 'react'
import DateTimePicker from 'react-datetime-picker'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'
import '@/app/datepicker.scss'

type ValuePiece = Date | null

type Value = ValuePiece | [ValuePiece, ValuePiece]

function DatePicker() {
  const [value, setValue] = useState<Value>(new Date())

  const onChangeValue = (event: ValuePiece) => {
    setValue(event)
    console.log(value)
  }
  return (
    <div>
      <DateTimePicker onChange={onChangeValue} value={value} />
    </div>
  )
}

export default DatePicker
