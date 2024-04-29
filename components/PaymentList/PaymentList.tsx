import { TextField, Box } from '@mui/material'
import React, { useState, useEffect } from 'react'
import MUIDataTable from 'mui-datatables'
import { Button } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import PrintIcon from '@mui/icons-material/Print'
import PaymentHistory from './PaymentHistory'
import HistoryIcon from '@mui/icons-material/History'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getAllPayment, deletePayment } from 'services/room'
import { useRouter } from 'next/navigation'
import './styles.css'
import ViewDetail from './ViewDetail'
const PaymentList = () => {
  const router = useRouter()
  const [counter, setCounter] = useState(0)
  const [paymentData, setPaymentData] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [openModalPmntHstry, setOpenModalPmntHstry] = useState(false)
  const handleCloseFuncPmntHstry = () => setOpenModalPmntHstry(false)
  const handleOpenPmntHstry = () => setOpenModalPmntHstry(true)
  const handleOpen = () => setOpenModal(true)
  const handleCloseFunc = () => setOpenModal(false)
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
  const handleAddIssueBook = () => {
    router.push('/addpayment')
  }
  const data = [
    [
      'I24/12/1',
      'John Doe',
      '$0.50',
      '$0.75',
      '$1.00',
      '$1.25',
      // 'Credit Card',
      // 'Cash',
      // 'Debit Card',
      // 'Credit Card',
      'Book',
      '2022-01-15',
      // '2022-01-20',
      // '2022-01-25',
      // '2022-01-30',
      '$3.50',
    ],
    [
      'E24/12/2',
      'Jane Smith',
      '$1.50',
      '$1.75',
      '$2.00',
      '$2.25',
      // 'Cash',
      // 'Credit Card',
      // 'Debit Card',
      // 'Cash',
      'Cash',
      '2022-01-16',
      // '2022-01-21',
      // '2022-01-26',
      // '2022-01-31',
      '$7.50',
    ],
    [
      'I24/12/3',
      'Alice Brown',
      '$2.50',
      '$2.75',
      '$3.00',
      '$3.25',
      // 'Debit Card',
      // 'Cash',
      // 'Credit Card',
      // 'Debit Card',
      'Debit Card',
      '2022-01-20',
      // '2022-01-25',
      // '2022-01-30',
      // '2022-02-04',
      '$11.50',
    ],
    [
      'E24/12/4',
      'Bob Johnson',
      '$3.50',
      '$3.75',
      '$4.00',
      '$4.25',
      // 'Credit Card',
      // 'Cash',
      // 'Debit Card',
      // 'Credit Card',
      'Book',
      '2022-01-22',
      // '2022-01-27',
      // '2022-02-01',
      // '2022-02-05',
      '$16.50',
    ],
    [
      'I24/12/5',
      'Charlie Davis',
      '$4.50',
      '$4.75',
      '$5.00',
      '$5.25',
      // 'Cash',
      // 'Credit Card',
      // 'Debit Card',
      // 'Cash',
      'Cash',
      '2022-01-26',
      // '2022-01-31',
      // '2022-02-05',
      // '2022-02-10',
      '$19.50',
    ],
    [
      'E24/12/6',
      'Eva Thomas',
      '$5.50',
      '$5.75',
      '$6.00',
      '$6.25',
      // 'Debit Card',
      // 'Cash',
      // 'Credit Card',
      // 'Debit Card',
      'Debit Card',
      '2022-01-30',
      // '2022-02-04',
      // '2022-02-09',
      // '2022-02-14',
      '$23.50',
    ],
    [
      'I24/12/7',
      'Frank Miller',
      '$6.50',
      '$6.75',
      '$7.00',
      '$7.25',
      // 'Credit Card',
      // 'Cash',
      // 'Debit Card',
      // 'Credit Card',
      'Book',
      '2022-02-03',
      // '2022-02-08',
      // '2022-02-13',
      // '2022-02-18',
      '$27.50',
    ],
    [
      'E24/12/8',
      'Grace Wilson',
      '$7.50',
      '$7.75',
      '$8.00',
      '$8.25',
      // 'Cash',
      // 'Credit Card',
      // 'Debit Card',
      // 'Cash',
      'Cash',
      '2022-02-07',
      // '2022-02-12',
      // '2022-02-17',
      // '2022-02-22',
      '$31.50',
    ],
    [
      'I24/12/9',
      'Harry Lee',
      '$8.50',
      '$8.75',
      '$9.00',
      '$9.25',
      // 'Debit Card',
      // 'Cash',
      // 'Credit Card',
      // 'Debit Card',
      'Debit Card',
      '2022-02-11',
      // '2022-02-16',
      // '2022-02-21',
      // '2022-02-26',
      '$35.50',
    ],
    [
      'E24/12/10',
      'Ivy Turner',
      '$9.50',
      '$9.75',
      '$10.00',
      '$10.25',
      // 'Credit Card',
      // 'Cash',
      // 'Debit Card',
      // 'Credit Card',
      'Book',
      '2022-02-15',
      // '2022-02-20',
      // '2022-02-25',
      // '2022-03-02',
      '$39.50',
    ],
    [
      'I24/12/11',
      'Jack Evans',
      '$10.50',
      '$10.75',
      '$11.00',
      '$11.25',
      // 'Cash',
      // 'Credit Card',
      // 'Debit Card',
      // 'Cash',
      'Cash',
      '2022-02-19',
      // '2022-02-24',
      // '2022-03-01',
      // '2022-03-06',
      '$43.50',
    ],
    [
      'E24/12/12',
      'Katherine Hall',
      '$11.50',
      '$11.75',
      '$12.00',
      '$12.25',
      // 'Debit Card',
      // 'Cash',
      // 'Credit Card',
      // 'Debit Card',
      'Debit Card',
      '2022-02-23',
      // '2022-02-28',
      // '2022-03-05',
      // '2022-03-10',
      '$47.50',
    ],
    [
      'I24/12/13',
      'Liam Brooks',
      '$12.50',
      '$12.75',
      '$13.00',
      '$13.25',
      // 'Credit Card',
      // 'Cash',
      // 'Debit Card',
      // 'Credit Card',
      'Book',
      '2022-02-27',
      // '2022-03-04',
      // '2022-03-09',
      // '2022-03-14',
      '$51.50',
    ],
    [
      'E24/12/14',
      'Mia Taylor',
      '$13.50',
      '$13.75',
      '$14.00',
      '$14.25',
      // 'Cash',
      // 'Credit Card',
      // 'Debit Card',
      // 'Cash',
      'Cash',
      '2022-03-03',
      // '2022-03-08',
      // '2022-03-13',
      // '2022-03-18',
      '$55.50',
    ],
    [
      'I24/12/15',
      'Noah Adams',
      '$14.50',
      '$14.75',
      '$15.00',
      '$15.25',
      // 'Debit Card',
      // 'Cash',
      // 'Credit Card',
      // 'Debit Card',
      'Debit Card',
      '2022-03-07',
      // '2022-03-12',
      // '2022-03-17',
      // '2022-03-22',
      '$59.50',
    ],
    [
      'E24/12/16',
      'Olivia Clark',
      '$15.50',
      '$15.75',
      '$16.00',
      '$16.25',
      // 'Credit Card',
      // 'Cash',
      // 'Debit Card',
      // 'Credit Card',
      'Book',
      '2022-03-11',
      // '2022-03-16',
      // '2022-03-21',
      // '2022-03-26',
      '$63.50',
    ],
    [
      'I24/12/17',
      'Peter Brown',
      '$16.50',
      '$16.75',
      '$17.00',
      '$17.25',
      // 'Cash',
      // 'Credit Card',
      // 'Debit Card',
      // 'Cash',
      'Cash',
      '2022-03-15',
      // '2022-03-20',
      // '2022-03-25',
      // '2022-03-30',
      '$67.50',
    ],
    [
      'E24/12/18',
      'Quinn Evans',
      '$17.50',
      '$17.75',
      '$18.00',
      '$18.25',
      // 'Debit Card',
      // 'Cash',
      // 'Credit Card',
      // 'Debit Card',
      'Debit Card',
      '2022-03-19',
      // '2022-03-24',
      // '2022-03-29',
      // '2022-04-03',
      '$71.50',
    ],
    [
      'I24/12/19',
      'Rachel Turner',
      '$18.50',
      '$18.75',
      '$19.00',
      '$19.25',
      // 'Credit Card',
      // 'Cash',
      // 'Debit Card',
      // 'Credit Card',
      'Book',
      '2022-03-23',
      // '2022-03-28',
      // '2022-04-02',
      // '2022-04-07',
      '$75.50',
    ],
    [
      'E24/12/20',
      'Samuel Lee',
      '$19.50',
      '$19.75',
      '$20.00',
      '$20.25',
      // 'Cash',
      // 'Credit Card',
      // 'Debit Card',
      // 'Cash',
      'Cash',
      '2022-03-27',
      // '2022-04-01',
      // '2022-04-06',
      // '2022-04-11',
      '$79.50',
    ],
  ]

  const fetchPaymentData = async () => {
    try {
      const response = await getAllPayment()
      console.log('The response of get all payment is', response)
      const payments: any = response.studentPayments
      const AllPayments: any = payments.map((payment: any) => {
        return {
          ID: payment?._id,
          StudentID: payment?.std_id?.supportive_id,
          StudentName: `${payment?.std_id?.firstName} ${payment?.std_id?.lastName}`,
          TotalPayments: payment?.amount,
          phoneNumber: payment?.std_id?.phone_number,
          PaymentPlan: 4,
        }
      })
      setPaymentData(AllPayments)
    } catch (error: any) {
      console.error('Error fetching instructor data:', error.message)
    }
  }
  useEffect(() => {
    fetchPaymentData()
  }, [counter])

  const handleDelete = async (data: any) => {
    handleClose()
    console.log('The data is:', data)
    try {
      const res = await deletePayment(data[0])
      console.log('Delete api response', res)
      toast.success('Payment deleted Successfully', {
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
      toast.error('Error while deleting payment', {
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
      name: 'StudentID',
      label: 'Student ID',
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
      name: 'phoneNumber',
      label: 'Phone Number',
      options: {
        filter: true,
        sort: false,
      },
    },

    // {
    //   name: 'Payment1',
    //   label: 'Payment1',
    //   options: {
    //     filter: true,
    //     sort: false,
    //   },
    // },
    // {
    //   name: 'Payment2',
    //   label: 'Payment2',
    //   options: {
    //     filter: true,
    //     sort: false,
    //   },
    // },
    // {
    //   name: 'Payment3',
    //   label: 'Payment3',
    //   options: {
    //     filter: true,
    //     sort: false,
    //   },
    // },
    // {
    //   name: 'Payment4',
    //   label: 'Payment4',
    //   options: {
    //     filter: true,
    //     sort: false,
    //   },
    // },
    // {
    //   name: 'Payment1Method',
    //   label: 'Payment1 Method',
    //   options: {
    //     filter: true,
    //     sort: false,
    //   },
    // },
    // {
    //   name: 'Payment2Method',
    //   label: 'Payment2 Method',
    //   options: {
    //     filter: true,
    //     sort: false,
    //   },
    // },
    // {
    //   name: 'Payment3Method',
    //   label: 'Payment3 Method',
    //   options: {
    //     filter: true,
    //     sort: false,
    //   },
    // },
    // {
    //   name: 'Payment4Method',
    //   label: 'Payment4 Method',
    //   options: {
    //     filter: true,
    //     sort: false,
    //   },
    // },
    // {
    //   name: 'PaymentType',
    //   label: 'Payment Type',
    //   options: {
    //     filter: true,
    //     sort: false,
    //   },
    // },
    // {
    //   name: 'Payment1Date',
    //   label: 'Payment1 Date',
    //   options: {
    //     filter: true,
    //     sort: false,
    //   },
    // },
    // {
    //   name: 'Payment2Date',
    //   label: 'Payment2 Date',
    //   options: {
    //     filter: true,
    //     sort: false,
    //   },
    // },
    // {
    //   name: 'Payment3Date',
    //   label: 'Payment3 Date',
    //   options: {
    //     filter: true,
    //     sort: false,
    //   },
    // },
    // {
    //   name: 'Payment4Date',
    //   label: 'Payment4 Date',
    //   options: {
    //     filter: true,
    //     sort: false,
    //   },
    // },
    {
      name: 'PaymentPlan',
      label: 'Payment Plan',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'TotalPayments',
      label: 'Total Payments',
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
                  <MenuItem onClick={handleAddIssueBook}>
                    <ModeEditOutlineOutlinedIcon /> Edit
                  </MenuItem>
                  <MenuItem onClick={() => handleDelete(tableMeta.rowData)}>
                    <DeleteOutlineOutlinedIcon /> Delete
                  </MenuItem>
                  {/* <MenuItem
                    onClick={() => {
                      handleOpen()
                      handleClose()
                    }}
                  >
                    <RemoveRedEyeIcon /> View Detail
                  </MenuItem> */}
                  <MenuItem
                    onClick={() => {
                      handleOpenPmntHstry()
                      handleClose()
                    }}
                  >
                    <HistoryIcon /> Payment History
                  </MenuItem>
                  <MenuItem
                  // onClick={() => {
                  //   handleOpenPmntHstry()
                  //   handleClose()
                  // }}
                  >
                    <PrintIcon /> Print
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
      <Button type='button' sx={{ color: '#f23d4d' }} onClick={handleAddIssueBook}>
        + Add Payment
      </Button>
    )
  }

  const options = {
    filterType: 'checkbox' as const,
    customToolbar: HeaderElements,

    tableBodyHeight: '100%',
    print: false,
    filter: false,
  }
  return (
    <>
      <Box sx={{ padding: '24px' }}>
        <div className='mt-10 mb-[1rem] text-[20x] sm:text-[19px] md:text-[23px] lg:text-[26px] text-center font-russoone font-normal'>
          Students Payment list
        </div>
        <MUIDataTable title={''} data={paymentData} columns={columns} options={options} />
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
        transition={Bounce}
      />
    </>
  )
}

export default PaymentList
