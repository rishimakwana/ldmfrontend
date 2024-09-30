import { useEffect, useRef } from 'react'
import { Avatar, List, Stack, Typography, Button } from '@mui/material'
import { MdCorporateFare } from 'react-icons/md'

import Logo from '@/components/logo/Logo.component'
import NavItem from '@/components/navItem/NavItem.component'
import { style } from './Sidebar.style'
import { useSidebarOptions } from './Sidebar.hook'
import { useReduxDispatch, useReduxSelector } from '@/hooks/redux.hook'
import { formatToTitleCase } from '@/utils'
import { handleLogout } from '@/redux/slice/layout.slice'



export default function Sidebar() {
  const navRef = useRef<HTMLElement>()
  const profile = useReduxSelector(state => state.layout.profile)
  const dispatch = useReduxDispatch()
  const sidebarOptions = useSidebarOptions()
  const name = profile.role === 'admin' ? profile.organizationName : `${profile.firstName} ${profile.lastName}`


  useEffect(() => {
    const navElement = navRef.current!
    const events = [['mouseenter', 'touchstart'], ['mouseleave', 'touchend']]
    const handleOverflow = (value: boolean) => navElement.style.overflow = value ? 'auto' : 'hidden'

    events[0].map(event => navElement.addEventListener(event, () => handleOverflow(true)))
    events[1].map(event => navElement.addEventListener(event, () => handleOverflow(false)))

    return () => {
      events[0].map(event => navElement.removeEventListener(event, () => handleOverflow(true)))
      events[1].map(event => navElement.removeEventListener(event, () => handleOverflow(false)))
    }
  }, [])


  return (
    <Stack component='aside' sx={style.root}>

      {/* LOGO */}
      <Stack sx={style.logoContainer}>
        <Logo />
      </Stack>

      {/* MENUS */}
      <List component='nav' disablePadding sx={style.menuList} ref={navRef as any}>
        {sidebarOptions.map((item, index) =>
          <NavItem size='large' data={item} key={index} />
        )}
      </List>

      {/* PROFILE */}
      <Stack sx={style.profileBox}>
        {/* TODO: pass user profile image link */}
        <Avatar sx={style.circleSize}>{profile.role === 'admin' && <MdCorporateFare />}</Avatar>
        <Stack overflow='hidden' gap={.25}>
          <Typography color='text.primary' className='line-1' fontWeight={500} title={name}>{name}</Typography>
          <Typography variant='body2' mt={-.2}>{formatToTitleCase(profile.role)}</Typography>
        </Stack>
      </Stack>

      {/* Logout */}
      <Stack mx={2}>
        <Button onClick={() => dispatch(handleLogout())}>Logout</Button>
      </Stack>

    </Stack>
  )
}