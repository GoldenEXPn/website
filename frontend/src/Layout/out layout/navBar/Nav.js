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
import { iconMap } from "../../../lib/vars";
import {
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CALLBACK_URL,
} from "../../../api.js";
/**
 * Navigation Routing link content
 *    for the center-side navigation
 *    for the right-side navigation
 */

function Nav() {
  /**
   * Hook: nav content change from the bar to the drawer
   *       based on breakpoint
   */

  const theme = useTheme();
  const isNavBar = useMediaQuery(theme.breakpoints.up("medium"));
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const googleSignInUrl = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${GOOGLE_OAUTH_CALLBACK_URL}&prompt=consent&response_type=code&client_id=${GOOGLE_OAUTH_CLIENT_ID}&scope=openid%20email%20profile&access_type=offline`;
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
            <ListItem key={item.name}>
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
        {
          <ListItem key={"Sign in"} disablePadding>
            <ListItemButton
              component={NavLink}
              to={googleSignInUrl}
              // activeClassName="Mui-selected"
            >
              <ListItemIcon>{iconMap["Sign in"]}</ListItemIcon>
              <ListItemText primary={"Sign in"} />
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
          <div className="flex flex-1 justify-end text-center items-center space-x-2">
            <NavLink
              to={googleSignInUrl}
              end
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {"Sign in "}
              {iconMap["Sign in"]}
            </NavLink>
          </div>
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
