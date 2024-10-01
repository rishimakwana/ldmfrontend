import Link from "next/link";
import Image from "next/image";
import { Stack, SxProps, Typography } from "@mui/material";

import { style } from "./Logo.style";
import { useReduxSelector } from "@/hooks";
import { LogoProps } from "./Logo.type";

export default function Logo({ sx = {} }: LogoProps) {
  const organization = useReduxSelector((state) => state.organization);

  return (
    <Stack sx={{ ...style.root, ...sx } as SxProps} component={Link} href="/">
      {organization.logo ? (
        <Image
          src={organization.logo}
          alt="logo"
          className="client-logo"
          height={50}
          width={250}
          priority
        />
      ) : (
        <Stack sx={style.logo}>
          <Stack sx={style.iconBox}>S</Stack>
          <Typography sx={style.name}>SafeDox</Typography>
        </Stack>
      )}
    </Stack>
  );
}
