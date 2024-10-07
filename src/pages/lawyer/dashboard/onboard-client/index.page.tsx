import PageHeader from "@/components/pageHeader/PageHeader.component";
import {
  Container,
  FormControl,
  IconButton,
  Link as MuiLink,
  MenuItem,
  Select,
  Stack,
  Typography,
  Grid,
} from "@mui/material";
import router, { useRouter } from "next/router";
import React, { useState } from "react";
import { style } from "./OnboardClient.style";
import { CARD_OPTIONS } from "./component/DataCard.hook";
import DataCard from "./component/DataCard.compoenet";
import { LoadingButton } from "@mui/lab";
import InputField from "@/components/_ui/inputField/InputField.component";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schema, TSchema } from "./Onboard.config";
import ConfirmationPopup from "@/components/confirmationPopup/ConfirmationPopup.component";

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

  const onSubmit = async (data: TSchema) => {
    console.log(data);
    setFormData(data); // Store the form data
    // router.push("/client/auth/otp-verify");

    setOpenPopup(true); // Open the confirmation popup
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
      <PageHeader heading="Onboard" />
      <DataCard />
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
            <InputField name="name" label="Client Name *" control={control} />
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

OnboardClient.rootLayoutProps = {
  pageType: "protected",
  title: "On-Board Client",
};
export default OnboardClient;
