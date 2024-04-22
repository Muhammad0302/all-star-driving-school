import React, { forwardRef } from 'react'

// eslint-disable-next-line react/display-name
const Print = forwardRef((_props: any, ref: any) => {
  return (
    <>
      <table ref={ref} className='w-full border-collapse'>
        <thead>
          <tr className='font-bold' style={{ backgroundColor: '#E5E7EB' }}>
            <th className='border py-2'>Serial No</th>
            <th className='border py-2'>Type</th>
            <th className='border py-2'>Issue Date</th>
            <th className='border py-2'>Cheque No</th>

            <th className='border py-2'>Rate</th>
            <th className='border py-2'>Tax</th>
            <th className='border py-2'>No of Lesson</th>
            <th className='border py-2'>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr className='font-medium' style={{ borderBottom: '1px solid #E5E7EB' }}>
            <td className='border py-2 text-center'>1</td>
            <td className='border py-2 text-center'>Cheque</td>
            <td className='border py-2 text-center'>3/4/2024</td>
            <td className='border py-2 text-center'>948473948</td>

            <td className='border py-2 text-center'>$50</td>
            <td className='border py-2 text-center'>24%</td>
            <td className='border py-2 text-center'>30</td>
            <td className='border py-2 text-center'>$400</td>
          </tr>
        </tbody>
      </table>
    </>
  )
})

export default Print
