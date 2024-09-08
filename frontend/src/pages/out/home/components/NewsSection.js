import { useRef } from "react";
import React from 'react';
// import Post from "../../posts/Post";
import PostCollection from "../../../../components/elements/PostCollection";
// import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

// import Interactive from "./Interactive";

const NewsSection = ({ posts }) => {
  // const featuredPost = posts.find((post) => post.isFeatured);
  const otherPosts = posts.filter((post) => !post.isFeatured);

  // const containerRef = useRef();
  const scrollContainerRef = useRef(null);

  const scrollByAmount = (amount) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: amount,
        behavior: "smooth",
      });
    }
  };
  return (
    <>
      {/* {featuredPost && (
        <Post
          date={featuredPost.date}
          title={featuredPost.title}
          image={featuredPost.image}
          content={featuredPost.content}
          link={featuredPost.link}
          isFeatured={featuredPost.isFeatured}
        />
      )} */}
      <section id="container" className="relative w-full overflow-hidden mt-[5.05625rem]">
        {/* TODO: add section name add a page divider here! */}
        {/* <div className="max-w-container">
        </div> */}
        <div className="px-[1.25rem]">
          <div className="p-0 mb-[2.125625rem] flex-row grid grid-cols-12">
            <div className="col-span-12">
              <div className="flex flex-row justify-between items-center relative">
                <h1 className="text-pretty text-lg justify-start content-center items-center">
                  News
                </h1>
                <div>
                  <div className="flex w-full justify-end">
                    <IconButton aria-label="backwords" onClick={() => scrollByAmount(-300)}>
                      <ArrowBackIosRoundedIcon />
                    </IconButton>
                    <IconButton aria-label="forward" onClick={() => scrollByAmount(300)}>
                      <ArrowForwardIosRoundedIcon />
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PostCollection posts={otherPosts} scrollContainerRef={scrollContainerRef}/>
      </section>
    </>
  );
};

export default NewsSection;
