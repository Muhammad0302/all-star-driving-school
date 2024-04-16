import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import AppBar from '@mui/material/AppBar'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import PaymentIcon from '@mui/icons-material/Payment'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import AssignmentIcon from '@mui/icons-material/Assignment'
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck'
import Groups2Icon from '@mui/icons-material/Groups2'
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList'
import InventoryIcon from '@mui/icons-material/Inventory'
import Link from 'next/link'
import ReportIcon from '@mui/icons-material/Report'
import './styles.css'
import { useRouter } from 'next/navigation'
const drawerWidth = 240

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('')

  const router = useRouter()
  const handleSiderNavigation = (itemText: string) => {
    setActiveTab(itemText)
  }
  console.log('the tab value is:', activeTab)
  return (
    <>
      <Drawer
        variant='permanent'
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          Top: '100px',
          //   zIndex: 2,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        {/* <Toolbar /> */}
        <div className='flex justify-center items-center mt-2'>
          <img src='Images/logo.jpg' className=' w-[11rem]' />
        </div>
        <Box sx={{ overflow: 'auto', marginTop: '2rem' }}>
          <List>
            <Link href='/' style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem
                key='Dashboard'
                disablePadding
                sx={{ backgroundColor: activeTab === 'Dashboard' ? '#f23d4d' : '' }}
              >
                <ListItemButton onClick={() => handleSiderNavigation('Dashboard')}>
                  <ListItemIcon>
                    <DashboardIcon />{' '}
                  </ListItemIcon>
                  <ListItemText primary='Dashboard' />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link href='/instructors' style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem
                key='Instructors'
                disablePadding
                sx={{ backgroundColor: activeTab === 'instructors' ? '#f23d4d' : '' }}
              >
                <ListItemButton onClick={() => handleSiderNavigation('instructors')}>
                  <ListItemIcon>
                    <PeopleAltIcon />{' '}
                  </ListItemIcon>
                  <ListItemText primary='Instructors' />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link href='/students' style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem
                key='Students'
                disablePadding
                sx={{ backgroundColor: activeTab === 'students' ? '#f23d4d' : '' }}
              >
                <ListItemButton onClick={() => handleSiderNavigation('students')}>
                  <ListItemIcon>
                    <PeopleAltIcon />{' '}
                  </ListItemIcon>
                  <ListItemText primary='Students' />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link href='/stdsasigndtoinstrs' style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem
                key='assignpackage'
                disablePadding
                sx={{ backgroundColor: activeTab === 'assignpackage' ? '#f23d4d' : '' }}
              >
                <ListItemButton onClick={() => handleSiderNavigation('assignpackage')}>
                  <ListItemIcon>
                    <AssignmentIcon />{' '}
                  </ListItemIcon>
                  <ListItemText primary='Assign Package' />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link
              href='/stdsintrslssncompleted'
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItem
                key='stdsintrslssncompleted'
                disablePadding
                sx={{ backgroundColor: activeTab === 'stdsintrslssncompleted' ? '#f23d4d' : '' }}
              >
                <ListItemButton onClick={() => handleSiderNavigation('stdsintrslssncompleted')}>
                  <ListItemIcon>
                    <LibraryAddCheckIcon />{' '}
                  </ListItemIcon>
                  <ListItemText primary='Students/Instructors Lessons Completed' />
                </ListItemButton>
              </ListItem>
            </Link>
            {/* <Link href='/pvtlssnasgndtoinstrs' style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem
                key='pvtlssnasgndtoinstrs'
                disablePadding
                sx={{ backgroundColor: activeTab === 'pvtlssnasgndtoinstrs' ? '#f23d4d' : '' }}
              >
                <ListItemButton onClick={() => handleSiderNavigation('pvtlssnasgndtoinstrs')}>
                  <ListItemIcon>
                    <AssignmentIcon />{' '}
                  </ListItemIcon>
                  <ListItemText primary='Private Lessons Assigned to Instrs' />
                </ListItemButton>
              </ListItem>
            </Link> */}
            <Link href='/payments' style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem
                key='payments'
                disablePadding
                sx={{ backgroundColor: activeTab === 'payments' ? '#f23d4d' : '' }}
              >
                <ListItemButton onClick={() => handleSiderNavigation('payments')}>
                  <ListItemIcon>
                    <PaymentIcon />{' '}
                  </ListItemIcon>
                  <ListItemText primary='Students Payment' />
                </ListItemButton>
              </ListItem>
            </Link>
            {/* <Link href='/report' style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem
                key='report'
                disablePadding
                sx={{ backgroundColor: activeTab === 'report' ? '#f23d4d' : '' }}
              >
                <ListItemButton onClick={() => handleSiderNavigation('report')}>
                  <ListItemIcon>
                    <PaymentIcon />{' '}
                  </ListItemIcon>
                  <ListItemText primary='Instructors Payment' />
                </ListItemButton>
              </ListItem>
            </Link> */}
            <Link href='/packages' style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem
                key='Packages'
                disablePadding
                sx={{ backgroundColor: activeTab === 'Packages' ? '#f23d4d' : '' }}
              >
                <ListItemButton onClick={() => handleSiderNavigation('Packages')}>
                  <ListItemIcon>
                    <InventoryIcon />{' '}
                  </ListItemIcon>
                  <ListItemText primary='Packages' />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </Box>
      </Drawer>
    </>
  )
}

export default Sidebar
