// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";

import { NavLink } from "react-router-dom";

import iconMap from "../../../asset/iconMap";
import routes from "../../../asset/routes";

//TODO: change login href

//TODO: prob name and the icon need more styling

const Login = () => {
  const routes_select_1 = routes.find(route => route.name === 'Sign in');
  return (
    <div className="flex flex-1 justify-end">
      <NavLink
        to={routes_select_1.href}
        end
        className=
           "text-sm font-semibold leading-6 text-gray-900" 
      >
        {routes_select_1.name + " "}
        {iconMap[routes_select_1.name]}
      </NavLink>
    </div>
  );
};

export default Login;
