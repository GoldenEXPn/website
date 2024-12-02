// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
import React from 'react';


const GOOGLE_OAUTH_CLIENT_ID = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID;
const GOOGLE_REDIRECT_URL = process.env.REACT_APP_GOOGLE_REDIRECT_URL;

// import iconMap from "../../../asset/iconMap";

import { iconMap } from '../../../lib/vars.js';

//TODO: change login href

//TODO: prob name and the icon need more styling


// import { googleCallbackUri, googleClientId } from './config.ts';


const LoginButton = () => {
  const googleSignInUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
  `client_id=${encodeURIComponent(GOOGLE_OAUTH_CLIENT_ID)}` +
  `&redirect_uri=${encodeURIComponent(GOOGLE_OAUTH_CALLBACK_URL)}` +
  `&response_type=code` +
  `&scope=${encodeURIComponent('https://www.googleapis.com/auth/gmail.readonly')}` +
  `&access_type=offline` +
  `&prompt=consent`;

  return (
    <div className="flex flex-1 justify-end text-center items-center space-x-2">
        <a
            href={googleSignInUrl}
            className="text-sm font-semibold leading-6 text-gray-900"
        >
            {"Sign in "}
            {iconMap['Sign in']}
        </a>
    </div>
  );
};

export default LoginButton;
