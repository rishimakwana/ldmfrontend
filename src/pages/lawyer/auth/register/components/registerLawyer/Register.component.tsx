import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Link as MuiLink,
  IconButton,
  Stack,
  Typography,
  Grid,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Button,
  FormLabel,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  TextField,
  Fade,
  CircularProgress,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { yupResolver } from "@hookform/resolvers/yup";
import PhoneField from "@/components/_ui/phoneField/PhoneField.component";
import { style } from "./Register.style";
import { schema, TSchema } from "./Register.config";
import InputField from "@/components/_ui/inputField/InputField.component";
import { US_STATES } from "@/data/UsStates";
import OtpInputField from "@/components/otpInput/OtpVerify.coimponent";
import { CheckPasswordStrength } from "@/components/passwordStrength/PasswordStrength.component";
import { useRouter } from "next/router";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import RegisterStepper from "../customStepper/CustomStepper.component";
import Image from "next/image";
import { useLawyerRegisterMutation } from "@/redux/api/auth.api";
import { setUser } from "../../../Auth.util";
import ImageField from "@/components/_ui/imageField/ImageField.component";
import { useUploadFileMutation } from "@/redux/api/common.api";

const steps = ["Personal Details", "Business Details"];

const RegisterComponent = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [verificationText, setVerificationText] = useState("");
  const [userId, setUserId] = useState("");

  const [register] = useLawyerRegisterMutation();
  const [uploadFile] = useUploadFileMutation();

  const {
    control,
    handleSubmit,
    getValues,
    watch,
    trigger,
    formState: { isSubmitting },
  } = useForm<TSchema>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (activeStep === 2) {
      const { phone = "", email = "" } = getValues();
      const phoneSuffix = phone?.slice(-4);
      const [localPart, emailDomain] = email?.split("@");
      const emailSuffix = localPart?.slice(-3);

      const message = `An OTP has been sent to your mobile number ending in ****${phoneSuffix} and email address ****@${emailSuffix}@${emailDomain}. Please enter the OTP here to verify your account.`;
      setVerificationText(message);
    }
  }, [activeStep, getValues]);

  const onSubmit = async (formData: TSchema) => {
    try {
      console.log("Form data:", formData);
      const {
        termsAccepted,
        otp,
        confirmPassword,
        firmName,
        street,
        city,
        zipCode,
        state,
      } = formData;

      const formDataToSend1 = {
        userId,
        firmName,
        street,
        city,
        zipCode,
        state,
      };

      const profile = await register(formDataToSend1).unwrap();
      setUser(profile);
    } catch (error) {
      console.log(error);
    }
  };

  const lawyerRegister = async () => {
    try {
      const {
        fullName,
        gender,
        phone = "",
        email = "",
        password,
        drivingLicenseFront,
        drivingLicenseBack,
      } = getValues();
      console.log(
        fullName,
        gender,
        phone,
        email,
        password,
        drivingLicenseFront,
        drivingLicenseBack
      );

      const front: any = await uploadFile({
        images: drivingLicenseFront,
      });
      const back: any = await uploadFile({
        images: drivingLicenseBack,
      });

      const response: any = await register({
        fullName,
        gender,
        phone,
        email,
        password,
        drivingLicenseFront: front.data.result[0].image,
        drivingLicenseBack: back.data.result[0].image,
      });

      console.log(response.data.id);
      setUserId(response.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const validateStepFields = async (fields: any) => {
    const isValid = await trigger(fields);
    return isValid;
  };

  const handleNext = async () => {
    const stepFields = [
      [
        "fullName",
        "gender",
        "phone",
        "email",
        "password",
        "confirmPassword",
        "drivingLicenseFront",
        "drivingLicenseBack",
      ],
      ["firmName", "street", "city", "zipCode", "state", "termsAccepted"],
    ];

    if (activeStep === 0) {
      lawyerRegister();
    }

    const isValid = await validateStepFields(stepFields[activeStep] || []);
    if (isValid) setActiveStep((prev) => prev + 1);
  };

  const passwordValue = watch("password", "");

  const getStepContent = useMemo(() => {
    switch (activeStep) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputField
                name="fullName"
                label="Full Name *"
                control={control}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="gender"
                control={control}
                defaultValue=""
                render={({
                  fieldState: { error },
                  field: { ref, ...restField },
                }) => (
                  <FormControl error={!!error}>
                    <InputLabel>Gender</InputLabel>
                    <Select {...restField} inputRef={ref} label="Select">
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="transgender">Transgender</MenuItem>
                    </Select>
                    <FormHelperText>{error?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <PhoneField name="phone" label="Phone *" control={control} />
            </Grid>

            <Grid item xs={12}>
              <InputField name="email" label="Email *" control={control} />
            </Grid>

            <Grid item xs={12}>
              <InputField
                name="password"
                label="Password *"
                type={showPassword ? "text" : "password"}
                control={control}
                inputProps={{ autoComplete: "new-password" }}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                    </IconButton>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <InputField
                name="confirmPassword"
                label="Confirm Password *"
                type={showConfirmPassword ? "text" : "password"}
                control={control}
                inputProps={{ autoComplete: "new-password" }}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      {showConfirmPassword ? (
                        <MdVisibility />
                      ) : (
                        <MdVisibilityOff />
                      )}
                    </IconButton>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <CheckPasswordStrength password={passwordValue} />
            </Grid>

            <Grid item xs={12}>
              <Typography py="6px" fontSize={14} variant="body1">
                Upload Driving License
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <ImageField
                    name="drivingLicenseFront"
                    placeholder="Driving License Front"
                    control={control}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <ImageField
                    name="drivingLicenseBack"
                    placeholder="Driving License Back"
                    control={control}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <InputField
                  name="firmName"
                  label="Legal Firm Name *"
                  control={control}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputField
                  name="street"
                  label="Street Address *"
                  control={control}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputField name="city" label="City *" control={control} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputField
                  name="zipCode"
                  label="Zip Code *"
                  control={control}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="state"
                  control={control}
                  render={({
                    fieldState: { error },
                    field: { ref, value, onChange, ...restField },
                  }) => (
                    <Autocomplete
                      {...restField}
                      options={US_STATES}
                      onChange={(_, value) => onChange(value?.label)}
                      getOptionLabel={(option) => option.label}
                      isOptionEqualToValue={(option, value) =>
                        option.label === value.label
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="State"
                          inputRef={ref}
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6} mt={2}>
              <Controller
                name="termsAccepted"
                control={control}
                defaultValue={false}
                render={({
                  fieldState: { error },
                  field: { ref, value, ...restField },
                }) => (
                  <FormControl error={!!error}>
                    <FormLabel>
                      I have read and accept the Terms & Conditions and Privacy
                      Policy.
                    </FormLabel>
                    <FormControlLabel
                      label="Accept privacy & policy."
                      componentsProps={{
                        typography: { color: error ? "error.main" : undefined },
                      }}
                      control={
                        <Checkbox
                          {...restField}
                          inputRef={ref}
                          checked={value}
                        />
                      }
                    />
                    <FormHelperText>{error?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
          </>
        );
      case 2:
        return (
          <>
            <Typography variant="h4">Verify Your Identity</Typography>
            <Typography variant="body1"> {verificationText}</Typography>
            <OtpInputField name="otp" control={control} numInputs={6} />
            <Typography variant="body1"> Didnt receive the OTP ? </Typography>
            <LoadingButton
              sx={style.resendOtp}
              variant="text"
              component="button"
            >
              <strong>Resend OTP</strong>
            </LoadingButton>
          </>
        );
    }
  }, [
    activeStep,
    control,
    passwordValue,
    showConfirmPassword,
    showPassword,
    verificationText,
  ]);

  return (
    <>
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={style.box}
      >
        <Stack>
          <Image
            src="/images/ldmslogo.svg"
            alt="logo"
            className="client-logo"
            height={20}
            width={150}
          />
          <Box sx={style.header}>
            {activeStep > 0 && (
              <Box onClick={handleBack}>
                <IoArrowBackCircleOutline />
              </Box>
            )}

            <Typography variant="h1" my={2} mx={2}>
              Register.
            </Typography>
          </Box>
        </Stack>

        {/* custom stepper */}
        <RegisterStepper activeStep={activeStep} steps={steps} />

        {/* Step Content */}
        <Box mb={2}>{getStepContent}</Box>

        <Box sx={style.handleButton}>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          {activeStep !== steps.length - 1 && (
            <Button
              variant="contained"
              color="primary"
              type="button"
              onClick={handleNext}
            >
              Next
            </Button>
          )}
        </Box>

        {activeStep === steps.length - 1 && (
          <LoadingButton
            variant="contained"
            size="large"
            type="submit"
            loading={isSubmitting}
          >
            Submit
          </LoadingButton>
        )}

        <Typography textAlign="center" mt={2}>
          Already have an account? &nbsp;
          <MuiLink component={Link} href="/auth/login">
            Login
          </MuiLink>
        </Typography>
      </Stack>
    </>
  );
};

export default RegisterComponent;
