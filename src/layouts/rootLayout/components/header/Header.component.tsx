import Link from "next/link";
import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  Container,
  Divider,
  Menu,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { MdOutlineKeyboardArrowDown, MdCorporateFare } from "react-icons/md";

import Logo from "@/components/logo/Logo.component";
import NavItem from "@/components/navItem/NavItem.component";
import { style } from "./Header.style";
import { useReduxDispatch, useReduxSelector } from "@/hooks/redux.hook";
import { useOptions } from "./Header.hook";
import { handleLogout } from "@/redux/slice/layout.slice";

export default function Header() {
  const { isLoggedIn, isWebsiteLoading } = useReduxSelector(
    (state) => state.layout
  );
  const { profile } = useReduxSelector((state) => state.layout);
  const [profileAnchorEl, setProfileAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const { MENU_OPTIONS, PROFILE_OPTIONS_1, PROFILE_OPTIONS_2 } = useOptions();
  const dispatch = useReduxDispatch();
  const name =
    profile.role === "admin"
      ? profile.organizationName
      : `${profile.firstName} ${profile.lastName}`;

  const handleCloseProfileMenu = () => {
    setProfileAnchorEl(null);
  };

  return (
    <Stack component="header" sx={style.root}>
      <Container sx={style.container}>
        {/* Logo */}
        <Logo sx={style.logo} />

        {/* Menu */}
        <Stack component="nav" sx={style.menuContainer}>
          {MENU_OPTIONS.map((item, index) => (
            <ButtonBase
              LinkComponent={Link}
              href={item.link}
              sx={style.menuItem}
              key={index}
            >
              {item.label}
            </ButtonBase>
          ))}
        </Stack>

        <Divider orientation="vertical" sx={style.divider} />

        {/* Profile */}
        <Stack direction="row" alignItems="center" gap={1.5}>
          {isWebsiteLoading ? (
            <Skeleton variant="rounded" width={150} height={43} />
          ) : isLoggedIn ? (
            <Stack
              component={ButtonBase}
              sx={style.profileBox}
              onClick={(e) => setProfileAnchorEl(e.currentTarget)}
            >
              <Avatar sx={style.avatar}>
                {profile.role === "admin" && <MdCorporateFare />}
              </Avatar>
              <Typography sx={style.profileName} noWrap>
                {name}
              </Typography>
              <Box
                component={MdOutlineKeyboardArrowDown}
                color="text.disabled"
              />
            </Stack>
          ) : (
            <>
              <Button
                variant="outlined"
                href="/lawyer/auth/login"
                LinkComponent={Link}
                sx={style.button}
              >
                Login
              </Button>
              <Button
                variant="contained"
                href="lawyer/auth/register"
                LinkComponent={Link}
                sx={style.button}
              >
                Register
              </Button>
            </>
          )}
        </Stack>

        {/* Profile Menu */}
        {isLoggedIn && (
          <Menu
            anchorEl={profileAnchorEl}
            open={!!profileAnchorEl}
            onClose={handleCloseProfileMenu}
            keepMounted
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
          >
            {PROFILE_OPTIONS_1.map((item, index) => (
              <NavItem
                data={item}
                key={index}
                onClick={handleCloseProfileMenu}
              />
            ))}
            <Divider />
            {PROFILE_OPTIONS_2.map((item, index) => (
              <NavItem
                data={item}
                key={index}
                onClick={() =>
                  item.label === "Logout"
                    ? dispatch(handleLogout())
                    : handleCloseProfileMenu()
                }
              />
            ))}
          </Menu>
        )}
      </Container>
    </Stack>
  );
}
