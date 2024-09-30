import SimpleBar from 'simplebar-react'
import { styled } from '@mui/material'
import 'simplebar-react/dist/simplebar.min.css'



const Scrollbar = styled(SimpleBar)(({ theme }) => theme.unstable_sx({
  '.simplebar-content-wrapper': {
    outline: 'unset',
  }
}))


export default Scrollbar