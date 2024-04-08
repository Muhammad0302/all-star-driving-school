import React, { useState } from 'react'

import { AppBar, styled, Toolbar, Typography } from '@mui/material'
import Profile from './Profile'

const Navbar = () => {
  // const router = usePathname()
  const StyledToolbar = styled(Toolbar)({
    justifyContent: 'space-between',
    height: '88px',
  })

  return (
    <AppBar
      sx={{
        background: '#f23d4d',

        paddingLeft: { xs: '1px', sm: '55px' },
        paddingRight: { xs: '1px', md: '5px' },
      }}
      position={'fixed'}
    >
      <StyledToolbar>
        {/* <SocialBox>
          <Grid sx={{ marginTop: '5px' }}>
            <img alt='AddToCartBtn' className='w-[100px] h-[90px] ' src='./Images/lottery.png' />
          </Grid>
        </SocialBox> */}

        <div className='text-[#0f0f0fde] ml-[11.5rem] text-[20x] sm:text-[28px] md:text-[32px] lg:text-[24px] font-russoone font-normal'>
          Welcome to All Star Driving School
        </div>

        <Typography />

        <Profile />
      </StyledToolbar>
    </AppBar>
  )
}

export default Navbar
