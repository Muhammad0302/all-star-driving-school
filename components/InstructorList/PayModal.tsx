import React, { useState, useEffect } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Typography from '@mui/material/Typography'
import { TextField, Box } from '@mui/material'
import MUIDataTable from 'mui-datatables'
import { Button } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { useRouter } from 'next/navigation'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import { addInstructorPayment } from 'services/room'
import 'react-toastify/dist/ReactToastify.css'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Grid } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import './styles.css'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  minHeight: '29%',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 3,
}
interface ViewDetailInput {
  open: boolean
  handleClose: () => void
  rowData: any
}
const validationSchema = yup.object({
  ChequeNo: yup.string().required('Cheque no is required'),
  issueDate: yup.string().required('Issue Date is required'),
  rate: yup.string().required('Rate is required'),
  noOfLessonToPay: yup.string().required('No of lesson to pay is required'),
})

const PayModal = ({ open, handleClose, rowData }: ViewDetailInput) => {
  const router = useRouter()
  const [totalCompensation, setTotalCompensation] = useState('')
  const [compensation, setCompensation] = useState('')
  const formik = useFormik({
    initialValues: {
      ChequeNo: '',
      rate: '',
      noOfLessonToPay: '',
      issueDate: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      console.log(values)
      const compensationValue = parseFloat(compensation.replace('$', ''))
      const rateValue = parseFloat(values.rate.replace('$', ''))
      const noOfLessonToPayValue = parseFloat(values.noOfLessonToPay)
      const data = {
        chaqueNo: values.ChequeNo,
        rate: values.rate,
        noOfLessonToPay: noOfLessonToPayValue,
        instruct_id: rowData[0],
        issueDate: values.issueDate,
        tax: '25%',
        compensation: compensationValue,
      }
      try {
        const res = await addInstructorPayment(data)
        console.log('Add Instructor payment api response', res)

        toast.success('Pay successfully', {
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
        handleClose()
        formik.resetForm()

        // setTimeout(() => {
        //   // router.push('/report')
        //   // router.push('/instructors')
        //   handleClose()
        //    formik.resetForm()
        // }, 2000)
      } catch (error: any) {
        toast.error('Error while paying', {
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
    },
  })

  useEffect(() => {
    if (formik.values.rate) {
      const totalBeforeTax = parseFloat(formik.values.rate) * rowData[1]
      const tax = totalBeforeTax * 0.25 // 25% tax
      const totalWithTax = totalBeforeTax - tax
      setTotalCompensation(`$${totalWithTax}`)
    } else {
      setTotalCompensation('')
    }
  }, [formik.values.rate])
  useEffect(() => {
    if (formik.values.rate && formik.values.noOfLessonToPay) {
      const totalBeforeTax =
        parseFloat(formik.values.rate) * parseFloat(formik.values.noOfLessonToPay)
      const tax = totalBeforeTax * 0.25 // 25% tax
      const totalWithTax = totalBeforeTax - tax
      setCompensation(`$${totalWithTax}`)
    } else {
      setCompensation('')
    }
  }, [formik.values.rate, formik.values.noOfLessonToPay])

  console.log('the formik values is:', formik.values)
  console.log('The row data in paymodal:', rowData)
  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <CloseIcon
              sx={{ cursor: 'pointer', position: 'absolute', top: 15, right: 20 }}
              onClick={handleClose}
            />
            <div className='container flex justify-between mt-6'>
              <table className='w-full border-collapse'>
                <thead>
                  <tr className='font-bold' style={{ backgroundColor: '#E5E7EB' }}>
                    <th className='border py-2'>Name</th>
                    <th className='border py-2'>Phone Number</th>
                    <th className='border py-2'>Address</th>
                    <th className='border py-2'>Hire As</th>
                    <th className='border py-2'>None-paid Lessons</th>
                    <th className='border py-2'>Tax</th>
                    <th className='border py-2'>Total Compensation</th>
                  </tr>
                </thead>
                <tbody>
                  {rowData == null ? (
                    <></>
                  ) : (
                    <>
                      <tr className='font-medium' style={{ borderBottom: '1px solid #E5E7EB' }}>
                        <td className='border py-2 text-center'>{rowData[2]}</td>
                        <td className='border py-2 text-center'>{rowData[3]}</td>
                        <td className='border py-2 text-center'>{rowData[5]}</td>
                        <td className='border py-2 text-center'>{rowData[7]}</td>
                        <td className='border py-2 text-center'>{rowData[1]}</td>
                        <td className='border py-2 text-center'>25%</td>
                        <td className='border py-2 text-center'>{totalCompensation}</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>

            <div className='mr-[2.3rem] ml-[2.3rem]'>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3} sx={{ marginTop: '8px !important' }}>
                  <Grid item xs={12} sm={3} sx={{ marginTop: '8px !important' }}>
                    <TextField
                      id='rate'
                      name='rate'
                      label='Rate'
                      variant='outlined'
                      fullWidth
                      sx={{
                        '& fieldset': { borderColor: '#f23d4d !important' },
                      }}
                      InputLabelProps={{
                        focused: false,
                      }}
                      type='text'
                      value={formik.values.rate}
                      onChange={formik.handleChange}
                      onKeyDown={(event) => {
                        event.stopPropagation()
                      }}
                      error={formik.touched.rate && Boolean(formik.errors.rate)}
                      helperText={formik.touched.rate && (formik.errors.rate as any)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={3} sx={{ marginTop: '8px !important' }}>
                    <TextField
                      id='noOfLessonToPay'
                      name='noOfLessonToPay'
                      label='No of Lesson To Pay'
                      variant='outlined'
                      fullWidth
                      sx={{
                        '& fieldset': { borderColor: '#f23d4d !important' },
                      }}
                      InputLabelProps={{
                        focused: false,
                      }}
                      type='text'
                      value={formik.values.noOfLessonToPay}
                      onChange={formik.handleChange}
                      onKeyDown={(event) => {
                        event.stopPropagation()
                      }}
                      error={
                        formik.touched.noOfLessonToPay && Boolean(formik.errors.noOfLessonToPay)
                      }
                      helperText={
                        formik.touched.noOfLessonToPay && (formik.errors.noOfLessonToPay as any)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={3} sx={{ marginTop: '8px !important' }}>
                    <TextField
                      id='ChequeNo'
                      name='ChequeNo'
                      label='Cheque No'
                      variant='outlined'
                      fullWidth
                      sx={{
                        '& fieldset': { borderColor: '#f23d4d !important' },
                      }}
                      InputLabelProps={{
                        focused: false,
                      }}
                      type='text'
                      value={formik.values.ChequeNo}
                      onChange={formik.handleChange}
                      onKeyDown={(event) => {
                        event.stopPropagation()
                      }}
                      error={formik.touched.ChequeNo && Boolean(formik.errors.ChequeNo)}
                      helperText={formik.touched.ChequeNo && (formik.errors.ChequeNo as any)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3} sx={{ marginTop: '0px' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker
                          label='Issue Date'
                          value={formik.values.issueDate}
                          onChange={(newDate) => {
                            formik.setFieldValue('issueDate', newDate)
                          }}
                          // @ts-ignore
                          renderInput={(startProps: any) => <TextField {...startProps} />}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={4} sx={{ marginTop: '24px' }}>
                    <Typography>
                      {' '}
                      <span style={{ fontWeight: 'bolder' }}>Compensation:</span> &nbsp; &nbsp;{' '}
                      {compensation}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ marginTop: '0px' }}></Grid>
                  <Grid
                    item
                    xs={2}
                    sm={2}
                    sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
                  >
                    <Button
                      type='submit'
                      variant='contained'
                      // onClick={handleClose}
                      color='primary'
                      sx={{
                        marginLeft: 'auto',
                        background: '#f23d4d',
                        height: '45px',
                        color: 'black',
                        '&:hover': {
                          background: '#e01527',
                        },
                      }}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Box>
        </Fade>
      </Modal>
      {/* <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
        transition={Bounce} // Specify Bounce as the transition prop value
      /> */}
    </div>
  )
}

export default PayModal
