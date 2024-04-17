import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Typography from '@mui/material/Typography'
import { TextField, Box } from '@mui/material'
import MUIDataTable from 'mui-datatables'
import { Button } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { useRouter } from 'next/navigation'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Grid } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import './styles.css'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  minHeight: '29%',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 3,
}
interface ViewDetailInput {
  open: boolean
  handleClose: () => void
}
const validationSchema = yup.object({
  ChequeNo: yup.string().required('Cheque no is required'),
  issueDate: yup.string().required('Issue Date is required'),
})

const PayModal = ({ open, handleClose }: ViewDetailInput) => {
  const formik = useFormik({
    initialValues: {
      ChequeNo: '',
      issueDate: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      console.log(values)
    },
  })
  console.log('the formik values is:', formik.values)
  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <CloseIcon
              sx={{ cursor: 'pointer', position: 'absolute', top: 15, right: 20 }}
              onClick={handleClose}
            />
            <div className='container mx-auto mt-6'>
              <table className='w-full border-collapse'>
                <thead>
                  <tr className='font-bold'>
                    <th className='border  py-2'>ID</th>
                    <th className='border  py-2'>Name</th>
                    <th className='border  py-2'>Phone Number</th>
                    <th className='border  py-2'>Rate</th>
                    <th className='border  py-2'>No of Lessons</th>
                    <th className='border  py-2'>Tax</th>
                    <th className='border  py-2'>Total Compensation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='font-medium'>
                    <td className='border  py-2 text-center'>E24/12/2</td>
                    <td className='border  py-2 text-center'>Jane Smith</td>
                    <td className='border  py-2 text-center'>123-456-7890</td>
                    <td className='border  py-2 text-center'>$65</td>
                    <td className='border  py-2 text-center'>19</td>
                    <td className='border  py-2 text-center'>25%</td>
                    <td className='border  py-2 text-center'>$926.25</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='mr-[2.3rem] ml-[2.3rem]'>
              <Grid container spacing={3} sx={{ marginTop: '8px !important' }}>
                <Grid item xs={12} sm={3} sx={{ marginTop: '8px !important' }}>
                  <TextField
                    id='ChequeNo'
                    name='ChequeNo'
                    label='Cheque No'
                    variant='outlined'
                    fullWidth
                    sx={{
                      '& fieldset': { borderColor: '#f23d4d !important' },
                    }}
                    InputLabelProps={{
                      focused: false,
                    }}
                    type='text'
                    value={formik.values.ChequeNo}
                    onChange={formik.handleChange}
                    onKeyDown={(event) => {
                      event.stopPropagation()
                    }}
                    error={formik.touched.ChequeNo && Boolean(formik.errors.ChequeNo)}
                    helperText={formik.touched.ChequeNo && (formik.errors.ChequeNo as any)}
                  />
                </Grid>
                <Grid item xs={12} sm={3} sx={{ marginTop: '0px' }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker
                        label='Issue Date'
                        value={formik.values.issueDate}
                        onChange={(newDate) => {
                          formik.setFieldValue('issueDate', newDate)
                        }}
                        // @ts-ignore
                        renderInput={(startProps: any) => <TextField {...startProps} />}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={4}></Grid>
                <Grid
                  item
                  xs={2}
                  sm={2}
                  sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
                >
                  <Button
                    type='submit'
                    // onClick={() => setError(true)}
                    onClick={handleClose}
                    // disabled={loading}
                    variant='contained'
                    color='primary'
                    sx={{
                      marginLeft: 'auto',
                      background: '#f23d4d',
                      height: '45px',
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
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default PayModal
