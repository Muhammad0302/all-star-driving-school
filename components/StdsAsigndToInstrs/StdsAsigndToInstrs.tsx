import { TextField, Box } from '@mui/material'
import React, { useState, useEffect } from 'react'
import MUIDataTable from 'mui-datatables'
import { Button } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import PersonIcon from '@mui/icons-material/Person'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getAllAssignPackage, deletAssignPackage } from 'services/room'
import { useRouter } from 'next/navigation'
import './styles.css'
const StdsAsigndToInstrs = () => {
  const router = useRouter()
  const [counter, setCounter] = useState(0)
  const [anchorEl, setAnchorEl] = useState(null)
  const [studentList, setStudentList] = useState([])
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

  const fetchStudentsData = async () => {
    try {
      const response = await getAllAssignPackage()
      console.log('The response is', response)
      const instructors: any = response.packagesAssigToStuds
      const Students: any = instructors.map((student: any) => {
        return {
          ID: student?._id,
          InstructorName: `${student?.instructor_id?.firstName} ${student?.instructor_id?.lastName}`,
          StudentID: student?.std_id.supportive_id,
          StudentName: `${student?.std_id?.firstName} ${student?.std_id?.lastName}`,
          nooflesson: student?.no_of_lesson,
          roadTest: student.road_test,
          // totalPrice: student?.package_id.price,
          // advancePayment: student?.advance,
          // remainingprice: student?.remainingAmount,
          // paymentplan: student?.paymentPlan,
        }
      })
      setStudentList(Students)
    } catch (error: any) {
      console.error('Error fetching data:', error.message)
    }
  }
  useEffect(() => {
    fetchStudentsData()
  }, [counter])

  const handleDelete = async (data: any) => {
    handleClose()
    console.log('The data is:', data)
    try {
      const res = await deletAssignPackage(data[0])
      console.log('Delete api response', res)
      toast.success('Assign Package deleted Successfully', {
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
      toast.error('Error while deleting assign package', {
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

  const handleChangeInstructor = async (data: any) => {
    handleClose()
    router.push(`/changeinstructor/${data[0]}`)
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
      name: 'roadTest',
      label: 'Road Test',
      options: {
        filter: true,
        sort: false,
      },
    },
    // {
    //   name: 'totalPrice',
    //   label: 'Total Price',
    //   options: {
    //     filter: true,
    //     sort: false,
    //   },
    // },
    // {
    //   name: 'advancePayment',
    //   label: 'Advance Payment',
    //   options: {
    //     filter: true,
    //     sort: false,
    //   },
    // },
    // {
    //   name: 'remainingprice',
    //   label: 'Remaining Price',
    //   options: {
    //     filter: true,
    //     sort: false,
    //   },
    // },
    // {
    //   name: 'paymentplan',
    //   label: 'Payment Plan',
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
                  <MenuItem onClick={handleAssignInstructor}>
                    <ModeEditOutlineOutlinedIcon /> Edit
                  </MenuItem>
                  <MenuItem onClick={() => handleDelete(tableMeta.rowData)}>
                    <DeleteOutlineOutlinedIcon /> Delete
                  </MenuItem>
                  <MenuItem onClick={() => handleChangeInstructor(tableMeta.rowData)}>
                    <PersonIcon /> Change Instructor
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
        + Assign Instructor
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
          Assign Instructor and Packages Students List
        </div>
        <MUIDataTable title={''} data={studentList} columns={columns} options={options} />
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

export default StdsAsigndToInstrs
