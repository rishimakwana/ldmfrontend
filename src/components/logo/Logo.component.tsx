import Link from "next/link";
import Image from "next/image";
import { Stack, SxProps, Typography } from "@mui/material";

import { style } from "./Logo.style";
import { useReduxSelector } from "@/hooks";
import { LogoProps } from "./Logo.type";

export default function Logo({ sx = {} }: LogoProps) {
  return (
    <Stack sx={{ ...style.root, ...sx } as SxProps} component={Link} href="/">
      <Stack sx={style.logo}>
        <Stack sx={style.iconBox}>S</Stack>
        <Typography sx={style.name}>SafeDox</Typography>
      </Stack>
    </Stack>
  );
}
