import React, { useState } from 'react'
import Link from 'next/link'
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

import { IconListCheck, IconMail, IconUser } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { UserInfo } from '../../util/getUserInfo'

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null)
  const router = useRouter()
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget)
  }
  const handleClose2 = () => {
    setAnchorEl2(null)
  }
  const handleClickLogout = () => {
    localStorage.removeItem('userData')
    router.push('/signin')
  }
  const userInfo = UserInfo()
  return (
    <Box>
      <IconButton
        size='large'
        aria-label='show 11 new notifications'
        color='inherit'
        aria-controls='msgs-menu'
        aria-haspopup='true'
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar src='' style={{ cursor: 'pointer' }} />
      </IconButton>

      <Menu
        id='msgs-menu'
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '200px',
          },
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>{userInfo?.username}</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconMail width={20} />
          </ListItemIcon>
          <ListItemText>{userInfo?.email}</ListItemText>
        </MenuItem>

        <Box mt={1} py={1} px={2}>
          <Button
            href='/signin'
            variant='outlined'
            color='primary'
            onClick={handleClickLogout}
            fullWidth
            sx={{ color: '#f23d4d !important', borderColor: '#f23d4d !important' }}
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  )
}

export default Profile
