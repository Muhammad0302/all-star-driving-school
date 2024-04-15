import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useRouter } from 'next/navigation'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import { addInstructor, getInstructorById, editInstructor } from 'services/room'
import 'react-toastify/dist/ReactToastify.css'
import dayjs from 'dayjs'
const validationSchema = yup.object({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: yup.string().required('Phone Number is required'),
  address: yup.string().required('Address is required'),
  dob: yup.date().required('Date of Birth is required'),
  gender: yup.string().required('Gender is required'),
  drivingLicenseNo: yup.string().required('Driving License No is required'),
  diNumber: yup.string().required('DI Number is required'),
  hiring: yup.string().required('Hiring is required'),
})

const EditInstructor = ({ params }: any) => {
  console.log('The instructor id is:', params)
  const [instructors, setInstructors] = useState([])
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      address: '',
      dob: '',
      gender: '',
      drivingLicenseNo: '',
      diNumber: '',
      hiring: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const data = {
        firstName: values.firstName,
        lastName: values.lastName,
        phone_number: values.phoneNumber,
        email: values.email,
        address: values.address,
        dob: values.dob,
        hired_as: values.hiring,
        gender: values.gender,
        driver_licence_number: values.drivingLicenseNo,
        DI_number: values.diNumber,
      }
      try {
        const res = await editInstructor(data, params.instructorid)
        console.log('Edit instructor api response', res)
        toast.success('Instructor updated successfully', {
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
          router.push('/instructors')
        }, 2000)
      } catch (error: any) {
        toast.error('Error while updating instructor', {
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
    const fetchRoomData = async () => {
      try {
        const res = await getInstructorById(params.instructorid)
        console.log('The instructor data is:', res)
        const instructor = res.instructor
        const parsedDob = dayjs(instructor.dob)
        instructor.firstName = instructor.firstName
        instructor.lastName = instructor.lastName
        instructor.email = instructor.email
        instructor.phoneNumber = instructor.phone_number

        instructor.address = instructor.address
        instructor.dob = parsedDob
        instructor.gender = instructor.gender

        instructor.drivingLicenseNo = instructor.driver_licence_number
        instructor.diNumber = instructor.DI_number
        instructor.hiring = instructor.hired_as

        setInstructors(instructor)
      } catch (error) {
        console.error('Error fetching instructor data:', error)
      }
    }

    fetchRoomData()
  }, [params.instructorid])

  useEffect(() => {
    if (instructors) {
      // @ts-ignore

      formik.setValues(instructors)
    }
  }, [instructors])

  console.log('The room data is:', formik)

  return (
    <div className='mt-[3.5rem]'>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          spacing={3}
          sx={{ marginTop: '5px !important', paddingLeft: '6rem', paddingRight: '6rem' }}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              id='firstName'
              name='firstName'
              label='First Name'
              variant='outlined'
              fullWidth
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
              sx={{ '& fieldset': { borderColor: '#f23d4d !important' } }}
              InputLabelProps={{ focused: false }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='lastName'
              name='lastName'
              label='Last Name'
              variant='outlined'
              fullWidth
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              sx={{ '& fieldset': { borderColor: '#f23d4d !important' } }}
              InputLabelProps={{ focused: false }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='email'
              name='email'
              label='Email'
              variant='outlined'
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{ '& fieldset': { borderColor: '#f23d4d !important' } }}
              InputLabelProps={{ focused: false }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='phoneNumber'
              name='phoneNumber'
              label='Phone Number'
              variant='outlined'
              fullWidth
              type='tel'
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
              helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
              sx={{ '& fieldset': { borderColor: '#f23d4d !important' } }}
              InputLabelProps={{ focused: false }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='address'
              name='address'
              label='Address'
              variant='outlined'
              fullWidth
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              sx={{ '& fieldset': { borderColor: '#f23d4d !important' } }}
              InputLabelProps={{ focused: false }}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label='Date of Birth'
                  value={formik.values.dob}
                  onChange={(newDate) => {
                    formik.setFieldValue('dob', dayjs(newDate).format('YYYY-MM-DD'))
                  }}
                  format='DD/MM/YYYY'
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel
                id='gender-label'
                error={formik.touched.gender && Boolean(formik.errors.gender)}
              >
                Gender
              </InputLabel>
              <Select
                labelId='gender-label'
                id='gender'
                name='gender'
                value={formik.values.gender}
                onChange={(e) => {
                  formik.setFieldValue('gender', e.target.value)
                }}
                error={formik.touched.gender && Boolean(formik.errors.gender)}
                sx={{ '& fieldset': { borderColor: '#f23d4d !important' } }}
              >
                <MenuItem value='male'>Male</MenuItem>
                <MenuItem value='female'>Female</MenuItem>
                <MenuItem value='other'>Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='drivingLicenseNo'
              name='drivingLicenseNo'
              label='Driving License No'
              variant='outlined'
              fullWidth
              value={formik.values.drivingLicenseNo}
              onChange={formik.handleChange}
              error={formik.touched.drivingLicenseNo && Boolean(formik.errors.drivingLicenseNo)}
              helperText={formik.touched.drivingLicenseNo && formik.errors.drivingLicenseNo}
              sx={{ '& fieldset': { borderColor: '#f23d4d !important' } }}
              InputLabelProps={{ focused: false }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='diNumber'
              name='diNumber'
              label='DI Number'
              variant='outlined'
              fullWidth
              value={formik.values.diNumber}
              onChange={formik.handleChange}
              error={formik.touched.diNumber && Boolean(formik.errors.diNumber)}
              helperText={formik.touched.diNumber && formik.errors.diNumber}
              sx={{ '& fieldset': { borderColor: '#f23d4d !important' } }}
              InputLabelProps={{ focused: false }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel
                id='hiring-label'
                error={formik.touched.hiring && Boolean(formik.errors.hiring)}
              >
                Hiring on
              </InputLabel>
              <Select
                labelId='hiring-label'
                id='hiring'
                value={formik.values.hiring}
                onChange={(e) => {
                  formik.setFieldValue('hiring', e.target.value)
                }}
                error={formik.touched.hiring && Boolean(formik.errors.hiring)}
                sx={{ '& fieldset': { borderColor: '#f23d4d !important' } }}
              >
                <MenuItem value='hourly'>Hourly</MenuItem>
                <MenuItem value='daily'>Daily</MenuItem>
                <MenuItem value='monthly'>Monthly</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} container justifyContent='flex-end'>
            <Button
              type='submit'
              variant='contained'
              sx={{
                marginLeft: 'auto',
                background: '#f23d4d',
                color: 'black',
                '&:hover': { background: '#e01527' },
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
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
      </form>
    </div>
  )
}

export default EditInstructor
