import { TextField, Box } from '@mui/material'
import React, { useState } from 'react'
import MUIDataTable from 'mui-datatables'
import { Button } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { useRouter } from 'next/navigation'
import './styles.css'
const StdsAsigndToInstrs = () => {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState(null)

  const open = Boolean(anchorEl)
  const [activeRow, setActiveRow] = useState(null)
  const handleClick = (event: any, index: any) => {
    setAnchorEl(event.currentTarget)
    setActiveRow(index)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleAssignInstructor = () => {
    router.push('/assigninstructor')
  }
  const data = [
    ['John Doe', 'E24/12/1', 'Emma Watson'],
    ['Jane Smith', 'E24/12/2', 'Ian Johnson'],
    ['Alice Brown', 'E24/12/3', 'Elijah Taylor'],
    ['Bob Johnson', 'E24/12/4', 'Isabel Turner'],
    ['Charlie Davis', 'E24/12/5', 'Eva Clark'],
    ['Eva Thomas', 'E24/12/6', 'Frank Miller'],
    ['Frank Miller', 'E24/12/7', 'Grace Wilson'],
    ['Grace Wilson', 'E24/12/8', 'Harry Lee'],
    ['Harry Lee', 'E24/12/9', 'Ivy Turner'],
    ['Ivy Turner', 'E24/12/10', 'Jack Evans'],
    ['Jack Evans', 'E24/12/11', 'Katherine Hall'],
    ['Katherine Hall', 'E24/12/12', 'Liam Brooks'],
    ['Liam Brooks', 'E24/12/13', 'Mia Taylor'],
    ['Mia Taylor', 'E24/12/14', 'Noah Adams'],
    ['Noah Adams', 'E24/12/15', 'Olivia Clark'],
    ['Olivia Clark', 'E24/12/16', 'Peter Brown'],
    ['Peter Brown', 'E24/12/17', 'Quinn Evans'],
    ['Quinn Evans', 'E24/12/18', 'Rachel Turner'],
    ['Rachel Turner', 'E24/12/19', 'Samuel Lee'],
    ['Samuel Lee', 'E24/12/20', 'Sophia Smith'],
  ]

  const columns = [
    {
      name: 'InstructorName',
      label: 'Instructor Name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'StudentID',
      label: 'Student ID',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'StudentName',
      label: 'Student Name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'nooflesson',
      label: 'No Of Lesson',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'totalPrice',
      label: 'Total Price',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'advancePayment',
      label: 'Advance Payment',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'remainingprice',
      label: 'Remaining Price',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'paymentplan',
      label: 'Payment Plan',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'Actions',
      options: {
        sort: false,
        filter: false,
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
          return (
            <>
              <Button
                style={{ paddingTop: '0px', paddingBottom: '0px' }}
                type='button'
                onClick={(e) => handleClick(e, tableMeta.rowIndex)}
              >
                <MoreVertIcon sx={{ color: '#f23d4d' }} />
              </Button>
              {activeRow === tableMeta.rowIndex ? (
                <Menu
                  id='basic-menu'
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={handleAssignInstructor}>
                    <ModeEditOutlineOutlinedIcon /> Edit
                  </MenuItem>
                  <MenuItem
                  // onClick={() => handleDelete(tableMeta.rowData[0])}
                  >
                    <DeleteOutlineOutlinedIcon /> Delete
                  </MenuItem>
                </Menu>
              ) : (
                ''
              )}
            </>
          )
        },
      },
    },
  ]

  const HeaderElements = () => {
    return (
      <Button type='button' sx={{ color: '#f23d4d' }} onClick={handleAssignInstructor}>
        + Assign Package
      </Button>
    )
  }

  const options = {
    filterType: 'checkbox' as const,
    customToolbar: HeaderElements,
    headCells: {
      style: {
        fontWeight: 'bold !important',
        color: 'black !important',
      },
    },
    print: false,
    filter: false,
  }
  return (
    <>
      <Box sx={{ padding: '24px' }}>
        <div className='mt-10 mb-[1rem] text-[20x] sm:text-[19px] md:text-[23px] lg:text-[26px] text-center font-russoone font-normal'>
          Students Assigned to Instructors List
        </div>
        <MUIDataTable title={''} data={data} columns={columns} options={options} />
      </Box>
    </>
  )
}

export default StdsAsigndToInstrs
