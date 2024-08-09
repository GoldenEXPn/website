import { useEffect, useRef } from "react";
import { gsap } from "gsap";


import Interactive from './Interactive';

import ArrowDownward from "@mui/icons-material/ArrowDownward";
// import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
// import Interactive from "./Interactive";

import MaxWidthWrapper from "../../wrappers/MaxWidthWrapper"

const Hero = ({ onButtonClick }) =>  {
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
    <div>
      <div ref={introRef} className="relative isolate h-screen flex items-center justify-center px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 small:py-48 large:py-56">

          <MaxWidthWrapper className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Smart Email
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Relax your toes and let SmartMail sort your emails
            </p>

            {/* TODO: fix this href */}
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <div
                className="rounded-full bg-indigo-600 px-6 py-6 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={onButtonClick}
              >
                <ArrowDownward />
              </div>
            </div>
          </MaxWidthWrapper>
        </div>
      </div>
      <Interactive/>
    </div>
  );
};

export default Hero;
