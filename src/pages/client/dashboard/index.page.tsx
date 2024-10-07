import { Typography } from "@mui/material";
import React from "react";

const Dashboard = () => {
  return (
    <>
      <Typography variant="h1">Client Dashboard</Typography>
    </>
  );
};

Dashboard.rootLayoutProps = {
  pageType: "protected",
  title: "Dashboard",
};
export default Dashboard;
