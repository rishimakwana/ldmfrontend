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
import React from "react";
import { CARD_OPTIONS } from "./DataCard.hook";
import { style } from "./DataCard.style";

const DataCard = () => {
  const router = useRouter();

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={2} sx={style.grid}>
          {CARD_OPTIONS.map((data, index) => (
            <Grid key={index} item xs={12} sm={6} lg={4}>
              <Stack sx={style.stack} bgcolor={data.color} spacing={1}>
                {/* Render Icon */}
                {data.Icon && (
                  <Stack alignItems="start">
                    <data.Icon size="2.5rem" color="white" />
                  </Stack>
                )}

                {/* Numbers */}
                <Typography
                  color="white.main"
                  variant="h1"
                  fontWeight={600}
                  textAlign="start"
                >
                  {data.numbers}
                </Typography>

                {/* Label */}
                <Typography
                  color="white.main"
                  variant="h3"
                  fontWeight={300}
                  textAlign="start"
                >
                  {data.label}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default DataCard;
