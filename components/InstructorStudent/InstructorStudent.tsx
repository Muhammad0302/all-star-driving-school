/* eslint-disable react/jsx-no-comment-textnodes */
import { TextField, Box } from '@mui/material'
import React, { useState, useEffect } from 'react'
import MUIDataTable from 'mui-datatables'
import { Button } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import InputLabel from '@mui/material/InputLabel'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { getAllInstructorStudent, deletStudent } from 'services/room'
import HistoryIcon from '@mui/icons-material/History'
import { MUIDataTableOptions } from 'mui-datatables'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './styles.css'
import ViewDetail from './ViewDetail'
import PaymentHistory from './PaymentHistory'
const InstructorStudent = ({ params }: any) => {
  const [studentData, setStudentData] = useState([])
  const [instructorData, setInstructortData] = useState('')
  const [counter, setCounter] = useState(0)
  const [studentStatus, setStudentStatus] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [openModalPmntHstry, setOpenModalPmntHstry] = useState(false)
  const handleCloseFunc = () => setOpenModal(false)
  const handleCloseFuncPmntHstry = () => setOpenModalPmntHstry(false)
  const handleOpen = () => setOpenModal(true)
  const handleOpenPmntHstry = () => setOpenModalPmntHstry(true)
  const router = useRouter()
  const open = Boolean(anchorEl)
  const [activeRow, setActiveRow] = useState(null)
  const handleClick = (event: any, index: any) => {
    setAnchorEl(event.currentTarget)
    setActiveRow(index)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleEditStudent = (data: any) => {
    router.push(`/editstudent/${data}`)
  }
  // params.instructorId
  const fetchStudentsData = async () => {
    try {
      const response = await getAllInstructorStudent(params.instructorId)
      console.log('The response of get all student is', response)
      const instructor = response.instructor
      const instructorName = `${instructor?.firstName} ${instructor?.lastName}`
      setInstructortData(instructorName)
      const students: any = response.students
      const AllStudents: any = students.map((student: any) => {
        const date = new Date(student?.std_id?.createdAt)
        const formattedDate = date.toLocaleDateString('en-GB')
        return {
          ID: student?._id,
          studentID: student?.std_id?.supportive_id,
          studentName: `${student?.std_id?.firstName} ${student?.std_id?.lastName}`,

          totalLesson: student?.no_of_lesson + student?.no_of_lesson_completed,
          lessonCompleted: student?.no_of_lesson_completed,
          remainingLesson: student?.no_of_lesson,
          instructorName: `${student?.instructor_id?.firstName} ${student?.instructor_id?.lastName}`,
          startdate: formattedDate,
          enddate: 'present',
        }
      })
      setStudentData(AllStudents)
    } catch (error: any) {
      console.error('Error fetching student data:', error.message)
    }
  }
  useEffect(() => {
    fetchStudentsData()
  }, [counter])

  const handleDelete = async (data: any) => {
    handleClose()
    console.log('The data is:', data)
    try {
      const res = await deletStudent(data, 8)
      console.log('Delete api response', res)
      toast.success('Student deleted Successfully', {
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
      toast.error('Error while deleting student', {
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

  const data = [
    [
      'I24/12/1',
      'Eva Johnson',
      '890 Birch St',
      '888-5555',
      '13',
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
      'E24/12/2',
      'Michael Smith',
      '123 Oak Ln',
      '777-1234',
      '11',
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
      'I24/12/3',
      'Sophia Brown',
      '456 Maple St',
      '999-9876',
      '13',
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
      'E24/12/4',
      'Daniel Wilson',
      '789 Cedar St',
      '555-6789',
      '8',
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
      'I24/12/5',
      'Olivia Davis',
      '234 Pine St',
      '333-4444',
      '7',
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
    [
      'E24/12/6',
      'Aiden Taylor',
      '567 Oak Ln',
      '777-5678',
      '9',
      // 'G7231-45532-25122',
      '2022/03/12',
      '2026/03/25',
      // '2023/06/15',
      // '2024/06/15',
      '$700',
      'Yes',
      '88%',
      '$28.50',
    ],
    [
      'I24/12/7',
      'Mia Evans',
      '890 Cedar St',
      '999-6789',
      '10',
      // 'G7231-45532-25122',
      '2022/04/18',
      '2027/04/27',
      // '2024/07/01',
      // '2025/07/01',
      '$650',
      'No',
      '78%',
      '$100.50',
    ],
    [
      'E24/12/8',
      'Liam Turner',
      '123 Pine St',
      '555-1111',
      '12',
      // 'G7231-45532-25122',
      '2022/05/20',
      '2027/05/28',
      // '2024/08/01',
      // '2025/08/01',
      '$500',
      'Yes',
      '95%',
      '$300.50',
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
    //               <MenuItem onClick={() => handleEditStudent(tableMeta.rowData[0])}>
    //                 <ModeEditOutlineOutlinedIcon /> Edit
    //               </MenuItem>
    //               <MenuItem onClick={() => handleDelete(tableMeta.rowData[0])}>
    //                 <DeleteOutlineOutlinedIcon /> Delete
    //               </MenuItem>
    //               {/* <MenuItem
    //                 onClick={() => {
    //                   handleOpen()
    //                   handleClose()
    //                 }}
    //               >
    //                 <RemoveRedEyeIcon /> View Detail
    //               </MenuItem>
    //               <MenuItem
    //                 onClick={() => {
    //                   handleOpenPmntHstry()
    //                   handleClose()
    //                 }}
    //               >
    //                 <HistoryIcon /> Payment History
    //               </MenuItem> */}
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
  // changes added

  const handleStudentStatus = (event: any) => {
    setStudentStatus(event.target.value)
  }
  const HeaderElements = () => {
    return (
      <>
        <Link href='/addstudent' style={{ textDecoration: 'none', color: 'inherit' }}>
          <Button type='button' sx={{ color: '#f23d4d' }}>
            + Add Student
          </Button>
        </Link>
      </>
    )
  }
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
            <InputLabel id='demo-select-small'>Select Student Status</InputLabel>
            <Select
              labelId='demo-select-small'
              id='demo-select-small'
              value={studentStatus}
              label='Select Student Status'
              onChange={handleStudentStatus}
              MenuProps={{ PaperProps: { style: { maxHeight: '400px' } } }}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>

              <MenuItem value={'Completed Courses'}>Completed Courses</MenuItem>
              <MenuItem value={'Expired Students'}>Expired Students</MenuItem>
              <MenuItem value={'All Students'}>All Students</MenuItem>
            </Select>
          </FormControl>
        </div>
      </React.Fragment>
    )
  }

  const options: MUIDataTableOptions = {
    // customToolbar: HeaderElements,
    // print: false,
    // filter: false,

    // filterType: 'checkbox',
    // selectableRows: 'none',
    // headCells: {
    //   style: {
    //     fontWeight: 'bold !important',
    //     color: 'black !important',
    //   },
    // },

    // headCells: {
    //   style: {
    //     fontWeight: 'bold !important',
    //     color: 'black !important',
    //   },
    // },
    // customToolbar: () => {
    //   return (
    //     <React.Fragment>
    //       <HeaderElements />
    //       <FilterElements />
    //     </React.Fragment>
    //   )
    // },
    filterType: 'checkbox',
    selectableRows: 'none',
    print: false,
    filter: false,
  }

  return (
    <>
      <Box sx={{ padding: '24px' }}>
        <div className='mt-10 mb-[1rem] text-[20x] sm:text-[19px] md:text-[23px] lg:text-[26px] text-center font-russoone font-normal'>
          {instructorData} Students
        </div>

        <MUIDataTable title={''} data={studentData} columns={columns} options={options} />
        <ViewDetail open={openModal} handleClose={handleCloseFunc} />
        <PaymentHistory open={openModalPmntHstry} handleClose={handleCloseFuncPmntHstry} />
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

export default InstructorStudent
