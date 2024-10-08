import PageHeader from "@/components/pageHeader/PageHeader.component";
import { Container, Typography, Grid } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import InputField from "@/components/_ui/inputField/InputField.component";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ConfirmationPopup from "@/components/confirmationPopup/ConfirmationPopup.component";
import { schema, TSchema } from "./Onboard.config";
import { style } from "./OnboardClient.style";
import DataCard from "@/components/datacard/DataCard.compoenet";
import { LawyerCardOptions } from "@/data/DashboardStats";
import { useClientOnboardMutation } from "@/redux/api/onboardClient.api";

const OnboardClient = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    reset,
  } = useForm<TSchema>({
    resolver: yupResolver(schema),
  });

  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(false); // State for loading button

  const router = useRouter();
  const [clientOnboard] = useClientOnboardMutation();

  const onSubmit = async (data: any) => {
    console.log(data);
    // router.push("/client/auth/otp-verify");
    setFormData(data);
    await clientOnboard(data).unwrap();

    setOpenPopup(true);
  };
  const handleConfirm = async () => {
    setLoading(true);
    console.log(formData);

    setTimeout(() => {
      reset();
      setOpenPopup(false);
      setLoading(false);
    }, 2000);
  };

  const handleClose = () => {
    setOpenPopup(false); // Close the popup
  };

  return (
    <>
      <PageHeader heading="" />
      <DataCard cardOptions={LawyerCardOptions} />
      <Container className="section-spacing-my">
        <Grid
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={style.box}
          container
          spacing={2}
        >
          <Grid item xs={12}>
            <Typography variant="h1" textAlign="start">
              Onboard Client
            </Typography>
            <Typography variant="body2" textAlign="start" sx={style.text}>
              Please enter the details below to onboard client
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <InputField
              name="fullName"
              label="Client Name *"
              control={control}
            />
          </Grid>

          {/* Email and Phone in the same row */}
          <Grid container item spacing={2}>
            <Grid item xs={12} sm={6}>
              <InputField
                name="email"
                label="Client Email *"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name="phone"
                label="Client Phone Number"
                control={control}
              />
            </Grid>
          </Grid>

          {/* Button row */}
          <Grid item xs={12} sx={style.button}>
            <LoadingButton
              variant="outlined"
              size="large"
              type="button"
              onClick={() => reset()}
              loading={isSubmitting}
            >
              Clear
            </LoadingButton>
            <LoadingButton
              variant="contained"
              size="large"
              type="submit"
              loading={isSubmitting}
            >
              Submit
            </LoadingButton>
          </Grid>
        </Grid>
      </Container>
      {/* Confirmation Popup */}
      <ConfirmationPopup
        open={openPopup}
        heading="Confirm Submission"
        subheading={`${formData?.name} will receive the access link in their registered mail "${formData?.email}".`}
        loading={loading}
        acceptButtonText="Confirm"
        cancelButtonText="Cancel"
        onAccept={handleConfirm}
        onCancel={handleClose}
      />
    </>
  );
};

export default OnboardClient;
