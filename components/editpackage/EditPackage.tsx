import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Grid, TextField, Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import { addPackage, getPackageById, editPackges } from 'services/room'
import 'react-toastify/dist/ReactToastify.css'
const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  price: yup.string().required('Price is required'),
  noOfLesson: yup.string().required('No of Lesson is required'),
})

const EditPackage = ({ params }: any) => {
  const router = useRouter()
  const [packages, setPackages] = useState([])
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
        const res = await editPackges(data, params.packageId)
        console.log('Edit Package api response', res)
        toast.success('Package updated Successfully', {
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
        toast.error('Error while updating package', {
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
    const fetchPackageData = async () => {
      try {
        const res = await getPackageById(params.packageId)
        console.log('The packages data is:', res)
        const packags = res.package
        packags.name = packags.name[0]
        packags.price = packags.price
        packags.noOfLesson = packags.no_of_lesson

        setPackages(packags)
      } catch (error) {
        console.error('Error fetching package data:', error)
      }
    }

    fetchPackageData()
  }, [params.packageId])

  useEffect(() => {
    if (packages) {
      // @ts-ignore

      formik.setValues(packages)
    }
  }, [packages])

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

export default EditPackage
