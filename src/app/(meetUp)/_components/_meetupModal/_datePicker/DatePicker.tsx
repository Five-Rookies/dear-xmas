'use client'

import DateTimePicker from 'react-datetime-picker'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'
import '@/app/datepicker.scss'
import { Value } from '@/type/Component'

type PickerProps = {
  meetupScheduling: Value
  onChangeValue: () => void
}

const DatePicker = ({ meetupScheduling, onChangeValue }: PickerProps) => {
  return (
    <div>
      <DateTimePicker onChange={onChangeValue} value={meetupScheduling} />
    </div>
  )
}

export default DatePicker
