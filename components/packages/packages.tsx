import { TextField, Box } from '@mui/material'
import React, { useState, useEffect } from 'react'
import MUIDataTable from 'mui-datatables'
import { Button } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { getAllPackages, deletPackage } from 'services/room'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import './styles.css'
const Package = () => {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState(null)
  const [counter, setCounter] = useState(0)
  const [Packages, setPackges] = useState([])
  const open = Boolean(anchorEl)
  const [activeRow, setActiveRow] = useState(null)
  const handleClick = (event: any, index: any) => {
    setAnchorEl(event.currentTarget)
    setActiveRow(index)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleAddPackage = (data: any) => {
    router.push('/addpackage')
  }
  const handleEditPackage = (data: any) => {
    router.push(`/editpackage/${data[0]}`)
  }
  const data = [
    ['Package #1', '$589', '9 '],
    ['Package #2 ', '$739', '13 '],
    ['Package #3 ', '$895', '12 '],
    ['Package #2 (Online)', '$739', '16 '],
    ['Package #3 (Online)', '$895', '15 '],
    ['1 Hour Lesson', '$50', '1 Hour Lesson'],
    ['2 Hours And Road Test', '$200', '2 Hours And Road Test '],
    ['3 Hours Lesson + Road Test', '$250', '3 Hours Lesson + Road Test '],
    ['4 Hours Lesson + Road Test', '$300', '4 Hours Lesson + Road Test '],
    ['5 hour lesson + Road Test', '$330', '5 hour lesson + Road Test '],
    ['10 hour lesson + Road Test', '$550', '10 hour lesson + Road Test '],
    ['1 Hour Lesson', '$60', '1 Hour Lesson '],
    ['2 Hours And Road Test', '$250', '2 Hours And Road Test '],
    ['3 Hours Lesson + Road Test', '$300', '3 Hours Lesson + Road Test '],
    ['4 Hours Lesson + Road Test', '$360', '4 Hours Lesson + Road Test '],
    ['5 hour lesson + Road Test', '$400', '5 hour lesson + Road Test '],
  ]

  const handleDelete = async (data: any) => {
    handleClose()
    console.log('The data is:', data)
    try {
      const res = await deletPackage(data[0])
      console.log('Delete api response', res)
      toast.success('Package deleted Successfully', {
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
      toast.error('Error while deleting package', {
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
      name: 'Name',
      label: 'Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'Price',
      label: 'Price',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'NoOfLessons',
      label: 'No. of Lessons',
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
                  <MenuItem onClick={() => handleEditPackage(tableMeta.rowData)}>
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

  const fetchPackagesData = async () => {
    try {
      const response = await getAllPackages()
      console.log('The response of get all packages is', response)
      const packages: any = response.packages
      const AllPackages: any = packages.map((packags: any) => {
        return {
          ID: packags?._id,
          Name: packags?.name[0],
          Price: packags?.price,
          NoOfLessons: packags?.no_of_lesson,
        }
      })
      setPackges(AllPackages)
    } catch (error: any) {
      console.error('Error fetching packags data:', error.message)
    }
  }
  useEffect(() => {
    fetchPackagesData()
  }, [counter])

  const HeaderElements = () => {
    return (
      <Button type='button' sx={{ color: '#f23d4d' }} onClick={handleAddPackage}>
        + Add Package
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
          Packages
        </div>
        <MUIDataTable title={''} data={Packages} columns={columns} options={options} />
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

export default Package
