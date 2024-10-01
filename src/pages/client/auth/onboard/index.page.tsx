import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Stack, Typography, Container } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";

import InputField from "@/components/_ui/inputField/InputField.component";
import { Page } from "@/types";
import { useLoginMutation } from "@/redux/api/auth.api";
import { style } from "./Onboard.style";
import { schema, TSchema } from "./Onboard.config";

const Onboard: Page = () => {
  const [login] = useLoginMutation();
  const name = "John Doe";
  const client_email = "joan@gmail.com";
  const phone_number = "7894561231";

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm<TSchema>({
    resolver: yupResolver(schema),
  });

  setValue("email", client_email);
  setValue("phone", phone_number);

  const onSubmit = async (formData: TSchema) => {
    console.log(formData);
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
          <Typography variant="h1" textAlign="center">
            Welcome, {name}!
            <Typography variant="body1" textAlign="center" sx={style.text}>
              Complete your onboarding now in few simple steps
            </Typography>
          </Typography>

          <Stack gap={1}>
            <InputField
              name="email"
              label="Email Address"
              value={client_email}
              disabled
              control={control}
            />
            <Typography
              variant="caption"
              color="textSecondary"
              sx={style.caption}
            >
              Disabled
            </Typography>
          </Stack>
          <Stack gap={1}>
            <InputField
              name="phone"
              label="Mobile Number"
              value={phone_number}
              disabled
              control={control}
            />
            <Typography
              variant="caption"
              color="textSecondary"
              sx={style.caption}
            >
              Disabled
            </Typography>
          </Stack>

          <LoadingButton
            variant="contained"
            size="medium"
            type="submit"
            loading={isSubmitting}
          >
            Next
          </LoadingButton>
        </Stack>
      </Container>
    </>
  );
};

Onboard.rootLayoutProps = {
  pageType: "auth",
  title: "Onboard",
};

export default Onboard;
