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
import { getAllInstructors, getAllStudents, getAllPackages } from 'services/room'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import { changeInstructor, getStudentById } from 'services/room'
import 'react-toastify/dist/ReactToastify.css'
import './styles.css'
const validationSchema = yup.object({
  instructorName: yup.string().required('Instructor is required'),
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
  const [instructorId, setInstructorId] = useState(null)

  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      instructorName: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values)

      const data = {
        instructor_id: instructorId,
        id: params.assigninstructorId,
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
        const res = await getAllInstructors()
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
          <Grid item xs={12} sm={3}>
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

export default ChangeInstructor
