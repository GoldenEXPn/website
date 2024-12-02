//TODO: need to change
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useLocation } from "react-router-dom";

import { SwitchTransition, Transition } from "react-transition-group";

import { gsap } from "gsap";

const SizeWrapper = ({ children }) => {

  const location = useLocation();
  return (
    <SwitchTransition>
      <Transition
        key={location.pathname}
        timeout={250}
        onEnter={(node) => {
          // gsap.set(node, { autoAlpha: 0, scale: 0.8, xPercent: -100 });
          gsap.set(node, { autoAlpha: 0});
          gsap
            .timeline({ paused: true })
            .to(node, { autoAlpha: 1, duration: 0.25 })
            // .to(node, { scale: 1, duration: 0.25 })
            .play();
        }}
        onExit={(node) => {
          gsap
            .timeline({ paused: true })
            // .to(node, { scale: 0.8, duration: 0.2 })
            .to(node, {autoAlpha: 0, duration: 0.2 })
            .play();
        }}
      >
        {children}
      </Transition>
    </SwitchTransition>
  );


};

export default SizeWrapper;
