/* eslint-disable react/display-name */
import { Typography } from '@mui/material'
import React, { forwardRef, useState, useEffect } from 'react'
import './styles.css'

const Print5 = forwardRef(({ data }: any, ref) => {
  const [currentDate, setCurrentDate] = useState('')
  let serialNumber = 1
  console.log('The instructor data in the print', data)
  useEffect(() => {
    const date = new Date()
    setCurrentDate(date.toLocaleDateString())
  }, [])
  return (
    // @ts-ignore
    <div className='print-source print-content' ref={ref}>
      <div className='m-[20px]'>
        <div className='flex justify-center items-center mt-2'>
          <img src='Images/logo.jpg' className=' w-[9rem]' />
        </div>
        <div className='flex justify-center items-center mt-1'>
          <Typography style={{ fontWeight: '600', fontSize: '15px' }}>
            All Star Driving School
          </Typography>
        </div>
        <div className='flex justify-center items-center mt-1'>
          <Typography style={{ fontSize: '14px', marginBottom: '26px' }}>
            10815 Yonge St. Unit 6 Richmond Hill ON L4C 3E3
          </Typography>
        </div>

        <table className='w-full border-collapse'>
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
            {data?.InstructorPayment?.map((payment: any) => {
              const date = new Date(payment?.issueDate)
              const formattedDate = date.toLocaleDateString('en-GB')
              return (
                <>
                  <tr className='font-medium' style={{ borderBottom: '1px solid #E5E7EB' }}>
                    <td className='border py-2 text-center'>{serialNumber++}</td>
                    <td className='border py-2 text-center'>Cheque</td>
                    <td className='border py-2 text-center'>{formattedDate}</td>
                    <td className='border py-2 text-center'>{payment?.chaqueNo}</td>

                    <td className='border py-2 text-center'>${payment?.rate}</td>
                    <td className='border py-2 text-center'>{payment?.tax}</td>
                    <td className='border py-2 text-center'>{payment?.noOfLessonToPay}</td>
                    <td className='border py-2 text-center'>${payment?.compensation}</td>
                  </tr>
                </>
              )
            })}
          </tbody>
        </table>
        <div className='flex justify-end mt-4'>
          <Typography style={{ fontWeight: 'bold' }}> Total: ${data?.totalCompensation}</Typography>
        </div>
        <div className='flex justify-end mt-1'>
          <Typography>Date: {currentDate}</Typography>
        </div>
      </div>
    </div>
  )
})

export default Print5
