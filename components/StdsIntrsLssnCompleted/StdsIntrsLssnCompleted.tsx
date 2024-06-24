import { TextField, Box } from '@mui/material'
import React, { useState, useEffect } from 'react'
import MUIDataTable from 'mui-datatables'
import { Button } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import { getAllCompletedLesson, deleteCompletedLesson, getSingleLesson } from 'services/room'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import HistoryIcon from '@mui/icons-material/History'
import LessonHistory from './LessonHistory'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import './styles.css'
const StdsIntrsLssnCompleted = () => {
  const [singleLessonData, setSingleLessonData] = useState([])
  const [openModalPmntHstry, setOpenModalPmntHstry] = useState(false)
  const handleCloseFuncPmntHstry = () => setOpenModalPmntHstry(false)
  const handleOpenPmntHstry = () => setOpenModalPmntHstry(true)
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState(null)
  const [lessons, setLessons] = useState([])
  const [counter, setCounter] = useState(0)
  const open = Boolean(anchorEl)
  const [activeRow, setActiveRow] = useState(null)
  const handleClick = (event: any, index: any) => {
    setAnchorEl(event.currentTarget)
    setActiveRow(index)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleAddLessonCompletion = () => {
    router.push('/addlessoncompletion')
  }
  const data = [
    ['Instructor 1', 'I24/12/1', 'John Doe', '2', '10', 'Yes'],
    ['Instructor 2', 'I24/12/2', 'Jane Smith', '3', '8', 'No'],
    ['Instructor 3', 'I24/12/3', 'Alice Brown', '2', '12', 'Yes'],
    ['Instructor 4', 'I24/12/4', 'Bob Johnson', '1', '15', 'No'],
    ['Instructor 5', 'I24/12/5', 'Charlie Davis', '1', '18', 'Yes'],
    ['Instructor 6', 'I24/12/6', 'Eva Thomas', '1', '20', 'No'],
    ['Instructor 7', 'I24/12/7', 'Frank Miller', '2', '22', 'Yes'],
    ['Instructor 8', 'I24/12/8', 'Grace Wilson', '2', '25', 'No'],
    ['Instructor 9', 'I24/12/9', 'Harry Lee', '2', '28', 'Yes'],
    ['Instructor 10', 'I24/12/10', 'Ivy Turner', '3', '30', 'No'],
    ['Instructor 11', 'I24/12/11', 'Jack Evans', '2', '32', 'Yes'],
    ['Instructor 12', 'E24/12/12', 'Katherine Hall', '1', '35', 'No'],
    ['Instructor 13', 'E24/12/13', 'Liam Brooks', '1', '38', 'Yes'],
    ['Instructor 14', 'E24/12/14', 'Mia Taylor', '$13.50', '$13.75', '$14.00', '40', 'No'],
    ['Instructor 15', 'E24/12/15', 'Noah Adams', '$14.50', '$14.75', '$15.00', '42', 'Yes'],
    ['Instructor 16', 'E24/12/16', 'Olivia Clark', '2', '45', 'No'],
    ['Instructor 17', 'E24/12/17', 'Peter Brown', '3', '48', 'Yes'],
    ['Instructor 18', 'E24/12/18', 'Quinn Evans', '$17.50', '$17.75', '$18.00', '50', 'No'],
    ['Instructor 19', 'E24/12/9', 'Rachel Turner', '3', '52', 'Yes'],
    ['Instructor 20', 'E24/12/20', 'Samuel Lee', '$19.50', '$19.75', '$20.00', '55', 'No'],
  ]

  const getSingleLessonDetail = async (id: any) => {
    try {
      const response = await getSingleLesson(id)
      setSingleLessonData(response.lesson)
    } catch (error: any) {
      console.error('Error fetching data:', error.message)
    }
  }

  const handleDelete = async (data: any) => {
    handleClose()
    console.log('The data is:', data)
    try {
      const res = await deleteCompletedLesson(data[1])
      console.log('Delete api response', res)
      toast.success('Lesson deleted Successfully', {
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
      toast.error('Error while deleting lessons', {
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

  const fetchLeesonData = async () => {
    try {
      const response = await getAllCompletedLesson()
      const lessons: any = response.lessons

      const AllLessons: any = lessons.map((lesson: any) => {
        return {
          ID: lesson?._id,
          lessonId: lesson?.lesson_id,
          StudentID: lesson?.supportive_id,
          StudentName: `${lesson?.firstName} ${lesson?.lastName}`,
          Address: `${lesson?.address} `,
          LessonsCompleted: lesson?.total_lesson_completed,
          totalnooflesson: lesson?.total_lesson,
        }
      })
      setLessons(AllLessons)
    } catch (error: any) {
      console.error('Error fetching lesson data:', error.message)
    }
  }
  useEffect(() => {
    fetchLeesonData()
  }, [counter])

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
      name: 'lessonId',
      label: 'lessonId',
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
    // {
    //   name: 'InstructorName',
    //   label: 'Instructor Name',
    //   options: {
    //     filter: true,
    //     sort: false,
    //   },
    // },
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
      name: 'Address',
      label: 'Address',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'totalnooflesson',
      label: 'Total no of Lessons',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'LessonsCompleted',
      label: 'Total Lessons Completed',
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
                      getSingleLessonDetail(tableMeta.rowData[0])
                    }}
                  >
                    <HistoryIcon /> Lesson History
                  </MenuItem>
                  {/* <MenuItem onClick={handleAddLessonCompletion}>
                    <ModeEditOutlineOutlinedIcon /> Edit
                  </MenuItem> */}
                  <MenuItem onClick={() => handleDelete(tableMeta.rowData)}>
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
      <Button type='button' sx={{ color: '#f23d4d' }} onClick={handleAddLessonCompletion}>
        + Add Lesson Completion
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
          Completed Lessons
        </div>
        <MUIDataTable title={''} data={lessons} columns={columns} options={options} />
      </Box>
      <LessonHistory
        singleLesson={singleLessonData}
        open={openModalPmntHstry}
        handleClose={handleCloseFuncPmntHstry}
      />
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

export default StdsIntrsLssnCompleted

// import { TextField, Box } from '@mui/material'
// import React, { useState, useEffect } from 'react'
// import MUIDataTable from 'mui-datatables'
// import { Button } from '@mui/material'
// import MoreVertIcon from '@mui/icons-material/MoreVert'
// import Menu from '@mui/material/Menu'
// import MenuItem from '@mui/material/MenuItem'
// import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
// import { getAllCompletedLesson, deleteCompletedLesson } from 'services/room'
// import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
// import { ToastContainer, toast, Bounce } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// import { useRouter } from 'next/navigation'
// import './styles.css'
// const StdsIntrsLssnCompleted = () => {
//   const router = useRouter()
//   const [anchorEl, setAnchorEl] = useState(null)
//   const [lessons, setLessons] = useState([])
//   const [counter, setCounter] = useState(0)
//   const open = Boolean(anchorEl)
//   const [activeRow, setActiveRow] = useState(null)
//   const handleClick = (event: any, index: any) => {
//     setAnchorEl(event.currentTarget)
//     setActiveRow(index)
//   }
//   const handleClose = () => {
//     setAnchorEl(null)
//   }
//   const handleAddLessonCompletion = () => {
//     router.push('/addlessoncompletion')
//   }
//   const data = [
//     ['Instructor 1', 'I24/12/1', 'John Doe', '2', '10', 'Yes'],
//     ['Instructor 2', 'I24/12/2', 'Jane Smith', '3', '8', 'No'],
//     ['Instructor 3', 'I24/12/3', 'Alice Brown', '2', '12', 'Yes'],
//     ['Instructor 4', 'I24/12/4', 'Bob Johnson', '1', '15', 'No'],
//     ['Instructor 5', 'I24/12/5', 'Charlie Davis', '1', '18', 'Yes'],
//     ['Instructor 6', 'I24/12/6', 'Eva Thomas', '1', '20', 'No'],
//     ['Instructor 7', 'I24/12/7', 'Frank Miller', '2', '22', 'Yes'],
//     ['Instructor 8', 'I24/12/8', 'Grace Wilson', '2', '25', 'No'],
//     ['Instructor 9', 'I24/12/9', 'Harry Lee', '2', '28', 'Yes'],
//     ['Instructor 10', 'I24/12/10', 'Ivy Turner', '3', '30', 'No'],
//     ['Instructor 11', 'I24/12/11', 'Jack Evans', '2', '32', 'Yes'],
//     ['Instructor 12', 'E24/12/12', 'Katherine Hall', '1', '35', 'No'],
//     ['Instructor 13', 'E24/12/13', 'Liam Brooks', '1', '38', 'Yes'],
//     ['Instructor 14', 'E24/12/14', 'Mia Taylor', '$13.50', '$13.75', '$14.00', '40', 'No'],
//     ['Instructor 15', 'E24/12/15', 'Noah Adams', '$14.50', '$14.75', '$15.00', '42', 'Yes'],
//     ['Instructor 16', 'E24/12/16', 'Olivia Clark', '2', '45', 'No'],
//     ['Instructor 17', 'E24/12/17', 'Peter Brown', '3', '48', 'Yes'],
//     ['Instructor 18', 'E24/12/18', 'Quinn Evans', '$17.50', '$17.75', '$18.00', '50', 'No'],
//     ['Instructor 19', 'E24/12/9', 'Rachel Turner', '3', '52', 'Yes'],
//     ['Instructor 20', 'E24/12/20', 'Samuel Lee', '$19.50', '$19.75', '$20.00', '55', 'No'],
//   ]

//   const handleDelete = async (data: any) => {
//     handleClose()
//     console.log('The data is:', data)
//     try {
//       const res = await deleteCompletedLesson(data[0])
//       console.log('Delete api response', res)
//       toast.success('Lesson deleted Successfully', {
//         position: 'top-right',
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: 'colored',
//         transition: Bounce,
//       })
//       setCounter(counter + 1)
//     } catch (error: any) {
//       toast.error('Error while deleting lessons', {
//         position: 'top-right',
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: 'colored',
//         transition: Bounce,
//       })
//     }
//   }

//   const fetchLeesonData = async () => {
//     try {
//       const response = await getAllCompletedLesson()
//       console.log('The response of get all lesson is', response)
//       const lessons: any = response.lessons

//       const AllLessons: any = lessons.map((lesson: any) => {
//         return {
//           ID: lesson?._id,
//           InstructorName: `${lesson?.instruct_id?.firstName} ${lesson?.instruct_id?.lastName}`,
//           StudentID: lesson?.std_id?.supportive_id,
//           StudentName: `${lesson?.std_id?.firstName} ${lesson?.std_id?.lastName}`,
//           LessonsCompleted: lesson?.no_of_lesson_compeleted,
//           RoadTestCompleted: lesson?.road_test_completion,
//           totalnooflesson: lesson?.total_lesson,
//         }
//       })
//       setLessons(AllLessons)
//     } catch (error: any) {
//       console.error('Error fetching lesson data:', error.message)
//     }
//   }
//   useEffect(() => {
//     fetchLeesonData()
//   }, [counter])

//   const columns = [
//     {
//       name: 'ID',
//       label: 'ID',
//       options: {
//         filter: true,
//         sort: true,
//         display: false,
//       },
//     },
//     {
//       name: 'InstructorName',
//       label: 'Instructor Name',
//       options: {
//         filter: true,
//         sort: false,
//       },
//     },
//     {
//       name: 'StudentID',
//       label: 'Student ID',
//       options: {
//         filter: true,
//         sort: false,
//       },
//     },
//     {
//       name: 'StudentName',
//       label: 'Student Name',
//       options: {
//         filter: true,
//         sort: false,
//       },
//     },
//     {
//       name: 'totalnooflesson',
//       label: 'Total no of Lessons',
//       options: {
//         filter: true,
//         sort: false,
//       },
//     },
//     {
//       name: 'LessonsCompleted',
//       label: 'Lessons Completed',
//       options: {
//         filter: true,
//         sort: false,
//       },
//     },
//     {
//       name: 'RoadTestCompleted',
//       label: 'Road Test Completed',
//       options: {
//         filter: true,
//         sort: false,
//       },
//     },
//     {
//       name: 'Actions',
//       options: {
//         sort: false,
//         filter: false,
//         customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
//           return (
//             <>
//               <Button
//                 style={{ paddingTop: '0px', paddingBottom: '0px' }}
//                 type='button'
//                 onClick={(e) => handleClick(e, tableMeta.rowIndex)}
//               >
//                 <MoreVertIcon sx={{ color: '#f23d4d' }} />
//               </Button>
//               {activeRow === tableMeta.rowIndex ? (
//                 <Menu
//                   id='basic-menu'
//                   anchorEl={anchorEl}
//                   open={open}
//                   onClose={handleClose}
//                   MenuListProps={{
//                     'aria-labelledby': 'basic-button',
//                   }}
//                 >
//                   <MenuItem onClick={handleAddLessonCompletion}>
//                     <ModeEditOutlineOutlinedIcon /> Edit
//                   </MenuItem>
//                   <MenuItem onClick={() => handleDelete(tableMeta.rowData)}>
//                     <DeleteOutlineOutlinedIcon /> Delete
//                   </MenuItem>
//                 </Menu>
//               ) : (
//                 ''
//               )}
//             </>
//           )
//         },
//       },
//     },
//   ]

//   const HeaderElements = () => {
//     return (
//       <Button type='button' sx={{ color: '#f23d4d' }} onClick={handleAddLessonCompletion}>
//         + Add Lesson Completion
//       </Button>
//     )
//   }

//   const options = {
//     filterType: 'checkbox' as const,
//     customToolbar: HeaderElements,
//     headCells: {
//       style: {
//         fontWeight: 'bold !important',
//         color: 'black !important',
//       },
//     },
//     print: false,
//     filter: false,
//   }
//   return (
//     <>
//       <Box sx={{ padding: '24px' }}>
//         <div className='mt-10 mb-[1rem] text-[20x] sm:text-[19px] md:text-[23px] lg:text-[26px] text-center font-russoone font-normal'>
//           Completed Lessons
//         </div>
//         <MUIDataTable title={''} data={lessons} columns={columns} options={options} />
//       </Box>
//       <ToastContainer
//         position='top-right'
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme='colored'
//         transition={Bounce} // Specify Bounce as the transition prop value
//       />
//     </>
//   )
// }

// export default StdsIntrsLssnCompleted
