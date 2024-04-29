import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Grid, TextField, Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getAllInstructors, addprivatelesson } from 'services/room'
import Box from '@mui/material/Box'
import FormHelperText from '@mui/material/FormHelperText'
import './styles.css'
const validationSchema = yup.object({
  studentName: yup.string().required('Student Name is required'),
  instructorName: yup.string().required('Instructor Name is required'),
  initialLessonsRequested: yup.string().required('Initial Lessons Requested is required'),
  roadTestRequested: yup.string(),
})
const AddPrivateLesson = () => {
  const [instructors, setInstructors] = useState([])
  const [instructorId, setInstructorId] = useState(null)
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      studentName: '',
      instructorName: '',
      initialLessonsRequested: '',
      roadTestRequested: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      const data = {
        instructor_id: instructorId,
        student_name: values.studentName,
        road_test_req: values.roadTestRequested,
        initial_lesson_requested: values.initialLessonsRequested,
      }
      try {
        const res = await addprivatelesson(data)
        console.log('Private lesson api response', res)
        toast.success('Private Lesson added successfully', {
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
          router.push('/pvtlssnasgndtoinstrs')
        }, 2000)
      } catch (error: any) {
        toast.error('Error while adding private lesson', {
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
    const fetchInstructorData = async () => {
      try {
        const res = await getAllInstructors()
        console.log('The instructor data is:', res)
        const instructor = res.instructors
        setInstructors(instructor)
      } catch (error) {
        console.error('Error fetching instructor data:', error)
      }
    }

    fetchInstructorData()
  }, [])
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
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel
                  id='demo-simple-select-label'
                  error={formik.touched.instructorName && Boolean(formik.errors.instructorName)}
                >
                  Instructor
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
          <Grid item xs={12} sm={6}>
            <TextField
              id='studentName'
              name='studentName'
              label='Student Name'
              variant='outlined'
              fullWidth
              sx={{
                '& fieldset': { borderColor: '#f23d4d !important' },
              }}
              InputLabelProps={{
                focused: false,
              }}
              type='text'
              value={formik.values.studentName}
              onChange={formik.handleChange}
              onKeyDown={(event) => {
                event.stopPropagation()
              }}
              error={formik.touched.studentName && Boolean(formik.errors.studentName)}
              helperText={formik.touched.studentName && (formik.errors.studentName as any)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id='initialLessonsRequested'
              name='initialLessonsRequested'
              label='Initial Lessons Requested'
              variant='outlined'
              fullWidth
              sx={{
                '& fieldset': { borderColor: '#f23d4d !important' },
              }}
              InputLabelProps={{
                focused: false,
              }}
              type='text'
              value={formik.values.initialLessonsRequested}
              onChange={formik.handleChange}
              onKeyDown={(event) => {
                event.stopPropagation()
              }}
              error={
                formik.touched.initialLessonsRequested &&
                Boolean(formik.errors.initialLessonsRequested)
              }
              helperText={
                formik.touched.initialLessonsRequested &&
                (formik.errors.initialLessonsRequested as any)
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel
                  id='demo-simple-select-label'
                  error={
                    formik.touched.roadTestRequested && Boolean(formik.errors.roadTestRequested)
                  }
                >
                  Road Test Completed
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={formik.values.roadTestRequested}
                  label='Package'
                  onChange={(e) => {
                    formik.setFieldValue('roadTestRequested', e.target.value)
                  }}
                >
                  <MenuItem value={'yes'}>Yes</MenuItem>
                  <MenuItem value={'no'}>No</MenuItem>
                </Select>

                {!!(formik.touched.roadTestRequested && formik.errors.roadTestRequested) && (
                  <FormHelperText sx={{ color: '#d32f2f' }}>
                    {formik.errors.roadTestRequested as string}
                  </FormHelperText>
                )}
              </FormControl>
            </Box>
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <TextField
              id='lessonsCompleted'
              name='lessonsCompleted'
              label='Number of Lessons Completed'
              variant='outlined'
              fullWidth
              sx={{
                '& fieldset': { borderColor: '#f23d4d !important' },
              }}
              InputLabelProps={{
                focused: false,
              }}
              type='text'
              value={formik.values.lessonsCompleted}
              onChange={formik.handleChange}
              onKeyDown={(event) => {
                event.stopPropagation()
              }}
              error={formik.touched.lessonsCompleted && Boolean(formik.errors.lessonsCompleted)}
              helperText={
                formik.touched.lessonsCompleted && (formik.errors.lessonsCompleted as any)
              }
            />
          </Grid> */}

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

export default AddPrivateLesson
