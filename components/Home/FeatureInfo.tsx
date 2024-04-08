import React, { useState, useEffect } from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { fetchDashboardData } from 'services/dashboard'
import './styles.css'
interface DashboardData {
  totalStudents: number
  totalInstructors: number
  totalRevenue: number
}
const FeatureInfo = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  useEffect(() => {
    fetchDashboardData()
      .then((data) => setDashboardData(data))
      .catch((error) => console.error('Error fetching dashboard data:', error.message))
  }, [])
  console.log('The dashboard data is:', dashboardData)
  return (
    <>
      <div className='featured'>
        <div className='featuredItem'>
          <div className='featuredMoneyContainer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='64px'
              height='64px'
              viewBox='0 0 256 256'
            >
              <path
                fill='#f23d4d'
                d='M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8M72 96a56 56 0 1 1 56 56a56.06 56.06 0 0 1-56-56'
              ></path>
            </svg>

            <div className='flex flex-col ml-[0.6rem]'>
              <span className='featuredCount'>{dashboardData?.totalInstructors}</span>
              <span className='featureSubTitle'>Total Instructors</span>
            </div>
          </div>
        </div>
        <div className='featuredItem'>
          <div className='featuredMoneyContainer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='64px'
              height='64px'
              viewBox='0 0 256 256'
            >
              <path
                fill='#f23d4d'
                d='M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8M72 96a56 56 0 1 1 56 56a56.06 56.06 0 0 1-56-56'
              ></path>
            </svg>

            <div className='flex flex-col ml-[0.6rem]'>
              <span className='featuredCount'>{dashboardData?.totalStudents}</span>
              <span className='featureSubTitle'>Total Students</span>
            </div>
          </div>
        </div>
        <div className='featuredItem'>
          <div className='featuredMoneyContainer'>
            <svg xmlns='http://www.w3.org/2000/svg' width='64px' height='64px' viewBox='0 0 56 56'>
              <path
                fill='#f23d4d'
                d='M28 4c13.255 0 24 10.745 24 24S41.255 52 28 52S4 41.255 4 28S14.745 4 28 4m0 4C16.954 8 8 16.954 8 28s8.954 20 20 20s20-8.954 20-20S39.046 8 28 8m.573 6.286v2.687c3.976.319 6.855 2.704 6.982 6.314h-3.308c-.207-2.004-1.638-3.165-3.674-3.419V26.5l.764.19c4.183.971 6.473 2.689 6.473 6.076c0 3.897-3.181 6.107-7.237 6.394v2.671h-1.797V39.16c-4.04-.303-7.236-2.577-7.347-6.394h3.292c.286 1.861 1.495 3.229 4.055 3.5V29.33l-.652-.16c-4.04-.937-6.218-2.75-6.218-5.979c0-3.563 2.862-5.916 6.87-6.219v-2.687zm0 15.458v6.537c2.72-.207 3.865-1.495 3.865-3.197c0-1.638-.89-2.608-3.865-3.34m-1.797-9.876c-2.29.286-3.499 1.606-3.499 3.054c0 1.447.955 2.512 3.5 3.149z'
              ></path>
            </svg>

            <div className='flex flex-col ml-[0.6rem]'>
              <span className='featuredCount'>{dashboardData?.totalRevenue}</span>
              <span className='featureSubTitle'>Instructor Payouts Total</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FeatureInfo
