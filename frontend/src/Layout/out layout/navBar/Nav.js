import React from "react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { useTheme } from "@emotion/react";
import {
  useMediaQuery,
  IconButton,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import Divider from "@mui/material/Divider";

import MenuIcon from "@mui/icons-material/Menu";

import Logo from "./Logo";

import pages from "../../../pages";
import Login from "./Login";
import iconMap from "../../../asset/iconMap";

/**
 * Navigation Routing link content
 *    for the center-side navigation
 *    for the right-side navigation
 */

function Nav() {
  // const routes_select_1 = [...pages.values()].filter(page => page.landing === true);
  // const pageArray = Array.from(pages.values());
  /**
   * Hook: nav content change from the bar to the drawer
   *       based on breakpoint
   */

  const theme = useTheme();
  const isNavBar = useMediaQuery(theme.breakpoints.up("medium"));
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // TODO: make a social page about all of the team members, provide social media link

  //this is the navbar format
  const main_navigation = (
    <div className={isNavBar ? "flex gap-x-12" : ""}>
      {Array.from(pages.values()).map((item) =>
        item.landing ? (
          <div
            key={item.name}
            // the active does not affect anything in the moment
            className={location.pathname === item.path ? "active" : ""}
          >
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `${isActive ? "active" : ""} ${
                  isNavBar
                    ? "text-sm font-semibold leading-6 text-gray-900"
                    : ""
                }`
              }
            >
              {item.name}
            </NavLink>
          </div>
        ) : null
      )}
    </div>
  );

  //This is the drawer format
  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => {
        setOpen(false);
      }}
    >
      <List>
        {Array.from(pages.values()).map((item) =>
          item.landing ? (
            <ListItem key={item.name} disablespadding="true">
              <ListItemButton
                component={NavLink}
                to={item.path}
                // activeClassName="Mui-selected"
              >
                <ListItemIcon>{iconMap[item.name]}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ) : null
        )}
      </List>
      <Divider variant="middle" />
      <List>
        {pages.get("login") &&
            <ListItem key={pages.get("login").name} disablePadding>
              <ListItemButton
                component={NavLink}
                to={pages.get("login").path}
                // activeClassName="Mui-selected"
              >
                <ListItemIcon>{iconMap[pages.get("login").name]}</ListItemIcon>
                <ListItemText primary={pages.get("login").name} />
              </ListItemButton>
            </ListItem>
          }
      </List>
    </Box>
  );

  return (
    <nav
      id="nav"
      className={`flex items-center justify-between 
                mx-4 my-4 p-6 h-16 large:px-8
                rounded-full backdrop-blur-sm shadow-sm 
                transition duration-100`}
    >
      {isNavBar ? (
        <>
          <Logo />
          {main_navigation}
          <Login />
        </>
      ) : (
        <>
          <Logo styling={isNavBar} />
          <IconButton
            id="navPanelToggle"
            aria-label="menu"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <MenuIcon />
          </IconButton>
        </>
      )}
      {!isNavBar && (
        <Drawer
          variant="temporary"
          anchor="right"
          open={open}
          onClose={() => setOpen(false)}
        >
          {DrawerList}
        </Drawer>
      )}
    </nav>
  );
}

export default Nav;
