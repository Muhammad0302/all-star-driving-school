import React from 'react'
import Link from 'next/link'
import { Typography, TextField, IconButton, InputAdornment, Button, Grid, Box } from '@mui/material'
const Home = () => {
  return (
    <>
      <Box>
        {/* <div className='hidden sm:flex justify-between items-center mx-16 lg:mx-24 '>
          <div className='flex gap-1'>
            <Link
              href={'/'}
              className='no-underline text-[14px] text-[#FF6A47] font-poppins font-[400] pt-[15px]'
            >
              Home
            </Link>
          </div>
        </div> */}

        <div className='mt-12 text-[28px] sm:text-[28px] md:text-[48px] lg:text-[60px] text-center font-russoone font-normal'>
          Analytics of Books
        </div>
      </Box>
    </>
  )
}

export default Home
