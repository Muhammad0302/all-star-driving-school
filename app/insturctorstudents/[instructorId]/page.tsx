'use client'

import InstructorStudent from '@/components/InstructorStudent'

export default function InsturctorStudents({ params }: any) {
  return (
    <>
      <div className=' py-1 sm:py-12 h-screen'>
        <InstructorStudent params={params} />
      </div>
    </>
  )
}
