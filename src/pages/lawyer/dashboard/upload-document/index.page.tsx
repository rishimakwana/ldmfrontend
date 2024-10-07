import InputField from "@/components/_ui/inputField/InputField.component";
import PageHeader from "@/components/pageHeader/PageHeader.component";
import { LoadingButton } from "@mui/lab";
import {
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import { style } from "./UplaodDocuments.style";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema, TSchema } from "./UploadDocuments.config";
import FileUploadField from "@/components/_ui/fileUploadField/FileUploadField.component";
import CustomFileUploadField from "@/components/_ui/customFIleUplaod/CustomFIleUplaod";

const UplaodDocuments = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    reset,
  } = useForm<TSchema>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: TSchema) => {
    console.log(data);
    // router.push("/client/auth/otp-verify");
  };

  const handleFileSubmit = (file: File) => {
    console.log("Uploading file:", file);
  };

  return (
    <>
      <PageHeader heading="Uplaod Documents" />
      <Container>
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
              Upload Document
            </Typography>
            <Typography variant="body2" textAlign="start" sx={style.text}>
              Please enter the details below to upload document{" "}
            </Typography>
          </Grid>

          {/* Email and Phone in the same row */}
          <Grid container item spacing={2}>
            <Grid item xs={12} sm={6}>
              <InputField name="name" label="Client Name *" control={control} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name="clientId"
                label="Client ID *"
                control={control}
              />
            </Grid>
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
                label="Client Phone Number *"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField name="city" label="City *" control={control} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField name="state" label="State *" control={control} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="docs"
                control={control}
                defaultValue=""
                render={({
                  fieldState: { error },
                  field: { ref, ...restField },
                }) => (
                  <FormControl fullWidth error={!!error}>
                    <InputLabel>Document Type *</InputLabel>
                    <Select
                      {...restField}
                      inputRef={ref}
                      label="Document Type *"
                    >
                      <MenuItem value="pdf">PDF</MenuItem>
                      <MenuItem value="csv">CSV</MenuItem>
                      <MenuItem value="xls">XLS</MenuItem>{" "}
                    </Select>
                    <FormHelperText>{error?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name="docName"
                label="Document Name *"
                control={control}
              />
            </Grid>
            <Grid item sm={12}>
              <CustomFileUploadField
                name="file"
                control={control}
                label="Upload your document"
                onSubmit={handleFileSubmit}
              />
            </Grid>
          </Grid>

          {/* Button row */}
          <Grid item xs={12} sx={style.button}>
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
      </Container>{" "}
    </>
  );
};

export default UplaodDocuments;

UplaodDocuments.rootLayoutProps = {
  pageType: "dashboard",
  title: "UplaodDocuments",
};
