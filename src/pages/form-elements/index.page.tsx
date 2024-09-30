import moment from 'moment'
import { useState } from 'react'
import { Autocomplete, Button, Checkbox, Chip, Container, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, IconButton, InputLabel, ListItemText, MenuItem,  Radio, RadioGroup, Select, Stack, Switch, TextField } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { MobileDatePicker, MobileTimePicker } from '@mui/x-date-pickers'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { LoadingButton } from '@mui/lab'

import InputField from '@/components/_ui/inputField/InputField.component'
import PhoneField from '@/components/_ui/phoneField/PhoneField.component'
import ImageField from '@/components/_ui/imageField/ImageField.component'
import ColorField from '@/components/_ui/colorField/ColorField.component'
import QuantityField from '@/components/_ui/quantityField/QuantityField.component'
import TextEditorField from '@/components/_ui/textEditorField/TextEditorField.component'
import FileUploadField from '@/components/_ui/fileUploadField/FileUploadField.component'
import { Page } from '@/types'
import { TSchema, schema, FORM_DATA, TOP_FIlMS } from './FormElements.config'



const FormElements: Page = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { handleSubmit, control, reset, trigger, setValue, watch, formState: { isSubmitting, errors } } = useForm<TSchema>({
    resolver: yupResolver(schema),
  })

  console.log(watch(), errors)


  const onSubmit = (formData: TSchema) => {
    console.log({ formData })
  }


  const loadData = async () => {
    const [keys, values] = [Object.keys(FORM_DATA), Object.values(FORM_DATA)]
    keys.map((item: any, index: number) => setValue(item, values[index]))
    trigger()
  }


  return (
    <Container className='section-spacing-my'>
      <Grid container noValidate component='form' onSubmit={handleSubmit(onSubmit)} spacing={2}>

        {/* Actions */}
        <Grid item xs={12}>
          <Stack direction='row' justifyContent='end' spacing={1}>
            <Button variant='outlined' onClick={() => reset()}>Reset</Button>
            <Button variant='outlined' onClick={loadData}>Load Data</Button>
            <LoadingButton variant='contained' type='submit' loading={isSubmitting}>Submit</LoadingButton>
          </Stack>
        </Grid>

        {/* Text */}
        <Grid item xs={12} sm={6}>
          <InputField name='text' label='Text' control={control} />
        </Grid>

        {/* Number */}
        <Grid item xs={12} sm={6}>
          <InputField name='number' label='Number' type='number' control={control} />
        </Grid>

        {/* Email */}
        <Grid item xs={12} sm={6}>
          <InputField name='email' label='Email' type='email' control={control} />
        </Grid>

        {/* Phone */}
        <Grid item xs={12} sm={6}>
          <PhoneField name='phone' control={control} />
        </Grid>

        {/* Date Picker */}
        <Grid item xs={12} sm={6}>
          <Controller name='date' control={control}
            render={({ fieldState: { error }, field: { ref, value, onChange, ...restField } }) =>
              <MobileDatePicker
                {...restField}
                label='Date'
                inputRef={ref}
                value={value ? moment(value) : null}
                onChange={value => onChange(value?.toISOString())}
                slotProps={{
                  textField: { error: !!error, helperText: error?.message }
                }}
              />
            }
          />
        </Grid>

        {/* Time Picker */}
        <Grid item xs={12} sm={6}>
          <Controller name='time' control={control}
            render={({ fieldState: { error }, field: { ref, value, onChange, ...restField } }) =>
              <MobileTimePicker
                {...restField}
                label='Time'
                inputRef={ref}
                value={value ? moment(value) : null}
                onChange={value => onChange(value?.toISOString())}
                slotProps={{
                  textField: { error: !!error, helperText: error?.message }
                }}
              />
            }
          />
        </Grid>

        {/* URL */}
        <Grid item xs={12} sm={6}>
          <InputField name='url' label='URL' control={control} />
        </Grid>

        {/* Select Color */}
        <Grid item xs={12} sm={6}>
          <ColorField name='color' control={control} />
        </Grid>

        {/* Select */}
        <Grid item xs={12} sm={6}>
          <Controller name='select' control={control} defaultValue=''
            render={({ fieldState: { error }, field: { ref, ...restField } }) =>
              <FormControl error={!!error}>
                <InputLabel>Select</InputLabel>
                <Select {...restField} inputRef={ref} label='Select'>
                  <MenuItem value='option1'>Option 1</MenuItem>
                  <MenuItem value='option2'>Option 2</MenuItem>
                  <MenuItem value='option3'>Option 3</MenuItem>
                </Select>
                <FormHelperText>{error?.message}</FormHelperText>
              </FormControl>
            }
          />
        </Grid>

        {/* Multiple Select */}
        <Grid item xs={12} sm={6}>
          <Controller name='multipleSelect' control={control} defaultValue={[]}
            render={({ fieldState: { error }, field: { ref, ...restField } }) =>
              <FormControl error={!!error}>
                <InputLabel>Multiple select</InputLabel>
                <Select
                  {...restField}
                  multiple
                  inputRef={ref}
                  label='Multiple select'
                  renderValue={(selected) => {
                    const selectedItemsLabel = selected.map(selectedItem => TOP_FIlMS.find(item => item.id === selectedItem)?.label) || 'notFound'
                    return (
                      <Stack flexWrap='wrap' direction='row' gap={.5}>
                        {selectedItemsLabel.map((item, index) => <Chip key={index} label={item} size='medium' />)}
                      </Stack>
                    )
                  }}
                >
                  {TOP_FIlMS.map((item, index) =>
                    <MenuItem value={item.id} key={index}>
                      <Checkbox size='small' edge='start' disableRipple checked={restField.value.indexOf(item.id) > -1} />
                      <ListItemText primary={item.label} />
                    </MenuItem>
                  )}
                </Select>
                <FormHelperText>{error?.message}</FormHelperText>
              </FormControl>
            }
          />
        </Grid>

        {/* Autocomplete */}
        <Grid item xs={12} sm={6}>
          <Controller name='autocomplete' control={control}
            render={({ fieldState: { error }, field: { ref, value, onChange, ...restField } }) =>
              <Autocomplete
                {...restField}
                value={value || null}
                options={TOP_FIlMS}
                onChange={(_, value) => onChange(value)}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.label === value.label}
                renderInput={(params) => <TextField {...params} label='Autocomplete' inputRef={ref} error={!!error} helperText={error?.message} />}
              />
            }
          />
        </Grid>

        {/* Multiple Autocomplete */}
        <Grid item xs={12} sm={6}>
          <Controller name='multipleAutocomplete' control={control}
            render={({ fieldState: { error }, field: { ref, value, onChange, ...restField } }) =>
              <Autocomplete
                {...restField}
                multiple
                disableCloseOnSelect
                value={value || []}
                options={TOP_FIlMS}
                onChange={(_, value) => onChange(value)}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.label === value.label}
                renderInput={(params) => <TextField {...params} label='Multipel autocomplete' inputRef={ref} error={!!error} helperText={error?.message} />}
                renderOption={(props, option, { selected }) =>
                  <li {...props}>
                    <Checkbox edge='start' size='small' checked={selected} disableRipple/>
                    {option.label}
                  </li>
                }
              />
            }
          />
        </Grid>

        {/* Password */}
        <Grid item xs={12} sm={6}>
          <InputField name='password' label='Password' type={showPassword ? 'text' : 'password'} control={control}
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
          <InputField name='confirmPassword' label='Confirm Password' type={showPassword ? 'text' : 'password'} control={control}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowPassword(v => !v)}>
                  {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                </IconButton>
              )
            }}
          />
        </Grid>

        {/* Image */}
        <Grid item xs={12}>
          <ImageField name='image' label='Banner Image' placeholder='banner image' control={control} />
        </Grid>

        {/* File */}
        <Grid item xs={12} sm={6}>
          <FileUploadField name='file' label='File' accept='application/pdf' control={control} />
        </Grid>

        {/* Radio */}
        <Grid item xs={12} sm={6}>
          <Controller name='radio' control={control} defaultValue=''
            render={({ fieldState: { error }, field: { ref, ...restField } }) =>
              <FormControl error={!!error}>
                <FormLabel>Radio</FormLabel>
                <RadioGroup {...restField} row>
                  <FormControlLabel inputRef={ref} value='radio1' label='Radio 1' control={<Radio />} componentsProps={{ typography: { color: error ? 'error.main' : undefined } }} />
                  <FormControlLabel inputRef={ref} value='radio2' label='Radio 2' control={<Radio />} componentsProps={{ typography: { color: error ? 'error.main' : undefined } }} />
                </RadioGroup>
                <FormHelperText>{error?.message}</FormHelperText>
              </FormControl>
            }
          />
        </Grid>

        {/* Multiple Checkbox */}
        <Grid item xs={12} sm={6}>
          <Controller name='multipleCheckbox' control={control} defaultValue={[]}
            render={({ fieldState: { error }, field: { value, onChange, ref } }) =>
              <FormControl error={!!error}>
                <FormLabel>Multiple Checkbox</FormLabel>
                <FormGroup row>
                  {[{ label: 'Label 1', value: 'label1' }, { label: 'Label 2', value: 'label2' }].map((item, index) =>
                    <FormControlLabel
                      key={index}
                      label={item.label}
                      componentsProps={{ typography: { color: error ? 'error.main' : undefined } }}
                      control={<Checkbox inputRef={ref} checked={value.includes(item.value)} onChange={e => e.target.checked ? onChange([...value, item.value]) : onChange(value.filter((val) => val != item.value))} />}
                    />
                  )}
                </FormGroup>
                <FormHelperText>{error?.message}</FormHelperText>
              </FormControl>
            }
          />
        </Grid>

        {/* Single Checkbox */}
        <Grid item xs={12} sm={6}>
          <Controller name='singleCheckbox' control={control} defaultValue={false}
            render={({ fieldState: { error }, field: { ref, value, ...restField } }) =>
              <FormControl error={!!error}>
                <FormLabel>Single Checkbox</FormLabel>
                <FormControlLabel
                  label='Accept privacy & policy.'
                  componentsProps={{ typography: { color: error ? 'error.main' : undefined } }}
                  control={<Checkbox {...restField} inputRef={ref} checked={value} />}
                />
                <FormHelperText>{error?.message}</FormHelperText>
              </FormControl>
            }
          />
        </Grid>

        {/* Switch */}
        <Grid item xs={12} sm={6}>
          <Controller name='switch' control={control} defaultValue={false}
            render={({ fieldState: { error }, field: { ref, value, ...restField } }) =>
              <FormControl error={!!error}>
                <FormLabel>Switch</FormLabel>
                <FormControlLabel
                  label='Switch description'
                  componentsProps={{ typography: { color: error ? 'error.main' : undefined } }}
                  control={<Switch {...restField} inputRef={ref} checked={value} />}
                />
                <FormHelperText>{error?.message}</FormHelperText>
              </FormControl>
            }
          />
        </Grid>

        {/* Quantity */}
        <Grid item xs={12} sm={6}>
          <QuantityField
            name='quantity'
            control={control}
          />
        </Grid>

        {/* Description */}
        <Grid item xs={12}>
          <TextEditorField name='description' control={control} />
        </Grid>

      </Grid>
    </Container>
  )
}


FormElements.rootLayoutProps = {
  title: 'Form Elements',
  pageType: 'public',
}

export default FormElements