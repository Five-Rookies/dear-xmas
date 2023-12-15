import React from 'react'
import MeetupModal from './_components/_meetupModal/MeetupModal'

interface IParams {
  id: string
}

interface ISearchParams {
  thumbnailUrl: string
}

interface IProps {
  params: IParams
  searchParams: ISearchParams
}

const page = (props: IProps): React.ReactNode => {
  const currentVideoId: string = props.params.id

  return <MeetupModal currentVideoId={currentVideoId} />
}

export default page
