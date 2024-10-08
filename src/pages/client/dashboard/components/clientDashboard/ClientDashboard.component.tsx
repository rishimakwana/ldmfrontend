import DataCard from "@/components/datacard/DataCard.compoenet";
import PageHeader from "@/components/pageHeader/PageHeader.component";
import { ClientCardOptions } from "@/data/DashboardStats";
import { Container, Stack, } from "@mui/material";
import React from "react";

const ClientDashboard = () => {

  return (
    <>
      <Stack component='section' className="section-spacing-py">
        <Container>
          <PageHeader heading="Dashboard" />
          <DataCard cardOptions={ClientCardOptions} />
        </Container>
      </Stack>
    </>
  );
};


export default ClientDashboard;
