// TransitionWrapper.js
import React from "react";
import { useLocation } from "react-router-dom";

import { SwitchTransition, Transition } from "react-transition-group";

import { gsap } from "gsap";

const FadeWrapper = ({ children }) => {

  const location = useLocation();
  return (
    <SwitchTransition>
      <Transition
        key={location.pathname}
        timeout={250}
        onEnter={(node) => {
          gsap.set(node, { autoAlpha: 0});
          gsap
            .timeline({ paused: true })
            .to(node, { autoAlpha: 1, duration: 0.25 })
            .play();
        }}
        onExit={(node) => {
          gsap
            .timeline({ paused: true })
            .to(node, {autoAlpha: 0, duration: 0.2 })
            .play();
        }}
      >
        {children}
      </Transition>
    </SwitchTransition>
  );


};

export default FadeWrapper;
