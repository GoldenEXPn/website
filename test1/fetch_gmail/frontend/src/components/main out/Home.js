import React from "react";
import Hero from "./home/Hero";

import NewsSection from "./home/NewsSection";
import FaqSection from "./home/FaqSection";

import { useRef } from "react";
import _home from "../../asset/content/_home";
import _question from "../../asset/content/_question";

const Home = () => {
  //TODO: I can literally see this initial state, need to fix.

  const contentRef = useRef(null);

  const scrollToContent = () => {
    contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Separate featured post and the rest

  return (
    <>
      <Hero onButtonClick={scrollToContent} />
      <section id="about" ref={contentRef} className="w-full">
        <h2 className="mx-auto justify-center w-full text-center"> Start Sorting your emails in minutes! </h2>
      </section>
      <NewsSection posts={_home} />
      <FaqSection questions={_question}/>
    </>
  );
};

export default Home;
