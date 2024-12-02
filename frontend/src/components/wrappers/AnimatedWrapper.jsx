import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

//TODO: change whether I need an exitAnimation 
const AnimatedWrapper = ({ children, enterAnimation, exitAnimation, ...props }) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const node = wrapperRef.current;
    // Set initial state with GSAP
    if (enterAnimation) {
      gsap.set(node, enterAnimation.initial);
    }

    // Create the enter animation
    const enterAnim = gsap.timeline({ paused: true }).to(node, enterAnimation.animate);

    // Create the exit animation
    const exitAnim = gsap.timeline({ paused: true }).to(node, exitAnimation.animate);

    // Play the enter animation on component mount
    enterAnim.play();
    // Play the exit animation on component unmount
    return () => {
      exitAnim.play();
    };
  }, [enterAnimation, exitAnimation]);

  return (
    <div ref={wrapperRef} {...props}>
      {children}
    </div>
  );
};

export default AnimatedWrapper;
