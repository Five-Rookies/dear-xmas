'use client'

import { ChangeEvent, ChangeEventHandler, useState } from 'react'
import DateTimePicker from 'react-datetime-picker'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'
import '@/app/datepicker.scss'

const DatePicker = ({ meetupScheduling, onChangeValue }: any) => {
  return (
    <div>
      <DateTimePicker onChange={onChangeValue} value={meetupScheduling} />
    </div>
  )
}

export default DatePicker
