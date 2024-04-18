'use client'

import StudentInstructor from '@/components/StudentInstructor'

export default function StudentInstructors({ params }: any) {
  return (
    <>
      <div className=' py-1 sm:py-12 h-screen'>
        <StudentInstructor params={params} />
      </div>
    </>
  )
}
