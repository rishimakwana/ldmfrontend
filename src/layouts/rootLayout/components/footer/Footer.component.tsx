import Link from 'next/link'
import { Button, Container, Divider, Grid, Stack, Typography, Link as MuiLink, IconButton } from '@mui/material'

import Logo from '@/components/logo/Logo.component'
import { style } from './Footer.style'
import { TNavItem } from './Footer.type'
import { NAVS, SOCIAL_MEDIA_LINKS } from './Footer.config'
import { useReduxSelector } from '@/hooks'



export default function Footer() {
  const organization = useReduxSelector(state => state.organization)


  const createNavItems = (items: TNavItem[], heading: string) => {
    return (
      <Stack gap={2} sx={style.navBox}>
        <Typography variant='h3'>{heading}</Typography>
        <Stack component='nav'>
          {items.map((item, index) =>
            <Button color='inherit' variant='text' component={Link} href={item.link} sx={style.navItem} key={index}>{item.label}</Button>
          )}
        </Stack>
      </Stack>
    )
  }


  return (
    <Stack component='footer' sx={style.root}>
      <Stack component={Container} divider={<Divider />} sx={style.container}>
        <Grid container mb={4} spacing={3}>

          {/* About */}
          <Grid item xs={12} sm={6} md={3}>
            <Stack alignItems='start' gap={2}>
              <Logo />
              <Stack gap={1}>
                <Typography className='line-3'>The Bahrain Paralympic Committee (NPC) was established in 2017, following the resolution issued by His Highness Shaikh Nasser bin Hamad Al Khalifa, Chairman of the Supreme Council for Youth and Sport, and representative for His Majesty the King for charity work and Youth Affairs, as an official entity to include and support all athletic competencies of People with Impairment.</Typography>
                <MuiLink component={Link} href='#' color='inherit'>Read More</MuiLink>
              </Stack>
            </Stack>
          </Grid>

          {/* Links */}
          <Grid item xs={12} sm={6} md={3}>
            {createNavItems(NAVS.LINKS, 'Links')}
          </Grid>

          {/* Legal */}
          <Grid item xs={12} sm={6} md={3}>
            {createNavItems(NAVS.LEGALS, 'Legal')}
          </Grid>

          {/* Follow Us */}
          <Grid item xs={12} sm={6} md={3}>
            <Stack gap={2}>
              <Typography variant='h3'>Follow</Typography>
              <Stack direction='row' gap={1.5}>
                {SOCIAL_MEDIA_LINKS.map((item, index) =>
                  <IconButton rel='noopener noreferrer' aria-label='Social link' component={Link} href={item.link} sx={style.socialLink} key={index}>{item.children}</IconButton>
                )}
              </Stack>
            </Stack>
          </Grid>

        </Grid>

        {/* Copyright */}
        <Typography sx={style.copyright}>&copy;{new Date().getFullYear()} {organization.organizationName}. All right reserved</Typography>

      </Stack>
    </Stack>
  )
}
