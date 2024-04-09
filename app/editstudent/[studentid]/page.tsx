'use client'

import EditStudent from '@/components/EditStudent'

export default function AddStudents({ params }: any) {
  return (
    <>
      <div className=' py-1 mt-4 sm:py-12 h-screen'>
        <EditStudent params={params} />
      </div>
    </>
  )
}
