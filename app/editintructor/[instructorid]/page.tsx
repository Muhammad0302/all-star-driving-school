'use client'

import EditInstructor from '@/components/EditInstructor '

export default function AddInstructors({ params }: any) {
  return (
    <>
      <div className='py-1 mt-4 sm:py-12 h-screen'>
        <EditInstructor params={params} />
      </div>
    </>
  )
}
