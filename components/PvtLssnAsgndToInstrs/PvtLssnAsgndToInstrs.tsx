import { TextField, Box } from '@mui/material'
import React, { useState, useEffect } from 'react'
import MUIDataTable from 'mui-datatables'
import { Button } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getAllPrivateLesson, deletePrivateLesson } from 'services/room'
import { useRouter } from 'next/navigation'
import './styles.css'
const PvtLssnAsgndToInstrs = () => {
  const router = useRouter()
  const [counter, setCounter] = useState(0)
  const [pvtLessonData, setPvtLessonData] = useState([])
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
  const handleAddPvtLesson = () => {
    router.push('/addprivatelesson')
  }
  const data = [
    ['John Doe', 'Khan Ali', '123-456-7890', '5', 'Yes'],
    ['Jane Smith', 'Ali Muhammad', '987-654-3210', '8', 'No'],
    ['David Johnson', 'Sara Khan', '555-123-7890', '10', 'Yes'],
    ['Emily Davis', 'Michael Smith', '777-888-9999', '12', 'No'],
    ['Alex Turner', 'Sophia Brown', '111-222-3333', '15', 'Yes'],
    ['Daniel White', 'Isabella Garcia', '444-555-6666', '18', 'No'],
    ['Emma Robinson', 'James Miller', '999-888-7777', '20', 'Yes'],
    ['Ethan Wilson', 'Olivia Clark', '333-222-1111', '22', 'No'],
    ['Aiden Turner', 'Ava Johnson', '666-777-8888', '25', 'Yes'],
    ['Mia Thomas', 'Noah Davis', '888-999-0000', '28', 'No'],
    ['Ella Brown', 'Liam Turner', '222-333-4444', '30', 'Yes'],
    ['Caleb Smith', 'Sophie White', '444-666-8888', '32', 'No'],
    ['Aria Martin', 'Elijah Hall', '777-999-1111', '35', 'Yes'],
    ['Logan Taylor', 'Ava Wilson', '111-555-9999', '38', 'No'],
    ['Lily Harris', 'Evan Turner', '999-444-1111', '40', 'Yes'],
    ['Carter Anderson', 'Grace Evans', '555-999-6666', '43', 'No'],
    ['Scarlett Lee', 'Jackson Brown', '333-888-1111', '46', 'Yes'],
    ['Lucas Turner', 'Nora Smith', '666-111-9999', '48', 'No'],
    ['Zoe Martin', 'Leo Davis', '888-333-5555', '50', 'Yes'],
    ['Ava Anderson', 'Liam Turner', '111-222-3333', '52', 'No'],
  ]

  const fetchData = async () => {
    try {
      const response = await getAllPrivateLesson()
      console.log('The response of pvt lesson is', response)
      const pvtlessons: any = response.privateLessons
      const AllInstructors: any = pvtlessons.map((pvtlesson: any) => {
        return {
          ID: pvtlesson?._id,
          instructorName: `${pvtlesson?.instructor_id.firstName} ${pvtlesson?.instructor_id.lastName}`,
          StudentName: pvtlesson?.student_name,
          studentPhone: pvtlesson?.student_phone,
          InitialLessonsRequested: pvtlesson?.initial_lesson_requested,
          RoadTestRequested: pvtlesson?.road_test_req,
        }
      })
      setPvtLessonData(AllInstructors)
    } catch (error: any) {
      console.error('Error fetching instructor data:', error.message)
    }
  }
  useEffect(() => {
    fetchData()
  }, [counter])

  const handleDelete = async (data: any) => {
    handleClose()
    console.log('The data is:', data)
    try {
      const res = await deletePrivateLesson(data[0])
      console.log('Delete api response', res)
      toast.success('Pvt lesson deleted Successfully', {
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
      toast.error('Error while deleting pvt lesson', {
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
      name: 'instructorName',
      label: 'Instructor Name',
      options: {
        filter: true,
        sort: true,
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
      name: 'studentPhone',
      label: 'Student Phone',
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      name: 'InitialLessonsRequested',
      label: 'Initial Lessons Requested',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'RoadTestRequested',
      label: 'Road Test Requested',
      options: {
        filter: true,
        sort: false,
      },
    },
    // {
    //   name: 'LessonsCompleted',
    //   label: 'Number of Lessons Completed',
    //   options: {
    //     filter: true,
    //     sort: false,
    //   },
    // },
    // {
    //   name: 'RoadTestCompleted',
    //   label: 'Road Test Completed',
    //   options: {
    //     filter: true,
    //     sort: false,
    //   },
    // },
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
                  <MenuItem onClick={handleAddPvtLesson}>
                    <ModeEditOutlineOutlinedIcon /> Edit
                  </MenuItem>
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
      <Button type='button' sx={{ color: '#f23d4d' }} onClick={handleAddPvtLesson}>
        + Add Pvt Lesson
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
          Private Lessons
        </div>
        <MUIDataTable title={''} data={pvtLessonData} columns={columns} options={options} />
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

export default PvtLssnAsgndToInstrs
