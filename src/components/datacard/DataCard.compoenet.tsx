import { Container, Stack, Typography, Grid, } from "@mui/material";
import React from "react";
import { style } from "./DataCard.style";
import { DataCardProps } from "./DataCard.type";



const DataCard = ({ cardOptions }: DataCardProps) => {

  return (
    <>
      <Container>
        <Grid container spacing={2} sx={style.grid}>
          {cardOptions.map((data, index) => (
            <Grid key={index} item xs={12} sm={6} lg={4}>
              <Stack sx={style.box} bgcolor={data.color} spacing={1}>
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
