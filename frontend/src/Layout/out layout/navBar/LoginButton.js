// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
import React from 'react';

import { NavLink } from "react-router-dom";


const GOOGLE_OAUTH_CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
const GOOGLE_OAUTH_CALLBACK_URL = process.env.GOOGLE_OAUTH_CALLBACK_URL;

// import iconMap from "../../../asset/iconMap";

import { iconMap } from '../../../lib/vars.js';

//TODO: change login href

//TODO: prob name and the icon need more styling


// import { googleCallbackUri, googleClientId } from './config.ts';


const LoginButton = () => {
  const googleSignInUrl = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${GOOGLE_OAUTH_CALLBACK_URL}&prompt=consent&response_type=code&client_id=${GOOGLE_OAUTH_CLIENT_ID}&scope=openid%20email%20profile&access_type=offline`;
  return (
    <div className="flex flex-1 justify-end text-center items-center space-x-2">
      <NavLink
        to={googleSignInUrl}
        end
        className=
          "text-sm font-semibold leading-6 text-gray-900" 
      >
        {"Sign in "}
        {iconMap['Sign in']}
      </NavLink>
    </div>
  );
};

export default LoginButton;
