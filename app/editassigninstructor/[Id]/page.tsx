'use client'

import EditAssignInstructor from '@/components/EditAssignInstructor'

export default function Editassigninstructors({ params }: any) {
  return (
    <>
      <div className='py-1 mt-4 sm:py-12 h-screen'>
        <EditAssignInstructor params={params} />
      </div>
    </>
  )
}
