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
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getAllStudentInstructor, deletInstructor } from 'services/room'
import { MUIDataTableOptions } from 'mui-datatables'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import './styles.css'
import PayModal from './PayModal'
const StudentInstructor = ({ params }: any) => {
  const [counter, setCounter] = useState(0)
  const [openModal, setOpenModal] = useState(false)
  const [instructorData, setInstructorData] = useState([])
  const [studentData, setStudentData] = useState('')
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
  // params.studentid
  const fetchRoomsData = async () => {
    try {
      const response = await getAllStudentInstructor(params.studentid)
      console.log('The response of get all instructor is', response)
      const studentName = `${response.student?.firstName} ${response.student?.lastName}`
      setStudentData(studentName)
      const instructors: any = response.instructors
      const AllInstructors: any = instructors.map((instructor: any) => {
        const date = new Date(instructor?.createdAt)
        const formattedDate = date.toLocaleDateString('en-GB')
        const endDate = new Date(instructor?.endDate)

        const formattedEndDate = endDate.toLocaleDateString('en-GB')
        return {
          ID: instructor?._id,
          studentID: instructor?.std_id?.supportive_id,
          studentName: `${instructor?.std_id?.firstName} ${instructor?.std_id?.lastName}`,

          totalLesson: instructor?.no_of_lesson,
          lessonCompleted: instructor?.no_of_lesson_completed,
          remainingLesson: instructor?.no_of_lesson - instructor?.no_of_lesson_completed,
          instructorName: `${instructor?.instructor_id?.firstName} ${instructor?.instructor_id?.lastName}`,
          startdate: formattedDate,
          enddate: instructor?.endDate === null ? 'present' : formattedEndDate,
        }
      })
      setInstructorData(AllInstructors)
    } catch (error: any) {
      console.error('Error fetching instructor data:', error.message)
    }
  }
  useEffect(() => {
    fetchRoomsData()
  }, [counter])

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

  const handleViewStudent = () => {
    router.push('insturctorstudents')
  }

  const data = [
    [
      'John Doe',
      '890 Birch St',
      '888-5555',
      '4',
      // 'G7231-45532-25122',
      '2021/08/12',
      '2026/08/19',
      // '2026/10/15',
      // '2027/10/15',
      '$450',
      'No',
      '75%',
      '$100.50',
    ],
    [
      'Jane Smith',
      '123 Oak Ln',
      '777-1234',
      '2',
      // 'G7231-45532-25122',
      '2021/09/15',
      '2025/09/23',
      // '2023/12/10',
      // '2024/12/10',
      '$600',
      'Yes',
      '90%',
      '$200.50',
    ],
    [
      'Alice Johnson',
      '456 Maple St',
      '999-9876',
      '3',
      // 'G7231-45532-25122',
      '2021/11/05',
      '2026/11/15',
      // '2024/02/01',
      // '2025/02/01',
      '$700',
      'No',
      '80%',
      '$400.50',
    ],
    [
      'Bob Williams',
      '789 Cedar St',
      '555-6789',
      '2',
      // 'G7231-45532-25122',
      '2022/01/10',
      '2026/01/17',
      // '2023/04/15',
      // '2024/04/15',
      '$550',
      'Yes',
      '85%',

      '$200.50',
    ],
    [
      'Emily Davis',
      '234 Pine St',
      '333-4444',
      '5',
      // 'G7231-45532-25122',
      '2022/02/20',
      '2027/02/29',
      // '2024/06/01',
      // '2025/06/01',
      '$600',
      'No',
      '92%',
      '$400.50',
    ],
  ]

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
      name: 'studentID',
      label: 'Student ID',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'studentName',
      label: 'Student Name',
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      name: 'totalLesson',
      label: 'Total Lesson',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'lessonCompleted',
      label: 'Lesson Completed',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'remainingLesson',
      label: 'Remaining Lesson',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'instructorName',
      label: 'Instructor Name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'startdate',
      label: 'Start Date',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'enddate',
      label: 'End Date',
      options: {
        filter: true,
        sort: false,
      },
    },
    // {
    //   name: 'Actions',
    //   options: {
    //     sort: false,
    //     filter: false,
    //     customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
    //       return (
    //         <>
    //           <Button
    //             style={{ paddingTop: '0px', paddingBottom: '0px' }}
    //             type='button'
    //             onClick={(e) => handleClick(e, tableMeta.rowIndex)}
    //           >
    //             <MoreVertIcon sx={{ color: '#f23d4d' }} />
    //           </Button>
    //           {activeRow === tableMeta.rowIndex ? (
    //             <Menu
    //               id='basic-menu'
    //               anchorEl={anchorEl}
    //               open={open}
    //               onClose={handleClose}
    //               MenuListProps={{
    //                 'aria-labelledby': 'basic-button',
    //               }}
    //             >
    //               {/* insturctorstudents */}
    //               <MenuItem onClick={() => handleEditInstructor(tableMeta.rowData)}>
    //                 <ModeEditOutlineOutlinedIcon /> Edit
    //               </MenuItem>
    //               <MenuItem onClick={() => handleDelete(tableMeta.rowData)}>
    //                 <DeleteOutlineOutlinedIcon /> Delete
    //               </MenuItem>
    //               <MenuItem onClick={handleViewStudent}>
    //                 <PeopleAltIcon /> View students
    //               </MenuItem>
    //               <MenuItem
    //                 onClick={() => {
    //                   handleOpen()
    //                   handleClose()
    //                 }}
    //               >
    //                 <PaymentsOutlinedIcon sx={{ marginRight: '2px' }} /> Pay
    //               </MenuItem>
    //             </Menu>
    //           ) : (
    //             ''
    //           )}
    //         </>
    //       )
    //     },
    //   },
    // },
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

  const options: MUIDataTableOptions = {
    // filterType: 'checkbox' as const,
    // customToolbar: HeaderElements,
    // headCells: {
    //   style: {
    //     fontWeight: 'bold !important',
    //     color: 'black !important',
    //   },
    // },
    // print: false,
    // filter: false,
    filterType: 'checkbox',
    selectableRows: 'none',
    print: false,
    filter: false,
  }

  return (
    <>
      {' '}
      <Box sx={{ padding: '24px' }}>
        <div className='mt-10 mb-[1rem] text-[20x] sm:text-[19px] md:text-[23px] lg:text-[26px] text-center font-russoone font-normal'>
          {studentData} Instructors
        </div>
        <MUIDataTable title={''} data={instructorData} columns={columns} options={options} />
        <PayModal open={openModal} handleClose={handleCloseFunc} />
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

export default StudentInstructor
