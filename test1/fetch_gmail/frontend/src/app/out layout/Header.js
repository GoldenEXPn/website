import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

import Nav from "../../components/navBar/Nav";

/**
   * Hook: for nav hide 
   *       based on scrolling
   */

function Header() {
  
  const [lastScrollY, setLastScrollY] = useState(0);
  const headerRef = useRef();

  const scrollThresholdU = 50;
  const scrollThresholdD = 275;

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    // Ignore small scroll changes
    if (lastScrollY > currentScrollY && lastScrollY - currentScrollY < scrollThresholdU) {
      return;
    }

    // Check for downward scroll and apply the downward threshold
    if (currentScrollY > lastScrollY && currentScrollY - lastScrollY < scrollThresholdD) {
      return;
    }

    // Scrolling down
    gsap.killTweensOf(headerRef.current);
    if (currentScrollY > lastScrollY) {
      gsap.to(headerRef.current, {
        y: -100, 
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    // Scrolling up
    } else {
      gsap.to(headerRef.current, {
        y: 0, 
        opacity: 1,
        duration: 0.5,
        ease: "power1.out",
      });
    }
    setLastScrollY(window.scrollY);

  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
      <header ref={headerRef} id="header" className="fixed inset-x-0 top-0 z-50">
        <Nav />
      </header>
  );
}

export default Header;
