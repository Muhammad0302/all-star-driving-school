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
  width: '53%',
  minHeight: '25%',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 3,
}
interface ViewDetailInput {
  open: boolean
  handleClose: () => void
}
// changes added
const PaymentHistory = ({ open, handleClose }: ViewDetailInput) => {
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
                  <tr className='font-bold'>
                    <th className='border  py-2'>Serial No</th>
                    <th className='border  py-2'>Type</th>
                    <th className='border  py-2'>Rate</th>
                    <th className='border  py-2'>Tax</th>
                    <th className='border  py-2'>No of Lesson</th>
                    <th className='border  py-2'>Amount</th>
                    <th className='border  py-2'>Cheque No</th>
                    <th className='border  py-2'>Issue Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='font-medium'>
                    <td className='border py-2 text-center'>1</td>
                    <td className='border py-2 text-center'>Cah</td>
                    <td className='border py-2 text-center'>$28</td>
                    <td className='border py-2 text-center'>25%</td>
                    <td className='border py-2 text-center'>7</td>
                    <td className='border py-2 text-center'>$420</td>
                    <td className='border py-2 text-center'>8473635243</td>
                    <td className='border py-2 text-center'>21/2/2024</td>
                  </tr>
                  <tr className='font-medium'>
                    <td className='border py-2 text-center'>2</td>
                    <td className='border py-2 text-center'>Credit Card</td>
                    <td className='border py-2 text-center'>$39</td>
                    <td className='border py-2 text-center'>25%</td>
                    <td className='border py-2 text-center'>10</td>
                    <td className='border py-2 text-center'>$700</td>
                    <td className='border py-2 text-center'>938735267</td>
                    <td className='border py-2 text-center'>15/5/2024</td>
                  </tr>
                  <tr className='font-medium'>
                    <td className='border py-2 text-center'>3</td>
                    <td className='border py-2 text-center'>Debit Card</td>
                    <td className='border py-2 text-center'>$31</td>
                    <td className='border py-2 text-center'>25%</td>
                    <td className='border py-2 text-center'>14</td>
                    <td className='border py-2 text-center'>$650</td>
                    <td className='border py-2 text-center'>2357353635</td>
                    <td className='border py-2 text-center'>8/8/2024</td>
                  </tr>
                  <tr className='font-medium'>
                    <td className='border py-2 text-center'>4</td>
                    <td className='border py-2 text-center'>Bank Transfer</td>
                    <td className='border py-2 text-center'>$30</td>
                    <td className='border py-2 text-center'>25%</td>
                    <td className='border py-2 text-center'>13</td>
                    <td className='border py-2 text-center'>$610</td>
                    <td className='border py-2 text-center'>847364837</td>
                    <td className='border py-2 text-center'>12/11/2024</td>
                  </tr>
                </tbody>
              </table>
              <div className='flex justify-end items-center  font-bold mt-[27px] mr-[20px]'>
                Total: $1300
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default PaymentHistory
