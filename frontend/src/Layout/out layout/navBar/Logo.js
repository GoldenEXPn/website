import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import { NavLink } from "react-router-dom";
import pages from "../../../pages";

/**
 * Logo Contains the logo and it's path to the home page
 * @returns element with NavLink for home
 */

const Logo = () => {
  const introRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      introRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
      }
    );
  }, []);

  return (
    <div ref={introRef} className="flex flex-1">
      <NavLink
        to={pages.get('home').path}
        end
        className="-m-1.5 p-1.5"
      >
        <span className="sr-only">Home Page!</span>
        <img
          alt=""
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          className="h-8 w-auto"
        />
      </NavLink>
    </div>
  );
};

export default Logo;
