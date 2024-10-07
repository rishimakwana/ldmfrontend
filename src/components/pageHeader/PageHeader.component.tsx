import Link from 'next/link'
import { Container, IconButton, Stack, SxProps, Typography, Tooltip, alpha } from '@mui/material'
import { MdNotificationsNone, MdOutlineArrowBack } from 'react-icons/md'

import { PageHeaderProps } from './PageHeader.type'
import { style } from './PageHeader.style'
import { useReduxSelector } from '@/hooks'
import { HEADER_HEIGHT } from '@/layouts/rootLayout/RootLayout.config'



export default function PageHeader(props: PageHeaderProps) {
  let { actions, heading, sx = {}, count, backUrl } = props
  const { roleId } = useReduxSelector(state => state.layout.profile)
  const isCustomer = roleId == 3


  if (isCustomer) {
    sx = {
      ...sx,
    }
  }
  else {
    sx = {
      height: HEADER_HEIGHT,
      borderBottom: 1,
      borderColor: 'divider',
      backdropFilter: 'blur(8px)',
      position: 'sticky',
      bgcolor: theme => alpha(theme.palette.background.default, .8),
      zIndex: theme => theme.zIndex.appBar,
      top: 0,
      mb: 3,
      ...sx,
    }
  }


  return (
    <Stack sx={{ ...style.root, ...sx } as SxProps}>
      <Container sx={style.container}>

        {/* Back */}
        {backUrl &&
          <IconButton edge='start' href={backUrl} component={Link}>
            <MdOutlineArrowBack />
          </IconButton>
        }

        {/* Heading */}
        <Typography variant='h1' sx={style.heading} noWrap>
          {heading}
        </Typography>

        {/* Count */}
        {count !== undefined ? <Tooltip title={`Total ${heading} ${count}`}><Typography>{count}</Typography></Tooltip> : null}

        {/* Actions */}
        <Stack sx={style.actionContainer}>
          {actions}
          {!isCustomer &&
            <Stack direction='row'>
              <IconButton edge='end'><MdNotificationsNone className='icon-xl' /></IconButton>
            </Stack>
          }
        </Stack>

      </Container>
    </Stack>
  )
}
