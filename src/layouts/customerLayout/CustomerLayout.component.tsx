import { Stack } from '@mui/material'

import Header from './components/header/Header.component'
import { CustomerLayoutProps } from './CustomerLayout.type'



export default function CustomerLayout(props: CustomerLayoutProps) {
  const { children } = props

  return <>
    <Header />
    <Stack py={4}>
      {children}
    </Stack>
  </>
}
