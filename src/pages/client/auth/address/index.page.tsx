import Link from "next/link";
import { useEffect, useState } from "react";
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
import { useRouter as useParams } from "next/router";
import { useClientDetailsMutation } from "@/redux/api/onboardClient.api";

const Address: Page = () => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = useForm<TSchema>({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const params = useParams();
  const [clientDetails] = useClientDetailsMutation();

  const onSubmit = async (formData: any) => {
    const token = params.query.token;
    const response: any = await clientDetails({
      ...formData,
      token,
      step1: 1,
    });
    // setUser(profile);
    console.log(response);
    router.push(`/client/auth/add-password?token=${token}`);
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
            onClick={() => router.push("/client/auth/onboard")}
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
