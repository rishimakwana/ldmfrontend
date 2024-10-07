import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link as MuiLink, IconButton, Stack, Typography, Container, Box, } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { yupResolver } from "@hookform/resolvers/yup";
import ReCAPTCHA from "react-google-recaptcha";

import InputField from "@/components/_ui/inputField/InputField.component";
import { style } from "./Login.style";
import { useLawyerLoginMutation } from "@/redux/api/auth.api";
import { setUser } from "@/pages/lawyer/auth/Auth.util";
import { schema, TSchema } from "./Login.config";

const LoginComponent = () => {
  const [login] = useLawyerLoginMutation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [capVal, setCapVal] = useState<string>("");

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TSchema>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData: TSchema) => {
    const profile = await login({ ...formData }).unwrap();
    setUser(profile);
  };

  return (
    <>
      <Stack component='section' className="section-spacing-py" sx={style.root}>
        <Container>
          <Stack
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={style.box}
            autoComplete="off"
          >
            <Typography variant="h1" textAlign="center">
              Login
            </Typography>
            <Typography variant="body1" textAlign="center">
              Welcome to Safedox!
            </Typography>

            <Stack gap={2}>
              <InputField name="email" label="Email" control={control} />
              <InputField
                name="password"
                label="Password"
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
              <MuiLink textAlign="right" href="/lawyer/auth/forget-password">
                Forgot Password?
              </MuiLink>
            </Stack>

            <ReCAPTCHA
              sitekey="6LdJSFMqAAAAABN5zQnscHh7AFu1u08cLstoRiWT"
              onChange={(val: any) => setCapVal(val as any)}
            />

            <LoadingButton
              variant="contained"
              size="large"
              type="submit"
              loading={isSubmitting}
              disabled={!capVal}
            >
              Login
            </LoadingButton>

            <Typography textAlign="center">
              Don't have an account? &nbsp;{" "}
              <MuiLink component={Link} href="/lawyer/auth/register">
                Register
              </MuiLink>
            </Typography>
          </Stack>
        </Container>
      </Stack>
    </>
  );
};

export default LoginComponent;
