import React from "react";

import GoogleIcon from "@mui/icons-material/Google";
import { IconButton } from "@mui/material";
import AnimatedWrapper from "../wrappers/AnimatedWrapper";
import { NavLink } from "react-router-dom";
// import { size } from "../../lib/vars";

function GoogleLoginButton({ href }) {
  return (
    <AnimatedWrapper
      enterAnimation={{
        initial: { scale: 4, autoAlpha: 0.4 },
        animate: { scale: 1, autoAlpha: 1, duration: 0.3, ease: "power3.in" },
      }}
      exitAnimation={{
        animate: { scale: 1, autoAlpha: 0, duration: 0.3, ease: "power3.in" },
      }}
      className="flex"
    >
      <NavLink to={href}>
        <IconButton
          aria-label="google login"
          sx={{ width: "12rem", height: "12rem", fontSize: "5rem" }}
        >
          <GoogleIcon sx={{ fontSize: "inherit" }} />
        </IconButton>
      </NavLink>
    </AnimatedWrapper>
  );
}

export default GoogleLoginButton;
