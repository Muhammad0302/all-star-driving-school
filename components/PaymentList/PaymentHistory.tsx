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
import CloseIcon from '@mui/icons-material/Close'
import './styles.css'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  minHeight: '25%',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 3,
}
interface ViewDetailInput {
  open: boolean
  handleClose: () => void
  singlePayment: any
}

const PaymentHistory = ({ open, handleClose, singlePayment }: ViewDetailInput) => {
  let serialNumber = 1

  const totalPayment = singlePayment.reduce((total: any, payment: any) => total + payment.amount, 0)
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
            <div className='container max-w-[1690px] mx-auto  mt-6'>
              <table className='w-full border-collapse'>
                <thead>
                  <tr className='font-bold' style={{ backgroundColor: '#E5E7EB' }}>
                    <th className='border  py-2'>Payment No</th>
                    <th className='border  py-2'>Type</th>
                    <th className='border  py-2'>Amount</th>
                    <th className='border  py-2'>Date</th>
                    <th className='border  py-2'>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {singlePayment?.map((payment: any) => {
                    const date = new Date(payment?.createdAt)
                    const formattedDate = date.toLocaleDateString('en-GB')
                    return (
                      <>
                        <tr className='font-medium' style={{ borderBottom: '1px solid #E5E7EB' }}>
                          <td className='border py-2 text-center'>{serialNumber++}</td>
                          <td className='border py-2 text-center'>{payment.payment_method}</td>
                          <td className='border py-2 text-center'>{payment.amount}</td>
                          <td className='border py-2 text-center'>{formattedDate}</td>
                          <td className='border py-2 text-center'>4:45pm</td>
                        </tr>
                      </>
                    )
                  })}
                </tbody>
              </table>
              <div className='flex justify-end items-center mr-6 font-bold mt-[27px]'>
                Total: ${totalPayment}
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default PaymentHistory
