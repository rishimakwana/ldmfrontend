import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link as MuiLink, IconButton, Stack, Typography, Container } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { yupResolver } from '@hookform/resolvers/yup'

import InputField from '@/components/_ui/inputField/InputField.component'
import { style } from './Login.style'
import { Page } from '@/types'
import { schema, TSchema } from './Login.config'
import { useLoginMutation } from '@/redux/api/auth.api'
import { setUser } from '../Auth.util'



const Login: Page = () => {
  const [login] = useLoginMutation()
  const [showPassword, setShowPassword] = useState<boolean>(false)


  const { control, handleSubmit, formState: { isSubmitting } } = useForm<TSchema>({
    resolver: yupResolver(schema)
  })


  const onSubmit = async (formData: TSchema) => {
    const profile = await login({ ...formData }).unwrap()
    setUser(profile)
  }


  return <>
    <style global jsx>{`
      main{
        display:flex;
        justify-content:center;
      }
    `}</style>

    <Container className='section-spacing-my'>
      <Stack component='form' onSubmit={handleSubmit(onSubmit)} noValidate sx={style.box}>
        <Typography variant='h1' textAlign='center'>Login to EMS.</Typography>

        <Stack gap={2}>
          <InputField name='email' label='Email' control={control} />
          <InputField name='password' label='Password' type={showPassword ? 'text' : 'password'} control={control}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowPassword(v => !v)}>
                  {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                </IconButton>
              )
            }}
          />
          <MuiLink textAlign='right'>Forgot Password?</MuiLink>
        </Stack>

        <LoadingButton variant='contained' size='large' type='submit' loading={isSubmitting}>Login</LoadingButton>

        <Typography textAlign='center'>Don't have an account? &nbsp; <MuiLink component={Link} href='/auth/register'>Register</MuiLink></Typography>
      </Stack>
    </Container>
  </>
}


Login.rootLayoutProps = {
  pageType: 'auth',
  title: 'Login',
}


export default Login