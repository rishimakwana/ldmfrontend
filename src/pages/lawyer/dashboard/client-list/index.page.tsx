import PageHeader from "@/components/pageHeader/PageHeader.component";
import { Typography } from "@mui/material";
import React from "react";

const ClientList = () => {
  return (
    <>
      <PageHeader heading="ClientList" />

      <Typography variant="h1">Client List</Typography>
    </>
  );
};

ClientList.rootLayoutProps = {
  pageType: "protected",
  title: "Client List",
};
export default ClientList;
