import PasswordResetForm from "@/components/forgetPassword/ForgetPassword.component"; // Ensure this path is correct
import React, { useEffect } from "react";
import { schema, TSchema } from "./AddPassword.config";
import { Container, Stack, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { style } from "./AddPassword.style";
import { useRouter as useParams } from "next/router";
import { useRouter } from "next/navigation";
import { useClientDetailsMutation } from "@/redux/api/onboardClient.api";

const AddPassword = () => {
  const { control, handleSubmit, formState, watch, getValues } =
    useForm<TSchema>({
      resolver: yupResolver(schema),
    });
  const params = useParams();
  const router = useRouter();
  const [clientDetails] = useClientDetailsMutation();

  const onSubmit = async (formData: any) => {
    const token: any = params.query.token;
    const { password } = getValues();
    const response: any = await clientDetails({
      password,
      token,
      step2: 2,
    });
    console.log(formData);
    if (response) {
      alert("Success");
      router.push("http://localhost:3000/lawyer/auth/login");
    }
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
