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
import { assignPackage } from 'services/room'
import 'react-toastify/dist/ReactToastify.css'
import './styles.css'
const validationSchema = yup.object({
  studentName: yup.string().required('Student is required'),
  instructorName: yup.string().required('Instructor is required'),
  packageName: yup.string().required('Package is required'),
  price: yup.string().required('Price is required'),
  payementType: yup.string(),
  payementPlan: yup.string().required('Payment plan is required'),
  advancePayment: yup.string(),
  remainingPrice: yup.string(),
})
const AssignInstructor = () => {
  const [students, setStudents] = useState([])
  const [studentId, setStudentId] = useState(null)
  const [instructors, setInstructors] = useState([])
  const [instructorId, setInstructorId] = useState(null)
  const [packages, setPackages] = useState([])
  const [packageId, setPackageId] = useState(null)
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      studentName: '',
      instructorName: '',
      packageName: '',
      price: '',
      payementType: '',
      payementPlan: '',
      advancePayment: '',
      remainingPrice: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values)

      const data = {
        instructor_id: instructorId,
        std_id: studentId,
        package_id: packageId,
        paymentPlan: values.payementPlan,
        paymentType: values.payementType,
        advance: values.advancePayment,
        total: values.price,
        remainingAmount: values.remainingPrice,
      }
      try {
        const res = await assignPackage(data)
        console.log('Assign package api response', res)
        toast.success('Instructor and package assigned successfully', {
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
          router.push('/stdsasigndtoinstrs')
        }, 2000)
      } catch (error: any) {
        toast.error('Error while assigning package', {
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
        console.log('The student data is:', res)
        const students = res.students
        setStudents(students)
      } catch (error) {
        console.error('Error fetching students data:', error)
      }
    }
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
    const fetchPackageData = async () => {
      try {
        const res = await getAllPackages()
        console.log('The package data is:', res)
        const packages = res.packages
        setPackages(packages)
      } catch (error) {
        console.error('Error fetching packages data:', error)
      }
    }
    fetchStudentData()
    fetchInstructorData()
    fetchPackageData()
  }, [])

  useEffect(() => {
    if (formik.values.price && formik.values.advancePayment) {
      const price = parseFloat(formik.values.price.replace(/\$/g, ''))
      const advancePayment = parseFloat(formik.values.advancePayment.replace(/\$/g, ''))
      const remainingPrice = price - advancePayment
      console.log('the remaining price is:', remainingPrice)
      formik.setFieldValue('remainingPrice', `$${remainingPrice.toFixed(2).toString()}`)
    }
  }, [formik.values.price, formik.values.advancePayment, formik.values.packageName])
  console.log('the formik values is:', formik.values)

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
          <Grid item xs={12} sm={6}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel
                  id='demo-simple-select-label'
                  error={formik.touched.packageName && Boolean(formik.errors.packageName)}
                >
                  Package
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={formik.values.packageName}
                  label='Student Name'
                  onChange={(e) => {
                    formik.setFieldValue('packageName', e.target.value)

                    const selectedPackage: any = packages.find(
                      (packags: any) => packags.name[0] === e.target.value,
                    )

                    if (selectedPackage) {
                      setPackageId(selectedPackage._id)
                      formik.setFieldValue('price', selectedPackage.price)
                    }
                  }}
                >
                  {packages?.map((packages: any, index) => (
                    <MenuItem key={index} value={`${packages.name}`}>
                      {`${packages.name}`}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.packageName && Boolean(formik.errors.packageName) && (
                  <FormHelperText sx={{ color: '#d32f2f' }}>
                    {formik.errors.packageName}
                  </FormHelperText>
                )}
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='price'
              name='price'
              label='Price'
              variant='outlined'
              fullWidth
              sx={{
                '& fieldset': { borderColor: '#f23d4d !important' },
              }}
              InputLabelProps={{
                focused: false,
              }}
              // @ts-ignore
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && (formik.errors.price as any)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='advancePayment'
              name='advancePayment'
              label='Advance Payment'
              variant='outlined'
              fullWidth
              sx={{
                '& fieldset': { borderColor: '#f23d4d !important' },
              }}
              InputLabelProps={{
                focused: false,
              }}
              value={formik.values.advancePayment}
              onChange={formik.handleChange}
              error={formik.touched.advancePayment && Boolean(formik.errors.advancePayment)}
              helperText={formik.touched.advancePayment && (formik.errors.advancePayment as any)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel
                id='payementType-label'
                error={formik.touched.payementType && Boolean(formik.errors.payementType)}
              >
                Payment Type
              </InputLabel>
              <Select
                labelId='payementType-label'
                id='payementType'
                value={formik.values.payementType}
                onChange={(e) => {
                  formik.setFieldValue('payementType', e.target.value)
                }}
                error={formik.touched.payementType && Boolean(formik.errors.payementType)}
                sx={{ '& fieldset': { borderColor: '#f23d4d !important' } }}
              >
                <MenuItem value='cash'>Cash</MenuItem>
                <MenuItem value='credit_card'>Credit Card</MenuItem>
                <MenuItem value='debit_card'>Debit Card</MenuItem>
                <MenuItem value='bank_transfer'>Bank Transfer</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel
                id='payementPlan-label'
                error={formik.touched.payementPlan && Boolean(formik.errors.payementPlan)}
              >
                Payment Plan
              </InputLabel>
              <Select
                labelId='payementPlan-label'
                id='payementPlan'
                value={formik.values.payementPlan}
                onChange={(e) => {
                  formik.setFieldValue('payementPlan', e.target.value)
                }}
                error={formik.touched.payementPlan && Boolean(formik.errors.payementPlan)}
                sx={{ '& fieldset': { borderColor: '#f23d4d !important' } }}
              >
                <MenuItem value='1'>1</MenuItem>
                <MenuItem value='2'>2</MenuItem>
                <MenuItem value='3'>3</MenuItem>
                <MenuItem value='4'>4</MenuItem>
              </Select>
              {formik.touched.payementPlan && Boolean(formik.errors.payementPlan) && (
                <FormHelperText sx={{ color: '#d32f2f' }}>
                  {formik.errors.payementPlan}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='remainingPrice'
              name='remainingPrice'
              label='Remaining Price'
              variant='outlined'
              fullWidth
              sx={{
                '& fieldset': { borderColor: '#f23d4d !important' },
              }}
              InputLabelProps={{
                focused: false,
              }}
              value={formik.values.remainingPrice}
              onChange={formik.handleChange}
              error={formik.touched.remainingPrice && Boolean(formik.errors.remainingPrice)}
              helperText={formik.touched.remainingPrice && (formik.errors.remainingPrice as any)}
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

export default AssignInstructor
