import React from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Grid, TextField, Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import { addPackage } from 'services/room'
import 'react-toastify/dist/ReactToastify.css'
const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  price: yup.string().required('Price is required'),
  noOfLesson: yup.string().required('No of Lesson is required'),
})

const AddPackage = () => {
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      noOfLesson: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values)
      const data = {
        name: values.name,
        price: values.price,
        no_of_lesson: values.noOfLesson,
      }
      try {
        const res = await addPackage(data)
        console.log('Add Package api response', res)
        toast.success('Package added Successfully', {
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
          router.push('/packages')
        }, 2000)
      } catch (error: any) {
        toast.error('Error while adding package', {
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
              id='name'
              name='name'
              label='Name'
              variant='outlined'
              fullWidth
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
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
              id='price'
              name='price'
              label='Price'
              variant='outlined'
              fullWidth
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
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
              id='noOfLesson'
              name='noOfLesson'
              label='No of Lesson'
              variant='outlined'
              fullWidth
              value={formik.values.noOfLesson}
              onChange={formik.handleChange}
              error={formik.touched.noOfLesson && Boolean(formik.errors.noOfLesson)}
              helperText={formik.touched.noOfLesson && formik.errors.noOfLesson}
              sx={{
                '& fieldset': { borderColor: '#f23d4d !important' },
              }}
              InputLabelProps={{
                focused: false,
              }}
            />
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

export default AddPackage
