import { useState } from "react";
import { Stack, IconButton, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import InputField from "@/components/_ui/inputField/InputField.component";
import { TSchema } from "@/pages/form-elements/FormElements.config";
import { CheckPasswordStrength } from "../passwordStrength/PasswordStrength.component";
import { style } from "./ForgetPassword.style";

interface PasswordResetFormProps {
  schema: any;
  onSubmit: (data: TSchema) => void;
  control: any;
  watch: any;

  isSubmitting: boolean;
  title: string;
}

const PasswordResetForm = ({
  schema,
  onSubmit,
  control,
  watch,
  isSubmitting,
  title,
}: PasswordResetFormProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const passwordValue = watch("password", "");

  return (
    <>
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

      <CheckPasswordStrength password={passwordValue} />

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
        {title}
      </LoadingButton>
    </>
  );
};

export default PasswordResetForm;
