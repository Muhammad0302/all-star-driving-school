'use client'

import ChangeInstructor from '@/components/ChangeInstructor'

export default function ChangeInstructors({ params }: any) {
  return (
    <>
      <div className='py-1 mt-4 sm:py-12 h-screen'>
        <ChangeInstructor params={params} />
      </div>
    </>
  )
}
