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
  singleLesson: any
}
// changes added
const LessonHistory = ({ open, handleClose, singleLesson }: ViewDetailInput) => {
  const totalLessonCompleted = singleLesson.reduce(
    (total: any, lesson: any) => total + lesson.no_of_lesson_compeleted,
    0,
  )

  let serialNumber = 1

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
            <div className='container max-w-[1690px] mx-auto mt-6'>
              <table className='w-full border-collapse'>
                <thead>
                  <tr className='font-bold' style={{ backgroundColor: '#E5E7EB' }}>
                    <th className='border py-2'>Serial No</th>

                    <th className='border py-2'>Student ID</th>

                    <th className='border py-2'>Student Name</th>
                    <th className='border py-2'>Instructor Name</th>
                    <th className='border py-2'>Total Lesson</th>
                    <th className='border py-2'>Lesson Completed</th>
                    <th className='border py-2'>Date</th>
                    <th className='border py-2'>Road test</th>
                  </tr>
                </thead>
                <tbody>
                  {singleLesson?.map((lesson: any) => {
                    const date = new Date(lesson?.createdAt)
                    const formattedDate = date.toLocaleDateString('en-GB')
                    return (
                      <>
                        <tr className='font-medium' style={{ borderBottom: '1px solid #E5E7EB' }}>
                          <td className='border py-2 text-center'>{serialNumber++}</td>
                          <td className='border py-2 text-center'>
                            {lesson?.std_id?.supportive_id}
                          </td>
                          <td className='border py-2 text-center'>
                            {`${lesson?.std_id?.firstName} ${lesson?.std_id?.lastName}`}
                          </td>
                          <td className='border py-2 text-center'>{`${lesson?.instruct_id?.firstName} ${lesson?.instruct_id?.lastName}`}</td>
                          <td className='border py-2 text-center'>{lesson?.total_lesson}</td>
                          <td className='border py-2 text-center'>
                            {lesson?.no_of_lesson_compeleted}
                          </td>
                          <td className='border py-2 text-center'>{formattedDate}</td>
                          <td className='border py-2 text-center'>Yes</td>
                        </tr>
                      </>
                    )
                  })}
                </tbody>
              </table>
              <div className='flex justify-end mt-4'>
                <Typography style={{ fontWeight: 'bold' }}>
                  {' '}
                  Total Lesson Completed: {totalLessonCompleted}
                </Typography>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default LessonHistory
