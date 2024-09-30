import Head from 'next/head'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { IconContext } from 'react-icons/lib'

import RootLayout from '@/layouts/rootLayout/RootLayout.component'
import { AppProps } from './_app.type'
import { store } from '@/redux/store/store'
import { useMakeTheme } from '@/styles/theme'
import '@/styles/globals.css'
import '@/lib/moment'
import '@/lib/yup'



function App(props: AppProps) {
  const { Component, pageProps } = props
  const theme = useMakeTheme()
  const rootLayoutProps = Component.rootLayoutProps
  const getNestedLayout = Component.getNestedLayout ?? ((page) => page)


  return <>
    <Head>
      <title>Event Management System</title>
      <meta charSet='UTF-8' />
      <meta name='robots' content='index,follow' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    </Head>

    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <IconContext.Provider value={{ className: 'icon' }}>
          <Toaster position='bottom-left' />
          <CssBaseline enableColorScheme />
          <RootLayout {...rootLayoutProps}>
            {getNestedLayout(<Component {...pageProps} />)}
          </RootLayout>
        </IconContext.Provider>
      </LocalizationProvider>
    </ThemeProvider>
  </>
}


export default function AppRoot(props: AppProps) {
  return (
    <Provider store={store}>
      <App {...props} />
    </Provider>
  )
}