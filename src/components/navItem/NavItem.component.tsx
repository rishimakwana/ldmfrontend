import { useState } from 'react'
import { useRouter } from 'next/router'
import { Collapse, List, ListItemIcon, ListItemText, MenuItem } from '@mui/material'

import Link from 'next/link'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import { NavItemProps } from './NavItem.type'
import { makeStyle } from './NavItem.style'
import { useReduxSelector } from '@/hooks/redux.hook'



export default function NavItem(props: NavItemProps) {
  const { data, isChildren, onClick, size = 'small', ...restProps } = props
  const { role, modules } = useReduxSelector(state => state.layout.profile)
  const [open, setOpen] = useState(false)

  const router = useRouter()
  const style = makeStyle(size, isChildren)
  const link = data.link?.replace('/dashboard/', '') || ''
  const isActive = link && router.pathname.replace('/dashboard/', '').startsWith(link)


  if (data.id && !modules[Number(data.id)]?.permissions.view) return null
  else if (data.roles && !data.roles.includes(role)) return null
  else if (data.exludedRoles && data.exludedRoles.includes(role)) return null


  return <>
    {/* @ts-ignore */}
    <MenuItem
      {...restProps}
      sx={style.root}
      component={Link}
      href={data.link || '#'}
      className={isActive ? 'active' : ''}
      scroll={!(data.link === '#' || data.link === undefined)}
      onClick={el => { setOpen(!open), onClick && onClick(el) }}
    >
      {data.Icon && <ListItemIcon sx={style.itemIcon}><data.Icon className='icon-lg' /></ListItemIcon>}
      <ListItemText primary={data.label} sx={style.itemText} />
      {data.children && (open ? <MdExpandLess /> : <MdExpandMore />)}
    </MenuItem>

    {/* Children */}
    {data.children &&
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {data.children.map((item, index) =>
            <NavItem data={item as any} isChildren key={index} />
          )}
        </List>
      </Collapse>
    }
  </>
}