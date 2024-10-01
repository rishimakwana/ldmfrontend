import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Link as MuiLink,
  IconButton,
  Stack,
  Typography,
  Container,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { yupResolver } from "@hookform/resolvers/yup";

import InputField from "@/components/_ui/inputField/InputField.component";
import { Page } from "@/types";
import { useLoginMutation } from "@/redux/api/auth.api";
import { style } from "./ForgetPassword.style";
import { schema, TSchema } from "@/pages/form-elements/FormElements.config";

const ForgetPassword: Page = () => {
  const [login] = useLoginMutation();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TSchema>({
    resolver: yupResolver(schema as any),
  });

  const onSubmit = async (formData: TSchema) => {
    // Handle the password reset logic here
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
            Forget Password
          </Typography>

          <Stack gap={2}>
            <InputField
              name="password"
              label="New Password"
              type={showPassword ? "text" : "password"}
              control={control}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowPassword((v) => !v)}>
                    {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                  </IconButton>
                ),
              }}
            />
          </Stack>

          <Stack gap={2}>
            <InputField
              name="confirmPassword"
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              control={control}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowPassword((v) => !v)}>
                    {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                  </IconButton>
                ),
              }}
            />
          </Stack>

          <LoadingButton
            variant="contained"
            size="large"
            type="submit"
            loading={isSubmitting}
          >
            Reset Password
          </LoadingButton>
        </Stack>
      </Container>
    </>
  );
};

ForgetPassword.rootLayoutProps = {
  pageType: "auth",
  title: "ForgetPassword",
};

export default ForgetPassword;
