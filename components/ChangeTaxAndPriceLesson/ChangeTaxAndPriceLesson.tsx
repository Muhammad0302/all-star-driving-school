import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Grid, TextField, Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import { updateRate, getRate } from 'services/room'
import 'react-toastify/dist/ReactToastify.css'
const validationSchema = yup.object({
  tax: yup.string().required('Name is required'),
  priceperlesson: yup.string().required('Price is required'),
})

interface Rate {
  _id: string
}
const ChangeTaxAndPriceLesson = () => {
  const [rate, setRate] = useState<Rate | null>(null)
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      tax: '',
      priceperlesson: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values)
      const data = {
        tax: values.tax,
        price_per_lesson: values.priceperlesson,
      }
      try {
        const res = await updateRate(data, rate!._id || '')
        console.log('update rate response', res)
        toast.success('Rate updated Successfully', {
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
        toast.error('Error while updating rate', {
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
    const fetchRateData = async () => {
      try {
        const res = await getRate()
        console.log('The rate is:', res)
        const rate = res.Rate[0]
        setRate(rate)
        formik.setFieldValue('priceperlesson', rate.price_per_lesson)
        formik.setFieldValue('tax', rate.tax)
      } catch (error) {
        console.error('Error fetching students data:', error)
      }
    }
    fetchRateData()
  }, [])

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
              id='tax'
              name='tax'
              label='Tax(%)'
              variant='outlined'
              fullWidth
              value={formik.values.tax}
              onChange={formik.handleChange}
              error={formik.touched.tax && Boolean(formik.errors.tax)}
              helperText={formik.touched.tax && formik.errors.tax}
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
              id='priceperlesson'
              name='priceperlesson'
              label='Price Per Lesson($)'
              variant='outlined'
              fullWidth
              value={formik.values.priceperlesson}
              onChange={formik.handleChange}
              error={formik.touched.priceperlesson && Boolean(formik.errors.priceperlesson)}
              helperText={formik.touched.priceperlesson && formik.errors.priceperlesson}
              sx={{
                '& fieldset': { borderColor: '#f23d4d !important' },
              }}
              InputLabelProps={{
                focused: false,
              }}
            />
          </Grid>

          <Grid item xs={12} container justifyContent='flex-end'>
            <div className='flex justify-center items-center'>
              <Button
                type='submit'
                variant='contained'
                sx={{
                  marginLeft: 'auto',
                  background: '#f23d4d',
                  color: 'black',
                  height: '42px',
                  '&:hover': {
                    background: '#e01527',
                  },
                }}
              >
                Submit
              </Button>
            </div>
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

export default ChangeTaxAndPriceLesson
