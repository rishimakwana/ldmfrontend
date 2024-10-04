import PageHeader from "@/components/pageHeader/PageHeader.component";
import { Typography } from "@mui/material";
import React from "react";

const UplaodDocuments = () => {
  return (
    <>
      <PageHeader heading="Uplaod Documents" />

      <Typography variant="h1">Upload Documents</Typography>
    </>
  );
};
UplaodDocuments.rootLayoutProps = {
  pageType: "protected",
  title: "Upload Documents",
};
export default UplaodDocuments;
