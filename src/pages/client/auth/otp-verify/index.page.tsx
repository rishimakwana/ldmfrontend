import {
  Container,
  IconButton,
  Stack,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { style } from "./OtpVerify.style";
// import { MuiOtpInput } from "mui-one-time-password-input";
import LoadingButton from "@mui/lab/LoadingButton";
import { LuArrowLeftCircle } from "react-icons/lu";
import OTP from "@/components/_ui/otpField/otpField.component";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schema, TSchema } from "./OtpVerify.config";
import { useRouter } from "next/navigation";

const OtpVerify = () => {
  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<any>({
    resolver: yupResolver(schema),
  });
  const [otp, setOtp] = useState("");

  const router = useRouter();

  const onSubmit = async (formData: TSchema) => {
    try {
      console.log("Form data:", formData);
      router.push("/client/auth/address");
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   setValue("otp", otp);
  // }, [otp, setValue]);

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
          noValidate
          sx={style.box}
          onSubmit={handleSubmit(onSubmit)}
        >
          <IconButton sx={style.icon}>
            <LuArrowLeftCircle />
          </IconButton>

          <Typography variant="h1" textAlign="center">
            Verify Your Account
            <Typography variant="body1" textAlign="center" sx={style.text}>
              An OTP has been sent to your mobile number ending in{" "}
              <Typography variant="body1" component="span" sx={style.span}>
                ******2244
              </Typography>{" "}
              and email address{" "}
              <Typography variant="body1" component="span" sx={style.span}>
                *******doe@gmail.com
              </Typography>
              . Please enter the OTP here to verify your account.
            </Typography>
          </Typography>

          {/* <MuiOtpInput
            length={6}
            gap={3}
            value={otp}
            onChange={handleOtpChange}
            sx={style.otpinput}
          /> */}
          <Stack sx={style.input}>
            <OTP value={otp} onChange={setOtp} setValue={setValue} length={6} />
          </Stack>
          <LoadingButton
            variant="contained"
            size="large"
            type="submit"
            loading={isSubmitting}
          >
            Submit
          </LoadingButton>
          <Typography textAlign="center">
            Didn’t receive the OTP? &nbsp;{" "}
            <MuiLink href="/auth/login" sx={style.textLink}>
              resend
            </MuiLink>
          </Typography>
        </Stack>
      </Container>
    </>
  );
};

export default OtpVerify;
