import { useEffect, useRef } from "react";
import { Avatar, List, Stack, Typography, Button } from "@mui/material";
import { MdCorporateFare } from "react-icons/md";

import Logo from "@/components/logo/Logo.component";
import NavItem from "@/components/navItem/NavItem.component";
import { style } from "./Sidebar.style";
import { useSidebarOptions } from "./Sidebar.hook";
import { useReduxDispatch, useReduxSelector } from "@/hooks/redux.hook";
import { formatToTitleCase } from "@/utils";
import { handleLogout } from "@/redux/slice/layout.slice";

export default function Sidebar() {
  const navRef = useRef<HTMLElement>();
  const profile = useReduxSelector((state) => state.layout.profile);
  const dispatch = useReduxDispatch();
  const sidebarOptions = useSidebarOptions();
  const name = profile?.fullName;

  useEffect(() => {
    const navElement = navRef.current!;
    const events = [
      ["mouseenter", "touchstart"],
      ["mouseleave", "touchend"],
    ];
    const handleOverflow = (value: boolean) =>
      (navElement.style.overflow = value ? "auto" : "hidden");

    events[0].map((event) =>
      navElement.addEventListener(event, () => handleOverflow(true))
    );
    events[1].map((event) =>
      navElement.addEventListener(event, () => handleOverflow(false))
    );

    return () => {
      events[0].map((event) =>
        navElement.removeEventListener(event, () => handleOverflow(true))
      );
      events[1].map((event) =>
        navElement.removeEventListener(event, () => handleOverflow(false))
      );
    };
  }, []);

  return (
    <Stack component="aside" sx={style.root}>
      {/* LOGO */}
      <Stack sx={style.logoContainer}>
        <Logo />
      </Stack>

      {/* MENUS */}
      <List
        component="nav"
        disablePadding
        sx={style.menuList}
        ref={navRef as any}
      >
        {sidebarOptions.map((item, index) => (
          <NavItem size="large" data={item} key={index} />
        ))}
      </List>

      {/* PROFILE */}
      <Stack sx={style.profileBox}></Stack>

      {/* Logout */}
      {/* <Stack mx={2}>
        <Button onClick={() => dispatch(handleLogout())}>Logout</Button>
      </Stack> */}
    </Stack>
  );
}
