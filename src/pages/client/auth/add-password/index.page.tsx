import PasswordResetForm from "@/components/forgetPassword/ForgetPassword.component"; // Ensure this path is correct
import React, { useEffect } from "react";
import { schema, TSchema } from "./AddPassword.config";
import { Container, Stack, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { style } from "./AddPassword.style";
import { useRouter } from "next/navigation";

const AddPassword = () => {
  const { control, handleSubmit, formState, watch } = useForm<TSchema>({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const onSubmit = async (formData: TSchema) => {
    // Handle the password reset logic here

    console.log(formData);
  };

  useEffect(() => {
    const addressFormCompleted = sessionStorage.getItem("addressFormCompleted");

    if (!addressFormCompleted) {
      router.push("/client/auth/address");
    }
  }, [router]);

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
            Setup Password
          </Typography>
          <PasswordResetForm
            schema={schema}
            onSubmit={onSubmit}
            control={control}
            watch={watch}
            isSubmitting={formState.isSubmitting}
            title={"Next"}
          />
        </Stack>
      </Container>
    </>
  );
};

export default AddPassword;
