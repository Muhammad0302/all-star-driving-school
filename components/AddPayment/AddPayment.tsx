import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Grid, TextField, Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { addPayment, getAssignedStudent, getPackageByStdId, getPaymentByStdId } from 'services/room'
import dayjs from 'dayjs'
import Box from '@mui/material/Box'
import FormHelperText from '@mui/material/FormHelperText'
import './styles.css'
const validationSchema = yup.object({
  studentName: yup.string().required('Student is required'),
  amount: yup.string().required('Amount is required'),
  payementType: yup.string().required('Payment type is required'),
  date: yup.string(),
})
const AddPayment = () => {
  const router = useRouter()
  const [formDisabled, setFormDisabled] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [students, setStudents] = useState([])
  const [studentId, setStudentId] = useState(null)
  const [totalAmount, setTotalAmount] = useState('')
  const [amountPaid, setAmountPaid] = useState('')
  const [remainingAmount, setRemainingAmount] = useState('')
  const formik = useFormik({
    initialValues: {
      studentName: '',
      amount: '',
      payementType: '',
      date: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      console.log(values)
      const data = {
        std_id: studentId,
        amount: values.amount,
        payment_method: values.payementType,
        date: values.date,
      }
      try {
        const res = await addPayment(data)
        console.log('Assign package api response', res)
        toast.success('Payment added successfully', {
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
        setTimeout(() => {
          router.push('/payments')
        }, 2000)
      } catch (error: any) {
        toast.error('Error while adding payment', {
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
    const fetchStudentData = async () => {
      try {
        const res = await getAssignedStudent()
        console.log('The student data is:', res)
        const students = res.assignedStudents
        setStudents(students)
      } catch (error) {
        console.error('Error fetching students data:', error)
      }
    }
    fetchStudentData()
  }, [])

  // useEffect(() => {
  //   if (studentId) {
  //     setTotalAmount(`$862`)
  //     setAmountPaid(`$350`)
  //     setRemainingAmount(`$512`)
  //   } else {
  //     setTotalAmount('')
  //     setAmountPaid('')
  //     setRemainingAmount('')
  //   }
  // }, [studentId])

  useEffect(() => {
    const fetchAssignByStdId = async () => {
      try {
        if (studentId !== null) {
          const res = await getPackageByStdId(studentId)
          const assignInfo: any = res.packageAssigToStud

          // const totalAmount: any = assignInfo.no_of_lesson * assignInfo.price_per_lesson
          const totalAmount: any = assignInfo.price_per_lesson
          setTotalAmount(totalAmount)
          // formik.setFieldValue('amount', assignInfo.no_of_lesson * assignInfo.price_per_lesson)
          // setLessonCompleted(assignInfo.no_of_lesson_completed)
          // const remainingLesson: any = assignInfo.no_of_lesson - assignInfo.no_of_lesson_completed
          // setRemainingLesson(remainingLesson)
        }
      } catch (error) {
        console.error('Error fetching students data:', error)
      }
    }

    const fetchPaymentSum = async () => {
      try {
        if (studentId !== null) {
          const res = await getPaymentByStdId(studentId)
          // console.log('The payment sum is:', res)
          setAmountPaid(res.paidAmount)
        }
      } catch (error) {
        console.error('Error fetching students data:', error)
      }
    }

    fetchPaymentSum()
    fetchAssignByStdId()
  }, [studentId])

  useEffect(() => {
    if (totalAmount && amountPaid) {
      const remainingAmount: any = parseInt(totalAmount) - parseInt(amountPaid)
      setRemainingAmount(remainingAmount)
    }
  }, [amountPaid, totalAmount])

  useEffect(() => {
    if (parseInt(formik.values.amount) > parseInt(remainingAmount)) {
      setFormDisabled(true)
      setDisabled(true)
    } else {
      setFormDisabled(false)
      setDisabled(false)
    }
  }, [formik.values.amount, remainingAmount])

  console.log('the formik values is:', formik.values)
  console.log('The amount paid is:', formDisabled, disabled)
  return (
    <div className='mt-[3.5rem]'>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          spacing={3}
          sx={{ marginTop: '5px !important', paddingLeft: '6rem', paddingRight: '6rem' }}
        >
          <Grid item xs={12} sm={6}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel
                  id='demo-simple-select-label'
                  error={formik.touched.studentName && Boolean(formik.errors.studentName)}
                >
                  Student
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={formik.values.studentName}
                  label='Student Name'
                  onChange={(e) => {
                    formik.setFieldValue('studentName', e.target.value)

                    const selectedStudent: any = students.find(
                      (student: any) => student?.student?._id === e.target.value,
                    )
                    console.log('The selected student id is:', selectedStudent)
                    if (selectedStudent) {
                      setStudentId(selectedStudent.student?._id)
                    }

                    setTotalAmount('')
                    setAmountPaid('')
                    setRemainingAmount('')
                  }}
                >
                  {students?.map((student: any, index) => (
                    <MenuItem key={index} value={student?.student?._id}>
                      {`${student.student.firstName} ${student.student.lastName}`}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.studentName && Boolean(formik.errors.studentName) && (
                  <FormHelperText sx={{ color: '#d32f2f' }}>
                    {formik.errors.studentName}
                  </FormHelperText>
                )}
              </FormControl>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id='totalAmount'
              name='totalAmount'
              label='Total Amount'
              variant='outlined'
              fullWidth
              sx={{
                '& fieldset': { borderColor: '#f23d4d !important' },
              }}
              InputLabelProps={{
                focused: false,
              }}
              inputProps={{
                readOnly: true,
              }}
              type='text'
              value={totalAmount ? `$${totalAmount}` : ''}
              onChange={(event: any) => setTotalAmount(event.target.value)}
              onKeyDown={(event) => {
                event.stopPropagation()
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='amountPaid'
              name='amountPaid'
              label='Amount Paid'
              variant='outlined'
              fullWidth
              inputProps={{
                readOnly: true,
              }}
              sx={{
                '& fieldset': { borderColor: '#f23d4d !important' },
              }}
              InputLabelProps={{
                focused: false,
              }}
              type='text'
              // @ts-ignore
              value={amountPaid ? `$${amountPaid}` : amountPaid === 0 ? `$0` : ''}
              onChange={(event: any) => setAmountPaid(event.target.value)}
              onKeyDown={(event) => {
                event.stopPropagation()
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='remainingAmount'
              name='remainingAmount'
              label='Remaining Amount'
              variant='outlined'
              fullWidth
              inputProps={{
                readOnly: true,
              }}
              sx={{
                '& fieldset': { borderColor: '#f23d4d !important' },
              }}
              InputLabelProps={{
                focused: false,
              }}
              type='text'
              // value={amountPaid ? `$${amountPaid}` : amountPaid === 0 ? `$0` : ''}

              value={
                // @ts-ignore
                amountPaid === 0 ? `$${totalAmount}` : remainingAmount ? `$${remainingAmount}` : ''
              }
              onChange={(event: any) => setRemainingAmount(event.target.value)}
              onKeyDown={(event) => {
                event.stopPropagation()
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id='amount'
              name='amount'
              label='Amount to Pay($)'
              variant='outlined'
              fullWidth
              sx={{
                '& fieldset': { borderColor: '#f23d4d !important' },
              }}
              InputLabelProps={{
                focused: false,
              }}
              type='text'
              // value={formik.values.amount}
              onChange={formik.handleChange}
              value={formik.values.amount}
              onKeyDown={(event) => {
                event.stopPropagation()
              }}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && (formik.errors.amount as any)}
            />
            {formDisabled && disabled && (
              <>
                <FormHelperText sx={{ color: '#d32f2f' }}>
                  Amount to pay should be less than or equal to remaining amount
                </FormHelperText>
              </>
            )}{' '}
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel
                id='payementType-label'
                error={formik.touched.payementType && Boolean(formik.errors.payementType)}
              >
                Payment Type
              </InputLabel>
              <Select
                labelId='payementType-label'
                id='payementType'
                value={formik.values.payementType}
                onChange={(e) => {
                  formik.setFieldValue('payementType', e.target.value)
                }}
                error={formik.touched.payementType && Boolean(formik.errors.payementType)}
                sx={{ '& fieldset': { borderColor: '#f23d4d !important' } }}
              >
                <MenuItem value='cash'>Cash</MenuItem>
                <MenuItem value='credit_card'>Credit Card</MenuItem>
                <MenuItem value='debit_card'>Debit Card</MenuItem>
                <MenuItem value='bank_transfer'>Bank Transfer</MenuItem>
              </Select>
              {formik.touched.payementType && Boolean(formik.errors.payementType) && (
                <FormHelperText sx={{ color: '#d32f2f' }}>
                  {formik.errors.payementType}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3} sx={{ marginTop: '0px' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label='Date'
                  value={formik.values.date}
                  onChange={(newDate) => {
                    formik.setFieldValue('date', newDate)
                  }}
                  // onChange={(newDate) => {
                  //   formik.setFieldValue('date', dayjs(newDate).format('YYYY-MM-DD'))
                  // }}
                  // @ts-ignore
                  renderInput={(startProps: any) => <TextField {...startProps} />}
                  format='DD/MM/YYYY'
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} container justifyContent='flex-end'>
            <Button
              type='submit'
              // onClick={() => setError(true)}
              // disabled={loading}
              variant='contained'
              color='primary'
              sx={{
                marginLeft: 'auto',
                background: '#f23d4d',
                color: 'black',
                '&:hover': {
                  background: '#e01527',
                },
              }}
              disabled={formDisabled}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
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
    </div>
  )
}

export default AddPayment
