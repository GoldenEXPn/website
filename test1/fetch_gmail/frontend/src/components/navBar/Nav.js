import React from "react";
import { useState} from "react";
import { NavLink, useLocation } from "react-router-dom";

import { useTheme } from "@emotion/react";
import { useMediaQuery, 
        IconButton, 
        Drawer,
        Box, 
        List,
        ListItem,
        ListItemButton,
        ListItemIcon,
        ListItemText,} from "@mui/material";

import Divider from "@mui/material/Divider";

import MenuIcon from "@mui/icons-material/Menu";

import Logo from "./Logo";
import routes from "../../asset/routes";
import Login from "./Login";
import iconMap from "../../asset/iconMap";


/**
 * Navigation Routing link content 
 *    for the center-side navigation
 *    for the right-side navigation
 */

function Nav() {
  const routes_select_1 = routes.filter(route => parseInt(route.id) <= 2);
  const routes_select_2 = routes.filter(route => parseInt(route.id) > 2);
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
      {routes_select_1.map((item) => (
        <div
          key={item.name}
          className={location.pathname === item.href ? "active" : ""}
        >
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `${isActive ? "active" : ""} ${
                isNavBar ? "text-sm font-semibold leading-6 text-gray-900" : ""
              }`
            }
          >
            {item.name}
          </NavLink>
        </div>
      ))}
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
        {routes_select_1.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              component={NavLink}
              to={item.href}
              // activeClassName="Mui-selected"
            >
              <ListItemIcon>{iconMap[item.name]}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider variant="middle" />
      <List>
        {routes_select_2 && routes_select_2.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              component={NavLink}
              to={item.href}
              // activeClassName="Mui-selected"
            >
              <ListItemIcon>{iconMap[item.name]}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
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
/* <ul className="icons">
        <li>
          <a href="#" className="icon brands fa-twitter">
            <span className="label">Twitter</span>
          </a>
        </li>
        <li>
          <a href="#" className="icon brands fa-facebook-f">
            <span className="label">Facebook</span>
          </a>
        </li>
        <li>
          <a href="#" className="icon brands fa-instagram">
            <span className="label">Instagram</span>
          </a>
        </li>
        <li>
          <a href="#" className="icon brands fa-github">
            <span className="label">GitHub</span>
          </a>
        </li>
      </ul> */

export default Nav;
