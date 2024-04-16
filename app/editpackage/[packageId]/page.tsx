'use client'

import Editpackage from '@/components/editpackage'

export default function EditPackages({ params }: any) {
  return (
    <>
      <div className='py-1 mt-4 sm:py-12 h-screen'>
        <Editpackage params={params} />
      </div>
    </>
  )
}
