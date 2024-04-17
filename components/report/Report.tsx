import { TextField, Box } from '@mui/material'
import React, { useState } from 'react'
import MUIDataTable from 'mui-datatables'
import { Button } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import HistoryIcon from '@mui/icons-material/History'
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined'
import PaymentHistory from './PaymentHistory'
import { MUIDataTableOptions } from 'mui-datatables'
import { useRouter } from 'next/navigation'
import './styles.css'
const Report = () => {
  const [openModal, setOpenModal] = useState(false)
  const handleOpen = () => setOpenModal(true)
  const handleCloseFunc = () => setOpenModal(false)
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState(null)
  const [openModalPmntHstry, setOpenModalPmntHstry] = useState(false)
  const handleCloseFuncPmntHstry = () => setOpenModalPmntHstry(false)
  const handleOpenPmntHstry = () => setOpenModalPmntHstry(true)
  const open = Boolean(anchorEl)
  const [activeRow, setActiveRow] = useState(null)
  const handleClick = (event: any, index: any) => {
    setAnchorEl(event.currentTarget)
    setActiveRow(index)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleAddInstructor = () => {
    router.push('/addinstructor')
  }
  const data = [
    ['John Doe', '123-456-7890', 'Modi similique eum a', '19', '$926.25'],
    ['Jane Smith', '987-654-3210', 'Modi similique eum a', '19', '$926.25'],
    ['Alice Johnson', '555-123-4567', 'Modi similique eum a', '19', '$926.25'],
    ['Bob Williams', '111-222-3333', 'Modi similique eum a', '19', '$926.25'],
    ['Emily Davis', '444-555-6666', 'Modi similique eum a', '19', '$926.25'],
    ['Michael Brown', '777-888-9999', 'Modi similique eum a', '19', '$926.25'],
    ['Olivia Miller', '333-999-1111', 'Modi similique eum a', '19', '$926.25'],
    ['Daniel Wilson', '666-444-2222', 'Modi similique eum a', '19', '$926.25'],
    ['Sophia Taylor', '222-777-5555', 'Modi similique eum a', '19', '$926.25'],
    ['Ethan Martinez', '999-111-3333', 'Modi similique eum a', '19', '$926.25'],
    ['Ava Anderson', '111-222-3333', 'Modi similique eum a', '19', '$926.25'],
    ['Mason Garcia', '555-123-4567', 'Modi similique eum a', '19', '$926.25'],
    ['Emma Jones', '777-888-9999', 'Modi similique eum a', '19', '$926.25'],
    ['Logan White', '444-555-6666', 'Modi similique eum a', '19', '$926.25'],
    ['Chloe Harris', '333-999-1111', 'Modi similique eum a', '19', '$926.25'],
    ['Liam Turner', '666-444-2222', 'Modi similique eum a', '19', '$926.25'],
    ['Aria Garcia', '222-777-5555', 'Modi similique eum a', '19', '$926.25'],
    ['Noah Miller', '999-111-3333', 'Modi similique eum a', '19', '$926.25'],
    ['Grace Robinson', '111-222-3333', 'Modi similique eum a', '19', '$926.25'],
    ['Elijah Clark', '555-123-4567', 'Modi similique eum a', '19', '$926.25'],
  ]

  const columns = [
    {
      name: 'Name',
      label: 'Name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'Phone',
      label: 'Phone Number',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'address',
      label: 'Address',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'noOfLessons',
      label: 'No of Lessons',
      options: {
        filter: true,
        sort: false,
      },
    },
    // {
    //   name: 'Rate',
    //   label: 'Rate',
    //   options: {
    //     filter: true,
    //     sort: false,
    //   },
    // },
    // {
    //   name: 'Tax',
    //   label: 'Tax',
    //   options: {
    //     filter: true,
    //     sort: false,
    //   },
    // },
    {
      name: 'Total Compensation',
      label: 'Total Compensation',
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
                  <MenuItem
                    onClick={() => {
                      handleOpenPmntHstry()
                      handleClose()
                    }}
                  >
                    <HistoryIcon /> Payment History
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

  const options: MUIDataTableOptions = {
    filterType: 'checkbox',
    selectableRows: 'none',
    // headCells: {
    //   style: {
    //     fontWeight: 'bold !important',
    //     color: 'black !important',
    //   },
    // },
    print: false,
    filter: false,
  }

  return (
    <>
      {' '}
      <Box sx={{ padding: '24px' }}>
        <div className='mt-10 mb-[1rem] text-[20x] sm:text-[19px] md:text-[23px] lg:text-[26px] text-center font-russoone font-normal'>
          Instructors Payment list
        </div>
        <MUIDataTable title={''} data={data} columns={columns} options={options} />
        <PaymentHistory open={openModalPmntHstry} handleClose={handleCloseFuncPmntHstry} />
      </Box>
    </>
  )
}

export default Report
