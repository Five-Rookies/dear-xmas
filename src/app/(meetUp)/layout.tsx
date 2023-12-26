'use server'

import React from 'react'

type Props = { children: React.ReactNode; createMeetupModal: React.ReactNode }

const layout = ({ children, createMeetupModal }: Props): React.JSX.Element => {
  return (
    <div>
      {children}
      {createMeetupModal}
    </div>
  )
}

export default layout
