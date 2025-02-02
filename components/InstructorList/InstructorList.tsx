import { TextField, Box } from '@mui/material'
import React, { useState } from 'react'
import MUIDataTable from 'mui-datatables'
import { Button } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getAllSoftInstructors, deletInstructor, getRate } from 'services/room'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import './styles.css'
import PayModal from './PayModal'
interface Rate {
  _id: string
}
const InstructorList = () => {
  const [counter, setCounter] = useState(0)
  const [instructorStatus, setInstructorStatus] = useState('false')
  const [selectedIds, setSelectedIds] = useState<string[][]>([])
  const [rate, setRate] = useState<Rate | null>(null)
  const [openModal, setOpenModal] = useState(false)
  const [instructorData, setInstructorData] = useState([])
  const [selectedRowData, setSelectedRowData] = useState(null)
  const handleOpen = () => setOpenModal(true)
  const handleCloseFunc = () => setOpenModal(false)
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const [activeRow, setActiveRow] = useState(null)
  const handleClick = (event: any, index: any) => {
    setAnchorEl(event.currentTarget)
    setActiveRow(index)
  }

  const fetchRoomsData = async () => {
    try {
      let isDeleted
      if (instructorStatus === 'false') {
        isDeleted = false
      } else if (instructorStatus === 'true') {
        isDeleted = true
      } else {
        // @ts-ignore
        isDeleted = 'NA'
      }

      const response = await getAllSoftInstructors(isDeleted)
      console.log('The response of get all instructor is', response)
      const instructors: any = response.instructors
      const AllInstructors: any = instructors.map((instructor: any) => {
        console.log('The deleted value is:', instructor?.isDeleted)
        return {
          ID: instructor?._id,
          no_of_lesson: instructor?.no_of_lesson,
          Name: `${instructor?.firstName} ${instructor?.lastName}`,
          Phone: instructor?.phone_number,
          Email: instructor?.email,
          Address: instructor?.address,
          // hire_as: instructor?.hired_as,
          DriverLicense: instructor?.driver_licence_number,
          DILicense: instructor?.DI_number,
          Status: instructor?.isDeleted ? (
            <div style={{ color: 'red' }}>Deleted</div>
          ) : (
            <div style={{ color: 'green' }}>Active</div>
          ),
        }
      })
      setInstructorData(AllInstructors)
    } catch (error: any) {
      console.error('Error fetching instructor data:', error.message)
    }
  }

  useEffect(() => {
    const fetchRateData = async () => {
      try {
        const res = await getRate()
        console.log('The rate is:', res)
        const rate = res.Rate[0]
        setRate(rate)
        // formik.setFieldValue('priceperlesson', rate.price_per_lesson)
        // formik.setFieldValue('tax', rate.tax)
      } catch (error) {
        console.error('Error fetching students data:', error)
      }
    }
    fetchRateData()
  }, [])
  useEffect(() => {
    fetchRoomsData()
  }, [counter, instructorStatus])

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleEditInstructor = (data: any) => {
    router.push(`/editintructor/${data[0]}`)
  }

  const handleDelete = async (data: any) => {
    handleClose()
    console.log('The data is:', data)
    try {
      const res = await deletInstructor(data[0])
      console.log('Delete api response', res)
      toast.success('Instructor deleted Successfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      })
      setCounter(counter + 1)
    } catch (error: any) {
      toast.error('Error while deleting instructor', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      })
    }
  }

  const handleViewStudent = (data: any) => {
    handleClose()
    router.push(`/insturctorstudents/${data[0]}`)
  }

  const handlePay = (data: any) => {
    handleOpen()
    handleClose()
    setSelectedRowData(data)
  }

  const data = [
    [1, 'John Doe', '123-456-7890', 'G7231-45532-25122', 'DI-67890'],
    [2, 'Jane Smith', '987-654-3210', 'G7231-45532-25122', 'DI-09876'],
    [3, 'Alice Johnson', '555-123-4567', 'G7231-45532-25122', 'DI-23456'],
    [4, 'Bob Williams', '111-222-3333', 'G7231-45532-25122', 'DI-87654'],
    [5, 'Emily Davis', '444-555-6666', 'G7231-45532-25122', 'DI-56789'],
    [6, 'Michael Brown', '777-888-9999', 'G7231-45532-25122', 'DI-24680'],
    [7, 'Olivia Miller', '333-999-1111', 'G7231-45532-25122', 'DI-13579'],
    [8, 'Daniel Wilson', '666-444-2222', 'G7231-45532-25122', 'DI-97531'],
    [9, 'Sophia Taylor', '222-777-5555', 'G7231-45532-25122', 'DI-43210'],
    [10, 'Ethan Martinez', '999-111-3333', 'G7231-45532-25122', 'DI-67890'],
    [11, 'Ava Anderson', '111-222-3333', 'G7231-45532-25122', 'DI-09876'],
    [12, 'Mason Garcia', '555-123-4567', 'G7231-45532-25122', 'DI-23456'],
    [13, 'Emma Jones', '777-888-9999', 'G7231-45532-25122', 'DI-87654'],
    [14, 'Logan White', '444-555-6666', 'G7231-45532-25122', 'DI-56789'],
    [15, 'Chloe Harris', '333-999-1111', 'G7231-45532-25122', 'DI-13579'],
    [16, 'Liam Turner', '666-444-2222', 'G7231-45532-25122', 'DI-97531'],
    [17, 'Aria Garcia', '222-777-5555', 'G7231-45532-25122', 'DI-43210'],
    [18, 'Noah Miller', '999-111-3333', 'G7231-45532-25122', 'DI-67890'],
    [19, 'Grace Robinson', '111-222-3333', 'G7231-45532-25122', 'DI-09876'],
    [20, 'Elijah Clark', '555-123-4567', 'G7231-45532-25122', 'DI-23456'],
  ]

  const handleRowSelection = (currentRowsSelected: any, allRowsSelected: { index: number }[]) => {
    const selectedIds = allRowsSelected.map((row: any) => [
      // @ts-ignore
      instructorData[row.index]?.ID,
      // @ts-ignore
      instructorData[row.index]?.Name,
    ])
    setSelectedIds(selectedIds)
  }

  console.log('The selected ID is:', selectedIds)

  const handleMultiple = async () => {
    console.log('The delete button get called')
    try {
      const res = await Promise.all(selectedIds.map((id) => deletInstructor(id[0])))
      console.log('Delete API responses:', res)
      toast.success('Students deleted successfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      })
      setCounter(counter + 1)
    } catch (error) {
      toast.error('Error while deleting students', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      })
    }
  }

  const columns = [
    {
      name: 'ID',
      label: 'ID',
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
    {
      name: 'no_of_lesson',
      label: 'no_of_lesson',
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
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
      name: 'Email',
      label: 'Email',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'Address',
      label: 'Address',
      options: {
        filter: true,
        sort: false,
      },
    },

    // {
    //   name: 'hire_as',
    //   label: 'Hire as',
    //   options: {
    //     filter: true,
    //     sort: false,
    //   },
    // },
    {
      name: 'DriverLicense',
      label: 'Driver License No',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'DILicense',
      label: 'DI License No',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'Status',
      label: 'Status',
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
                  {/* insturctorstudents */}
                  <MenuItem onClick={() => handleEditInstructor(tableMeta.rowData)}>
                    <ModeEditOutlineOutlinedIcon /> Edit
                  </MenuItem>
                  <MenuItem onClick={() => handleDelete(tableMeta.rowData)}>
                    <DeleteOutlineOutlinedIcon /> Delete
                  </MenuItem>
                  <MenuItem onClick={() => handleViewStudent(tableMeta.rowData)}>
                    <PeopleAltIcon /> View students
                  </MenuItem>
                  <MenuItem onClick={() => handlePay(tableMeta.rowData)}>
                    <PaymentsOutlinedIcon sx={{ marginRight: '2px' }} /> Pay
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
      <Link href='/addinstructor' style={{ textDecoration: 'none', color: 'inherit' }}>
        <Button type='button' sx={{ color: '#f23d4d' }}>
          + Add Instructor
        </Button>
      </Link>
    )
  }
  const PricePerLessonAndTax = () => {
    return (
      <Link href='/changetaxandpriceoflesson' style={{ textDecoration: 'none', color: 'inherit' }}>
        <Button type='button' sx={{ color: '#f23d4d' }}>
          Change Tax & Price per lesson
        </Button>
      </Link>
    )
  }
  const handleInstructorStatus = (event: any) => {
    setInstructorStatus(event.target.value)
  }
  console.log('The instructor status is:', instructorStatus)
  const FilterElements = () => {
    return (
      <React.Fragment>
        <div
          style={{
            display: 'flex',
            justifyContent: 'left',
            marginRight: '148px',
          }}
        >
          <FormControl sx={{ m: 1, width: '218px' }} size='small'>
            <InputLabel id='demo-select-small'>Filter Instructors</InputLabel>
            <Select
              labelId='demo-select-small'
              id='demo-select-small'
              value={instructorStatus}
              label='Select Student Status'
              onChange={handleInstructorStatus}
              MenuProps={{ PaperProps: { style: { maxHeight: '400px' } } }}
            >
              <MenuItem value={'NA'}>All instructors</MenuItem>
              <MenuItem value={'false'}>Active Instructors</MenuItem>
              <MenuItem value={'true'}>Deleted Instructors</MenuItem>
            </Select>
          </FormControl>
        </div>
      </React.Fragment>
    )
  }

  const options = {
    filterType: 'checkbox' as const,
    headCells: {
      style: {
        fontWeight: 'bold !important',
        color: 'black !important',
      },
    },
    print: false,
    filter: false,
    customToolbar: () => {
      return (
        <React.Fragment>
          <HeaderElements />
          <PricePerLessonAndTax />
          <FilterElements />
        </React.Fragment>
      )
    },
    onRowsSelect: handleRowSelection,
    onRowsDelete: () => {
      handleMultiple()
    },
  }

  return (
    <>
      {' '}
      <Box sx={{ padding: '24px' }}>
        <div className='mt-10 mb-[1rem] text-[20x] sm:text-[19px] md:text-[23px] lg:text-[26px] text-center font-russoone font-normal'>
          Instructors list
        </div>
        <MUIDataTable title={''} data={instructorData} columns={columns} options={options} />
        <PayModal
          rate={rate}
          rowData={selectedRowData}
          open={openModal}
          handleClose={handleCloseFunc}
        />
      </Box>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
        transition={Bounce} // Specify Bounce as the transition prop value
      />
    </>
  )
}

export default InstructorList
