import Link from 'next/link'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link as MuiLink, IconButton, Stack, Typography, Container, Grid, Autocomplete, TextField, FormControl, FormHelperText, InputLabel, Select, MenuItem } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { yupResolver } from '@hookform/resolvers/yup'

import InputField from '@/components/_ui/inputField/InputField.component'
import PhoneField from '@/components/_ui/phoneField/PhoneField.component'
import RenderContent from '@/components/renderContent/RenderContent.component'
import { style } from './Register.style'
import { Page } from '@/types'
import { schema, TSchema } from './Register.config'
import { useRegisterMutation } from '@/redux/api/auth.api'
import { useGetCountriesQuery } from '@/redux/api/common.api'
import { setUser } from '../Auth.util'
import { useGetOrganizationTypeListQuery } from '@/redux/api/organization.api'



const Register: Page = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const [register] = useRegisterMutation()
  const countriesApiState = useGetCountriesQuery()
  const organizationTypeListApiState = useGetOrganizationTypeListQuery()


  const { control, handleSubmit, getValues, formState: { isSubmitting } } = useForm<TSchema>({
    resolver: yupResolver(schema),
  })


  const onSubmit = async () => {
    const formData = getValues()
    const profile = await register(formData).unwrap()
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
        <Typography variant='h1' textAlign='center'>Register to EMS.</Typography>

        <RenderContent
          loading={countriesApiState.isLoading || organizationTypeListApiState.isLoading}
          error={countriesApiState.isError || organizationTypeListApiState.isError}
        >
          {(countriesApiState.data && organizationTypeListApiState.data) &&
            <>
              <Grid container spacing={2}>

                {/* First Name  */}
                <Grid item xs={12} sm={6}>
                  <InputField name='firstName' label='First name *' control={control} />
                </Grid>

                {/* Last Name */}
                <Grid item xs={12} sm={6}>
                  <InputField name='lastName' label='Last name *' control={control} />
                </Grid>

                {/* Email */}
                <Grid item xs={12} sm={6}>
                  <InputField name='email' label='Email *' control={control} />
                </Grid>

                {/* Phone */}
                <Grid item xs={12} sm={6}>
                  <PhoneField name='phone' label='Phone *' control={control} />
                </Grid>

                {/* Organization Type */}
                <Grid item xs={12} sm={6}>
                  <Controller name='customerOrganizationTypeId' control={control}
                    render={({ fieldState: { error }, field: { ref, ...restField } }) =>
                      <FormControl error={!!error}>
                        <InputLabel>Organization type *</InputLabel>
                        <Select {...restField} inputRef={ref} label='Organization type *'>
                          {organizationTypeListApiState.data?.map((item, index) =>
                            <MenuItem value={item.id} key={index}>{item.type}</MenuItem>
                          )}
                        </Select>
                        <FormHelperText>{error?.message}</FormHelperText>
                      </FormControl>
                    }
                  />
                </Grid>

                {/* Organization Name */}
                <Grid item xs={12} sm={6}>
                  <InputField name='customerOrganizationName' label='Organization name *' control={control} />
                </Grid>

                {/* Country */}
                <Grid item xs={12}>
                  <Controller name='countryId' control={control}
                    render={({ fieldState: { error }, field: { ref, value, onChange, ...restField } }) =>
                      <Autocomplete
                        {...restField}
                        options={countriesApiState.data!}
                        value={countriesApiState.data!.find(item => item.id === value) || null}
                        onChange={(_, value) => onChange(value?.id)}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label='Country *' inputRef={ref} error={!!error} helperText={error?.message} inputProps={{ ...params.inputProps, autoComplete: 'new-password' }} />}
                      />
                    }
                  />
                </Grid>

                {/* Password */}
                <Grid item xs={12} sm={6}>
                  <InputField name='password' label='Password *' type={showPassword ? 'text' : 'password'} control={control}
                    inputProps={{ autoComplete: 'new-password' }}
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={() => setShowPassword(v => !v)}>
                          {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                        </IconButton>
                      )
                    }}
                  />
                </Grid>

                {/* Confirm Password */}
                <Grid item xs={12} sm={6}>
                  <InputField name='confirmPassword' label='Confirm password *' type={showConfirmPassword ? 'text' : 'password'} control={control}
                    inputProps={{ autoComplete: 'new-password' }}
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={() => setShowConfirmPassword(v => !v)}>
                          {showConfirmPassword ? <MdVisibility /> : <MdVisibilityOff />}
                        </IconButton>
                      )
                    }}
                  />
                </Grid>

                {/* Accept */}
                <Grid item xs={12}>
                  <Typography color='text.disabled' mb={1}>By registering, you agree to the <MuiLink href='#' target='_blank'>terms & conditions</MuiLink> and <MuiLink href='#' target='_blank'>privacy policy</MuiLink>.</Typography>
                </Grid>

              </Grid>

              <LoadingButton variant='contained' size='large' type='submit' loading={isSubmitting}>Register</LoadingButton>
              <Typography textAlign='center'>Already have an account? &nbsp; <MuiLink component={Link} href='/auth/login'>Login</MuiLink></Typography>
            </>
          }
        </RenderContent>
      </Stack>
    </Container>
  </>
}


Register.rootLayoutProps = {
  pageType: 'auth',
  title: 'Register',
}

export default Register