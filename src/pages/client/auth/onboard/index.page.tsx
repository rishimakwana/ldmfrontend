import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Stack, Typography, Container } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";

import InputField from "@/components/_ui/inputField/InputField.component";
import { Page } from "@/types";
import { style } from "./Onboard.style";
import { schema, TSchema } from "./Onboard.config";
import { useRouter } from "next/navigation";
import { useGetProfileMutation } from "@/redux/api/user.api";
import { useRouter as getParams } from "next/router";

const Onboard: Page = () => {
  const name = "John Doe";

  const router = useRouter();
  const params = getParams();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [token, setToken] = useState("");
  const [getProfile] = useGetProfileMutation();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm<TSchema>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData: TSchema) => {
    console.log(formData);
    router.push(`/client/auth/address?token=${token}`);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (params.query.token) {
        console.log(params.query.token, "token");
        try {
          const profileData: any = await getProfile({
            token: params.query.token.toString(),
          }).unwrap();
          setToken(params.query.token.toString());
          setEmail(profileData.user.email);
          setPhone(profileData.user.phone);
          setValue("email", profileData.user.email);
          setValue("phone", profileData.user.phone);
          console.log("Profile data:", profileData.result);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };

    fetchProfile();
  }, [params.query.token, getProfile]);

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
              value={email}
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
              value={phone}
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
