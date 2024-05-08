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
import Select, { SelectChangeEvent, selectClasses } from '@mui/material/Select'
import Box from '@mui/material/Box'
import FormHelperText from '@mui/material/FormHelperText'
import { addStudent, getStudentById, editStudent, getAllInstructors } from 'services/room'
import dayjs from 'dayjs'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import './styles.css'

const validationSchema = yup.object({
  registration_for: yup.string().required('Registration type is required'),
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: yup.string().required('Phone Number is required'),
  address: yup.string().required('Address is required'),
  dob: yup.date().required('Date of Birth is required'),
  gender: yup.string().required('Gender is required'),
  licenseNumber: yup.string().required('License Number is required'),
  licenseIssueDate: yup.date().required('License Issue Date is required'),
  licenseExpiryDate: yup.date().required('License Expiry Date is required'),
  courseStartDate: yup.date().required('Course Start Date is required'),
  no_of_lesson: yup.number().required('No of Lesson is required'),
  road_test: yup.string().required('Road test is required'),
  price: yup.number().required('Total price of lesson is required'),
  instructorName: yup.string().required('Instructor is required'),
})

const EditStudent = ({ params }: any) => {
  const router = useRouter()
  const [instructors, setInstructors] = useState([])
  const [instructorName, setInstructorName] = useState('')
  const [assign, setAssign] = useState(null)
  const [instructorId, setInstructorId] = useState(null)
  const [studentData, setStudentData] = useState([])
  const formik = useFormik({
    initialValues: {
      registration_for: '',
      instructorName: '',
      no_of_lesson: '',
      price: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      address: '',
      dob: null,
      gender: '',
      licenseNumber: '',
      road_test: '',
      licenseIssueDate: null,
      licenseExpiryDate: null,
      courseStartDate: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const data = {
        supportive_id: values.registration_for,
        firstName: values.firstName,
        lastName: values.lastName,
        phone_number: values.phoneNumber,
        email: values.email,
        address: values.address,
        dob: values.dob,
        gender: values.gender,
        licence_no: values.licenseNumber,
        licence_issue_date: values.licenseIssueDate,
        licence_expiry_date: values.licenseExpiryDate,
        course_start_date: values.courseStartDate,
        instructor_id: instructorId,
        no_of_lesson: parseInt(values.no_of_lesson),
        price_per_lesson: parseInt(values.price),
        road_test: values.road_test,
      }
      try {
        const res = await editStudent(data, params.studentid)
        console.log('Add Student api response', res)
        toast.success('Student updated Successfully', {
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
          router.push('/students')
        }, 2000)
      } catch (error: any) {
        toast.error('Error while updating student', {
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
        const res = await getStudentById(params.studentid)
        console.log('The student data is:', res)
        const student = res.student
        const Assign = res.assign
        const parsedDob = dayjs(student.dob)
        const parselicence_issue_date = dayjs(student.licence_issue_date)
        const parselicence_expiry_date = dayjs(student.licence_expiry_date)
        const parsecourse_start_date = dayjs(student.courseStartDate)
        student.registration_for = student.supportive_id
        student.firstName = student.firstName
        student.lastName = student.lastName
        student.email = student.email
        student.phoneNumber = student.phone_number
        student.address = student.address
        student.dob = parsedDob
        student.gender = student.gender
        student.licenseNumber = student.licence_no
        student.licenseIssueDate = parselicence_issue_date
        student.licenseExpiryDate = parselicence_expiry_date
        student.courseStartDate = parsecourse_start_date
        student.no_of_lesson = Assign.no_of_lesson
        student.price = Assign.price_per_lesson
        student.road_test = Assign.road_test
        setInstructorId(Assign.instructor_id)
        setStudentData(student)
      } catch (error) {
        console.error('Error fetching student data:', error)
      }
    }

    fetchRoomData()
  }, [params.studentid])

  useEffect(() => {
    if (studentData) {
      // @ts-ignore

      formik.setValues(studentData)
    }
  }, [studentData])

  useEffect(() => {
    const fetchInstructorData = async () => {
      try {
        const res = await getAllInstructors()
        // console.log('The instructor data is:', res)
        const instructor = res.instructors
        setInstructors(instructor)
      } catch (error) {
        console.error('Error fetching instructor data:', error)
      }
    }

    fetchInstructorData()
  }, [])

  useEffect(() => {
    if (instructors.length > 0 && instructorId) {
      const selectedInstructor: any = instructors.find(
        (instructor: any) => instructor._id === instructorId,
      )
      if (selectedInstructor) {
        const instructor = `${selectedInstructor.firstName} ${selectedInstructor.lastName}`
        setInstructorName(instructor)
        formik.setFieldValue('instructorName', instructor)
      }
    }
  }, [instructorId, instructors])

  const formatLicenseNumber = (value: any) => {
    // Remove any existing hyphens and limit input to 17 characters
    const formattedValue = value.replace(/-/g, '').substr(0, 15)
    // Add hyphens after the 5th and 11th characters
    return formattedValue.replace(/(.{5})(.{1,6})/, '$1-$2').replace(/(.{11})(.{1,6})/, '$1-$2')
  }

  console.log('formik values is:', formik.values)

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
              id='registration_for'
              name='registration_for'
              label='Student ID'
              variant='outlined'
              fullWidth
              sx={{
                '& fieldset': { borderColor: '#f23d4d !important' },
              }}
              InputLabelProps={{
                focused: false,
              }}
              value={formik.values.registration_for}
              onChange={formik.handleChange}
              error={formik.touched.registration_for && Boolean(formik.errors.registration_for)}
              helperText={
                formik.touched.registration_for && (formik.errors.registration_for as any)
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id='firstName'
              name='firstName'
              label='First Name'
              variant='outlined'
              fullWidth
              sx={{
                '& fieldset': { borderColor: '#f23d4d !important' },
              }}
              InputLabelProps={{
                focused: false,
              }}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && (formik.errors.firstName as any)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id='lastName'
              name='lastName'
              label='Last Name'
              variant='outlined'
              fullWidth
              sx={{
                '& fieldset': { borderColor: '#f23d4d !important' },
              }}
              InputLabelProps={{
                focused: false,
              }}
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && (formik.errors.lastName as any)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id='email'
              name='email'
              label='Email'
              variant='outlined'
              fullWidth
              sx={{
                '& fieldset': { borderColor: '#f23d4d !important' },
              }}
              InputLabelProps={{
                focused: false,
              }}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && (formik.errors.email as any)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id='phoneNumber'
              name='phoneNumber'
              label='Phone Number'
              variant='outlined'
              fullWidth
              sx={{
                '& fieldset': { borderColor: '#f23d4d !important' },
              }}
              InputLabelProps={{
                focused: false,
              }}
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
              helperText={formik.touched.phoneNumber && (formik.errors.phoneNumber as any)}
              inputProps={{
                inputMode: 'numeric',
                onKeyDown: (event) => {
                  const numericKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
                  if (
                    !numericKeys.includes(event.key) &&
                    event.key !== 'Backspace' &&
                    event.key !== 'Delete'
                  ) {
                    event.preventDefault() // Prevent input of non-numeric characters
                  }
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id='address'
              name='address'
              label='Address'
              variant='outlined'
              fullWidth
              sx={{
                '& fieldset': { borderColor: '#f23d4d !important' },
              }}
              InputLabelProps={{
                focused: false,
              }}
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && (formik.errors.address as any)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='licenseNumber'
              name='licenseNumber'
              label='License Number'
              variant='outlined'
              fullWidth
              sx={{
                '& fieldset': { borderColor: '#f23d4d !important' },
              }}
              InputLabelProps={{
                focused: false,
              }}
              value={formik.values.licenseNumber}
              // onChange={formik.handleChange}
              onChange={(e) => {
                const formattedValue = formatLicenseNumber(e.target.value)
                formik.setFieldValue('licenseNumber', formattedValue)
              }}
              error={formik.touched.licenseNumber && Boolean(formik.errors.licenseNumber)}
              helperText={formik.touched.licenseNumber && (formik.errors.licenseNumber as any)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id='gender-label'>Gender</InputLabel>
              <Select
                labelId='gender-label'
                id='gender'
                value={formik.values.gender}
                onChange={(e) => formik.setFieldValue('gender', e.target.value)}
                label='Gender'
              >
                <MenuItem value='male'>Male</MenuItem>
                <MenuItem value='female'>Female</MenuItem>
                <MenuItem value='other'>Other</MenuItem>
              </Select>
              {formik.touched.gender && Boolean(formik.errors.gender) && (
                <FormHelperText sx={{ color: '#d32f2f' }}>{formik.errors.gender}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='no_of_lesson'
              name='no_of_lesson'
              label='No of Lesson'
              variant='outlined'
              fullWidth
              sx={{
                '& fieldset': { borderColor: '#f23d4d !important' },
              }}
              InputLabelProps={{
                focused: false,
              }}
              value={formik.values.no_of_lesson}
              onChange={formik.handleChange}
              error={formik.touched.no_of_lesson && Boolean(formik.errors.no_of_lesson)}
              helperText={formik.touched.no_of_lesson && (formik.errors.no_of_lesson as any)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='price'
              name='price'
              label='Total Price Of Lesson'
              variant='outlined'
              fullWidth
              sx={{
                '& fieldset': { borderColor: '#f23d4d !important' },
              }}
              InputLabelProps={{
                focused: false,
              }}
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && (formik.errors.price as any)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel
                  id='demo-simple-select-label'
                  error={formik.touched.road_test && Boolean(formik.errors.road_test)}
                >
                  Road Test
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={formik.values.road_test}
                  label='Package'
                  onChange={(e) => {
                    formik.setFieldValue('road_test', e.target.value)
                  }}
                >
                  <MenuItem value={'yes'}>Yes</MenuItem>
                  <MenuItem value={'no'}>No</MenuItem>
                </Select>
                {formik.touched.road_test && Boolean(formik.errors.road_test) && (
                  <FormHelperText sx={{ color: '#d32f2f' }}>
                    {formik.errors.road_test}
                  </FormHelperText>
                )}
              </FormControl>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel
                  id='demo-simple-select-label'
                  error={formik.touched.instructorName && Boolean(formik.errors.instructorName)}
                >
                  Assign Instructor
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={formik.values.instructorName}
                  label='Instructor Name'
                  onChange={(e) => {
                    formik.setFieldValue('instructorName', e.target.value)
                    const [selectedFirstName, selectedLastName] = e.target.value.split(' ')

                    const selectedInstructor: any = instructors.find(
                      (instructor: any) =>
                        instructor.firstName === selectedFirstName &&
                        instructor.lastName === selectedLastName,
                    )
                    if (selectedInstructor) {
                      setInstructorId(selectedInstructor._id)
                    }
                  }}
                >
                  {instructors?.map((instructor: any, index) => (
                    <MenuItem key={index} value={`${instructor.firstName} ${instructor.lastName}`}>
                      {`${instructor.firstName} ${instructor.lastName}`}
                    </MenuItem>
                  ))}
                </Select>

                {formik.touched.instructorName && Boolean(formik.errors.instructorName) && (
                  <FormHelperText sx={{ color: '#d32f2f' }}>
                    {formik.errors.instructorName}
                  </FormHelperText>
                )}
              </FormControl>
            </Box>
          </Grid>

          <Grid item xs={12} sm={3} style={{ marginTop: '-8px' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label='Date of Birth'
                  format='YYYY/MM/DD'
                  value={formik.values.dob}
                  onChange={(newDate) => {
                    formik.setFieldValue('dob', dayjs(newDate).format('YYYY-MM-DD'))
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={3} style={{ marginTop: '-8px' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label='Course Start Date'
                  format='YYYY/MM/DD'
                  value={formik.values.courseStartDate}
                  onChange={(newDate) => {
                    formik.setFieldValue('courseStartDate', dayjs(newDate).format('YYYY-MM-DD'))
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={3} style={{ marginTop: '-8px' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label='License Issue Date'
                  format='YYYY/MM/DD'
                  value={formik.values.licenseIssueDate}
                  onChange={(newDate) => {
                    formik.setFieldValue('licenseIssueDate', dayjs(newDate).format('YYYY-MM-DD'))
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={3} style={{ marginTop: '-8px' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label='License Expiry Date'
                  format='YYYY/MM/DD'
                  value={formik.values.licenseExpiryDate}
                  onChange={(newDate) => {
                    formik.setFieldValue('licenseExpiryDate', dayjs(newDate).format('YYYY-MM-DD'))
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} container justifyContent='flex-end'>
            <Button
              type='submit'
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

export default EditStudent
