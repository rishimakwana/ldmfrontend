import React from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import OtpInput from 'react-otp-input';
import { Grid } from '@mui/material';
import { OtpInputProps } from './OtpVerify.type';


function OtpInputField<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: OtpInputProps<TFieldValues, TName>): JSX.Element {
  const { control, name, numInputs, onChange, onBlur, ...restProps } = props

  return (
    <Grid item xs={3}>
      <Controller
        name={name}
        control={control}
        defaultValue={'' as any}
        render={({ field, fieldState: { error } }) => (
          <OtpInput
            shouldAutoFocus={true}
            value={field.value}
            onChange={(value) => {
              field.onChange(value);
              // @ts-ignore
              onChange && onChange()
            }}
            numInputs={numInputs}
            inputType="number"
            renderSeparator={<span>&nbsp;</span>}
            renderInput={(props) => (
              <input
                {...props}
                style={{
                  textAlign: 'center',
                  backgroundColor: '#E3E3E3',
                  borderRadius: 50,
                  width: 40,
                  height: 40,
                  margin: '0 5px',
                  fontSize: '18px',
                  border: error ? '1px solid red' : '1px solid #ced4da',
                }}
                {...restProps}
              />
            )}
          />
        )}
      />
    </Grid>
  );
};

export default OtpInputField;
