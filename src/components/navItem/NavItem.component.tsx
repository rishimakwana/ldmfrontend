import { useState } from "react";
import { useRouter } from "next/router";
import {
  Collapse,
  List,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from "@mui/material";

import Link from "next/link";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { NavItemProps } from "./NavItem.type";
import { makeStyle } from "./NavItem.style";
import { useReduxDispatch } from "@/hooks/redux.hook";
import { handleLogout } from "@/redux/slice/layout.slice";

export default function NavItem(props: NavItemProps) {
  const { data, isChildren, onClick, size = "small", ...restProps } = props;
  const [open, setOpen] = useState(false);
  const dispatch = useReduxDispatch();

  const router = useRouter();
  const style = makeStyle(size, isChildren);
  const link = data.link?.replace("/lawyer/dashboard/", "") || "";
  const isActive = link && router.pathname.replace("/lawyer/dashboard/", "").startsWith(link);

  const handleItemClick = (el: React.MouseEvent<HTMLLIElement>) => {
    setOpen(!open);
    if (data.label === "Sign Out") {
      dispatch(handleLogout());
    }
    onClick && onClick(el);
  };

  return (
    <>
      {/* @ts-ignore */}
      <MenuItem
        {...restProps}
        sx={style.root}
        component={Link}
        href={data.link || "#"}
        className={isActive ? "active" : ""}
        scroll={!(data.link === "#" || data.link === undefined)}
        onClick={handleItemClick}
      >
        {data.Icon && (
          <ListItemIcon sx={style.itemIcon}>
            <data.Icon className="icon-lg" />
          </ListItemIcon>
        )}
        <ListItemText primary={data.label} sx={style.itemText} />
        {data.children && (open ? <MdExpandLess /> : <MdExpandMore />)}
      </MenuItem>

      {/* Children */}
      {data.children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {data.children.map((item, index) => (
              <NavItem data={item as any} isChildren key={index} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}
