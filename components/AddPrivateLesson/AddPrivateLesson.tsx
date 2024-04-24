import React from 'react'
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
import './styles.css'
const validationSchema = yup.object({
  studentName: yup.string().required('Student Name is required'),
  instructorName: yup.string().required('Instructor Name is required'),
  initialLessonsRequested: yup.string().required('Initial Lessons Requested is required'),
  roadTestRequested: yup.string(),
  lessonsCompleted: yup.string().required('Number of Lessons Completed is required'),
  roadTestCompleted: yup.string(),
})
const AddPrivateLesson = () => {
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      studentName: '',
      instructorName: '',
      initialLessonsRequested: '',
      roadTestRequested: '',
      lessonsCompleted: '',
      roadTestCompleted: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      console.log(values)
      router.push('/pvtlssnasgndtoinstrs')
    },
  })
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
                  Instructor Name
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={formik.values.instructorName}
                  label='Instructor Name'
                  onChange={(e) => {
                    formik.setFieldValue('instructorName', e.target.value)
                  }}
                >
                  <MenuItem value={'scarlett'}>Scarlett</MenuItem>
                  <MenuItem value={'lucas'}>Lucas</MenuItem>
                  <MenuItem value={'ella'}>Ella</MenuItem>
                  <MenuItem value={'nathan'}>Nathan</MenuItem>
                  <MenuItem value={'grace'}>Grace</MenuItem>
                  <MenuItem value={'austin'}>Austin</MenuItem>
                  <MenuItem value={'madison'}>Madison</MenuItem>
                  <MenuItem value={'carter'}>Carter</MenuItem>
                  <MenuItem value={'aubrey'}>Aubrey</MenuItem>
                  <MenuItem value={'sebastian'}>Sebastian</MenuItem>
                  <MenuItem value={'claire'}>Claire</MenuItem>
                  <MenuItem value={'gabriel'}>Gabriel</MenuItem>
                  <MenuItem value={'zoey'}>Zoey</MenuItem>
                </Select>

                {!!(formik.touched.instructorName && formik.errors.instructorName) && (
                  <FormHelperText sx={{ color: '#d32f2f' }}>
                    {formik.errors.instructorName as string}
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
    </div>
  )
}

export default AddPrivateLesson
