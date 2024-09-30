import Link from 'next/link'
import { useRouter } from 'next/router'
import { Container, Stack, Tab, Tabs } from '@mui/material'

import { style } from './Header.style'
import { useTabOptions } from './Header.hook'



export default function Header() {
  const router = useRouter()
  const tabOptions = useTabOptions()
  const activeTab = tabOptions.find(item => router.asPath.startsWith(item.link))


  return (
    <Stack sx={style.root}>
      <Container>
        <Tabs centered value={activeTab?.link}>
          {tabOptions.map((item, index) =>
            <Tab
              key={index}
              sx={style.tab}
              LinkComponent={Link}
              href={item.link!}
              label={item.label}
              value={item.link}
            />
          )}
        </Tabs>
      </Container>
    </Stack>
  )
}
