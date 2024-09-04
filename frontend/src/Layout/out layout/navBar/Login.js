// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";

import { NavLink } from "react-router-dom";

import iconMap from "../../../asset/iconMap";
import pages from "../../../pages";

//TODO: change login href

//TODO: prob name and the icon need more styling

const Login = () => {
  return (
    <div className="flex flex-1 justify-end">
      <NavLink
        to={pages.get('login').path}
        end
        className=
           "text-sm font-semibold leading-6 text-gray-900" 
      >
        {pages.get('login').name + " "}
        {iconMap[pages.get('login').name]}
      </NavLink>
    </div>
  );
};

export default Login;
