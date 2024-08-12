/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Grid, TextField, Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Box from '@mui/material/Box'
import FormHelperText from '@mui/material/FormHelperText'
import { getAllInstructors1, getAllStudents, getAllPackages } from 'services/room'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import { changeInstructor, getStudentById } from 'services/room'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import 'react-toastify/dist/ReactToastify.css'
import './styles.css'
const validationSchema = yup.object({
  instructorName: yup.string().required('Instructor is required'),
  // lessonCompleted: yup.string().required('No of lesson completed is required'),
  RemainingLessonAssign: yup.string().required('Assign Remaining lesson is required'),
  Date: yup.string().required('End date is required'),
})
interface StudentDetail {
  supportive_id: string // or the appropriate type
  firstName: string
  lastName: string
  // add other properties as needed
}
const ChangeInstructor = ({ params }: any) => {
  console.log('The change instructor id', params.assigninstructorId, params.studentId)

  const [instructors, setInstructors] = useState([])
  const [studentDetail, setStudentDetail] = useState<StudentDetail | null>(null)
  const [assignData, setAssignData] = useState()
  const [instructorId, setInstructorId] = useState(null)

  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      instructorName: '',
      lessonCompleted: '',
      RemainingLessonAssign: '',
      Date: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values)

      const data = {
        instructor_id: instructorId,
        id: params.assigninstructorId,
        lessonCompleted: values.lessonCompleted,
        RemainingLessonAssign: values.RemainingLessonAssign,
        endDate: values.Date,
      }
      try {
        const res = await changeInstructor(data)
        console.log('Assign package api response', res)
        toast.success('Instructor changed successfully', {
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
        toast.error('Error while changing instructor', {
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
        const res = await getAllInstructors1()
        console.log('The instructor data is:', res)
        const instructor = res.instructors
        setInstructors(instructor)
      } catch (error) {
        console.error('Error fetching instructor data:', error)
      }
    }

    const fetchStudentDetail = async () => {
      try {
        const res = await getStudentById(params?.studentId)
        console.log('The student detail is:', res)
        const student = res.student
        setStudentDetail(student)
        setAssignData(res.assign)
      } catch (error) {
        console.error('Error fetching instructor data:', error)
      }
    }

    fetchInstructorData()
    fetchStudentDetail()
  }, [])

  console.log('the formik values is:', formik.values)

  return (
    <div className='mt-[3.5rem]'>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          spacing={3}
          sx={{ marginTop: '5px !important', paddingLeft: '6rem', paddingRight: '6rem' }}
        >
          <Grid item xs={12} sm={3} className='flex items-center'>
            <TextField
              id='StudentID'
              name='StudentID'
              label='Student ID'
              variant='outlined'
              fullWidth
              sx={{
                '& fieldset': { borderColor: '#f23d4d !important' },
              }}
              InputLabelProps={{
                focused: false,
                shrink: true,
              }}
              inputProps={{
                readOnly: true,
              }}
              type='text'
              value={studentDetail?.supportive_id}
              onKeyDown={(event) => {
                event.stopPropagation()
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3} className='flex items-center'>
            <TextField
              id='StudentName'
              name='StudentName'
              label='Student Name'
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
              value={`${studentDetail?.firstName} ${studentDetail?.lastName}`}
              onKeyDown={(event) => {
                event.stopPropagation()
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3} className='flex items-center'>
            <TextField
              id='oldInstructor'
              name='oldInstructor'
              label='Old Instructor'
              variant='outlined'
              fullWidth
              sx={{
                '& fieldset': { borderColor: '#f23d4d !important' },
              }}
              InputLabelProps={{
                focused: false,
                shrink: true,
              }}
              inputProps={{
                readOnly: true,
              }}
              type='text'
              // @ts-ignore
              value={`${assignData?.instructor_id?.firstName} ${assignData?.instructor_id?.lastName}`}
              onKeyDown={(event) => {
                event.stopPropagation()
              }}
            />
          </Grid>
          {/* <Grid item xs={12} sm={3} className='flex items-center'>
            <TextField
              id='lessonCompleted'
              name='lessonCompleted'
              label='No of Lesson Completed'
              variant='outlined'
              fullWidth
              sx={{
                '& fieldset': { borderColor: '#f23d4d !important' },
              }}
              InputLabelProps={{
                focused: false,
                shrink: true,
              }}
              // inputProps={{
              //   readOnly: true,
              // }}
              type='text'
              error={formik.touched.lessonCompleted && Boolean(formik.errors.lessonCompleted)}
              helperText={formik.touched.lessonCompleted && formik.errors.lessonCompleted}
              // @ts-ignore
              value={formik.values.lessonCompleted}
              onChange={(e) => {
                formik.setFieldValue('lessonCompleted', e.target.value)
              }}
              onKeyDown={(event) => {
                event.stopPropagation()
              }}
            />
          </Grid> */}
          <Grid item xs={12} sm={3} style={{ marginTop: '-8px' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label='End Date'
                  format='YYYY/MM/DD'
                  value={formik.values.Date}
                  onChange={(newDate) => {
                    formik.setFieldValue('Date', dayjs(newDate).format('YYYY-MM-DD'))
                  }}
                  // error={formik.touched.Date && Boolean(formik.errors.Date)}
                  // helperText={formik.touched.Date && formik.errors.Date}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel
                  id='demo-simple-select-label'
                  error={formik.touched.instructorName && Boolean(formik.errors.instructorName)}
                >
                  Assign New Instructor
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={formik.values.instructorName}
                  label='Instructor Name'
                  onChange={(e) => {
                    formik.setFieldValue('instructorName', e.target.value)
                    console.log('The instructor selected is:', e.target.value)

                    const selectedInstructor: any = instructors.find(
                      (instructor: any) => instructor._id === e.target.value,
                    )
                    if (selectedInstructor) {
                      setInstructorId(selectedInstructor._id)
                    }
                  }}
                >
                  {instructors?.map((instructor: any, index) => (
                    <MenuItem key={index} value={instructor._id}>
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

          <Grid item xs={12} sm={3} className='flex items-center'>
            <TextField
              id='RemainingLessonAssign'
              name='RemainingLessonAssign'
              label='Assign Remaining Lesson'
              variant='outlined'
              fullWidth
              sx={{
                '& fieldset': { borderColor: '#f23d4d !important' },
              }}
              InputLabelProps={{
                focused: false,
                shrink: true,
              }}
              // inputProps={{
              //   readOnly: true,
              // }}
              error={
                formik.touched.RemainingLessonAssign && Boolean(formik.errors.RemainingLessonAssign)
              }
              helperText={
                formik.touched.RemainingLessonAssign && formik.errors.RemainingLessonAssign
              }
              type='text'
              // @ts-ignore
              value={formik.values.RemainingLessonAssign}
              onChange={(e) => {
                formik.setFieldValue('RemainingLessonAssign', e.target.value)
              }}
              onKeyDown={(event) => {
                event.stopPropagation()
              }}
            />
          </Grid>

          <Grid item xs={9} container justifyContent='flex-end'></Grid>
          <Grid item xs={3} container justifyContent='flex-end'>
            <Button
              type='submit'
              variant='contained'
              sx={{
                marginLeft: 'auto',
                background: '#f23d4d',
                height: '43px',
                color: 'black',
                '&:hover': {
                  background: '#e01527',
                },
              }}
            >
              Save
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

export default ChangeInstructor
