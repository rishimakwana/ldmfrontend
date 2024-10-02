import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Link as MuiLink,
  IconButton,
  Stack,
  Typography,
  Container,
  Grid,
  Autocomplete,
  TextField,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { yupResolver } from "@hookform/resolvers/yup";

import InputField from "@/components/_ui/inputField/InputField.component";

import { Page } from "@/types";

import { style } from "./Address.style";
import { TSchema, schema } from "./Address.config";
import { LuArrowLeftCircle } from "react-icons/lu";
import { useRouter } from "next/navigation";

const Address: Page = () => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = useForm<TSchema>({
    resolver: yupResolver(schema),
  });
  const { push } = useRouter();
  const onSubmit = async (formData: any) => {
    // const profile = await login({ ...formData }).unwrap();
    // setUser(profile);
    console.log(formData);
    push("/client/auth/add-password");
  };

  return (
    <>
      <style global jsx>{`
        main {
          display: flex;
          justify-content: center;
        }
      `}</style>

      <Container className="section-spacing-my">
        <Stack
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={style.box}
        >
          <IconButton
            sx={style.icon}
            onClick={() => push("/client/auth/otp-verify")}
          >
            <LuArrowLeftCircle />
          </IconButton>
          <Typography variant="h1" textAlign="center">
            Add Your Address
          </Typography>

          <Grid container spacing={3}>
            {/* State */}
            <Grid item xs={12} sm={12}>
              <InputField
                name="street"
                label="Street Address *"
                control={control}
              />
            </Grid>

            {/* Country */}
            <Grid item sm={12}>
              <InputField name="city" label="City *" control={control} />
            </Grid>

            {/* Zipcode */}
            <Grid item xs={12} sm={6}>
              <InputField name="zipcode" label="Zip Code *" control={control} />
            </Grid>

            {/* State */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="state"
                control={control}
                defaultValue=""
                render={({
                  fieldState: { error },
                  field: { ref, ...restField },
                }) => (
                  <FormControl error={!!error}>
                    <InputLabel>State *</InputLabel>
                    <Select {...restField} inputRef={ref} label="Select">
                      <MenuItem value="maharashtra">Maharashtra</MenuItem>
                      <MenuItem value="madhaya pradesh">
                        Madhaya Pradesh
                      </MenuItem>
                      <MenuItem value="uttar pradesh">Uttar Pradesh</MenuItem>
                    </Select>
                    <FormHelperText>{error?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>

          <LoadingButton variant="contained" size="large" type="submit">
            Next
          </LoadingButton>
        </Stack>
      </Container>
    </>
  );
};

Address.rootLayoutProps = {
  pageType: "auth",
  title: "Address",
};

export default Address;
