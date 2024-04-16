import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Grid, TextField, Button } from '@mui/material'
import Box from '@mui/material/Box'
import { useRouter } from 'next/navigation'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import {
  getAllInstructors,
  getAllStudents,
  getPackageByStdId,
  addLessonCompletion,
} from 'services/room'
import FormHelperText from '@mui/material/FormHelperText'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './styles.css'
const validationSchema = yup.object({
  instructorName: yup.string().required('Instructor Name is required'),
  studentName: yup.string().required('Student is required'),
  // package: yup.string().required('Package is required'),
  noOfLessonsCompleted: yup.string().required('Lessons Completed is required'),
  roadTestCompleted: yup.string().required('Road test is required'),
  totalLesson: yup.string(),
})
const AddLessonCompletion = () => {
  const [roadTest, setRoadTest] = React.useState('')
  const [students, setStudents] = useState([])
  const [studentId, setStudentId] = useState(null)
  const [instructors, setInstructors] = useState([])
  const [instructorId, setInstructorId] = useState(null)
  const handleChange = (event: SelectChangeEvent) => {
    setRoadTest(event.target.value as string)
  }

  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      totalLesson: '',
      studentName: '',
      instructorName: '',
      noOfLessonsCompleted: '',
      roadTestCompleted: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values)
      // router.push('/stdsintrslssncompleted')

      const data = {
        instruct_id: instructorId,
        std_id: studentId,
        no_of_lesson_compeleted: values.noOfLessonsCompleted,
        road_test_completion: values.roadTestCompleted,
        total_lesson: values.totalLesson,
      }
      try {
        const res = await addLessonCompletion(data)
        console.log('lesson completion api response', res)
        toast.success('Added lesson completion successfully', {
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
          router.push('/stdsintrslssncompleted')
        }, 2000)
      } catch (error: any) {
        toast.error('Error while completing lesson', {
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
        const res = await getAllStudents()
        const students = res.students
        setStudents(students)
      } catch (error) {
        console.error('Error fetching students data:', error)
      }
    }
    const fetchInstructorData = async () => {
      try {
        const res = await getAllInstructors()
        const instructor = res.instructors
        setInstructors(instructor)
      } catch (error) {
        console.error('Error fetching instructor data:', error)
      }
    }
    fetchStudentData()
    fetchInstructorData()
  }, [])
  useEffect(() => {
    const fetchPackageByStdId = async () => {
      try {
        const res = await getPackageByStdId(studentId)
        console.log('The package data is:', res)
        const packags = res.packageAssigToStud[0]

        formik.setFieldValue('totalLesson', packags.package_id.no_of_lesson)
      } catch (error) {
        console.error('Error fetching students data:', error)
      }
    }
    fetchPackageByStdId()
  }, [studentId])

  // added here ..
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
                    const [selectedFirstName, selectedLastName] = e.target.value.split(' ')

                    const selectedStudent: any = students.find(
                      (student: any) =>
                        student.firstName === selectedFirstName &&
                        student.lastName === selectedLastName,
                    )
                    if (selectedStudent) {
                      setStudentId(selectedStudent._id)
                    }
                  }}
                >
                  {students?.map((student: any, index) => (
                    <MenuItem key={index} value={`${student.firstName} ${student.lastName}`}>
                      {`${student.firstName} ${student.lastName}`}
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
          {/* <Grid item xs={12} sm={6}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel
                  id='demo-simple-select-label'
                  error={formik.touched.package && Boolean(formik.errors.package)}
                >
                  Package
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={formik.values.package}
                  label='Package'
                  onChange={(e) => {
                    formik.setFieldValue('package', e.target.value)
                  }}
                >
                  <MenuItem value={'Package #1'}>Package #1</MenuItem>
                  <MenuItem value={'Package #2'}>Package #2</MenuItem>
                  <MenuItem value={'Package #3'}>Package #3</MenuItem>
                  <MenuItem value={'Package #2 (Online)'}>Package #2 (Online)</MenuItem>
                  <MenuItem value={'Package #3 (Online)'}>Package #3 (Online)</MenuItem>
                  <MenuItem value={'1 Hour Lesson'}>1 Hour Lesson</MenuItem>
                  <MenuItem value={'2 Hours And Road Test'}>2 Hours And Road Test</MenuItem>
                  <MenuItem value={'3 Hours Lesson + Road Test'}>
                    3 Hours Lesson + Road Test
                  </MenuItem>
                  <MenuItem value={'4 Hours Lesson + Road Test'}>
                    4 Hours Lesson + Road Test
                  </MenuItem>
                  <MenuItem value={'5 hour lesson + Road Test'}>5 hour lesson + Road Test</MenuItem>
                  <MenuItem value={'10 hour lesson + Road Test'}>
                    10 hour lesson + Road Test
                  </MenuItem>
                  <MenuItem value={'1 Hour Lesson'}>1 Hour Lesson</MenuItem>
                  <MenuItem value={'2 Hours And Road Test'}>2 Hours And Road Test</MenuItem>
                  <MenuItem value={'3 Hours Lesson + Road Test'}>
                    3 Hours Lesson + Road Test
                  </MenuItem>
                  <MenuItem value={'4 Hours Lesson + Road Test'}>
                    4 Hours Lesson + Road Test
                  </MenuItem>
                  <MenuItem value={'5 hour lesson + Road Test'}>5 hour lesson + Road Test</MenuItem>
                </Select>
                {formik.touched.package && Boolean(formik.errors.package) && (
                  <FormHelperText sx={{ color: '#d32f2f' }}>{formik.errors.package}</FormHelperText>
                )}
              </FormControl>
            </Box>
          </Grid> */}

          <Grid item xs={12} sm={6}>
            <TextField
              id='totalLesson'
              name='totalLesson'
              label='Total no of Lesson'
              variant='outlined'
              fullWidth
              value={formik.values.totalLesson}
              onChange={formik.handleChange}
              error={formik.touched.totalLesson && Boolean(formik.errors.totalLesson)}
              helperText={formik.touched.totalLesson && formik.errors.totalLesson}
              sx={{
                '& fieldset': { borderColor: '#f23d4d !important' },
              }}
              InputLabelProps={{
                focused: false,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id='noOfLessonsCompleted'
              name='noOfLessonsCompleted'
              label='No of Lessons Completed'
              variant='outlined'
              fullWidth
              value={formik.values.noOfLessonsCompleted}
              onChange={formik.handleChange}
              error={
                formik.touched.noOfLessonsCompleted && Boolean(formik.errors.noOfLessonsCompleted)
              }
              helperText={formik.touched.noOfLessonsCompleted && formik.errors.noOfLessonsCompleted}
              sx={{
                '& fieldset': { borderColor: '#f23d4d !important' },
              }}
              InputLabelProps={{
                focused: false,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel
                  id='demo-simple-select-label'
                  error={
                    formik.touched.roadTestCompleted && Boolean(formik.errors.roadTestCompleted)
                  }
                >
                  Road Test Completed
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={formik.values.roadTestCompleted}
                  label='Package'
                  onChange={(e) => {
                    formik.setFieldValue('roadTestCompleted', e.target.value)
                  }}
                >
                  <MenuItem value={'yes'}>Yes</MenuItem>
                  <MenuItem value={'no'}>No</MenuItem>
                </Select>
                {formik.touched.roadTestCompleted && Boolean(formik.errors.roadTestCompleted) && (
                  <FormHelperText sx={{ color: '#d32f2f' }}>
                    {formik.errors.roadTestCompleted}
                  </FormHelperText>
                )}
              </FormControl>
            </Box>
          </Grid>

          <Grid item xs={12} container justifyContent='flex-end'>
            <Button
              type='submit'
              variant='contained'
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

export default AddLessonCompletion
