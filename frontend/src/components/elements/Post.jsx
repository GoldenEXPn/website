//TODO: lazyload image tend to take up the space,

//LazyLoad, try to make the render smoothly when scrolling down quickly, this would be a problem
//another solution is provide off-course a smaller image

import React from "react";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Post = ({
  id,
  category,
  date,
  title,
  image,
  content,
  link,
}) => {
  // const articleClass = isFeatured
  //   ? "post"
  //   : ;
  // const headerClass = isFeatured ? "major" : "";
  // const imageClass = isFeatured ? "image main" : "w-full h-full";
  // const buttonClass = isFeatured ? "button large" : "button";

  //

  //TODO: post size should not be dependent on the content
  return (
    <article
      className="relative w-[16.5rem] flex-none h-auto 
                        aspect-3/4 mr-[.84375rem]
                        medium:w-auto medium:h-[calc((((var(--document-width)-2.5rem-(0.84375rem*2))*4/3)/3))] medium:flex
                        justify-between snap-start rounded-s bg-clip-border group
                        "
    >
      {/* <div className="flex justify-between"> */}
      <a className="absolute w-full h-full
          rounded-s bg-clip-border overflow-hidden z-10" href={link}> </a>
        <div
          id="background"
          className="absolute w-full h-full
          rounded-s bg-clip-border overflow-hidden -z-10
          "
        > 
          
          <div className="w-full h-full transition-transform duration-300 ease-out group-hover:scale-102.5">
            <LazyLoadImage
              src={image}
              alt=""
              effect="blur"
              wrapperProps={{
                // If you need to, you can tweak the effect transition using the wrapper style.
                style: { transitionDelay: "0.8s" },
              }}
              placeholderSrc={"./images/download.jpeg"}
              className="relative w-full h-full object-cover"
            />
          </div>
          <div className="flex absolute to-bg-black-10 inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50 to-transparent object-cover"></div>
        </div>
        <div id="content" className="flex flex-col w-full h-full py-4 px-4 space-y-4">
          {/* TODO: make the top category and the date line up horizonally the same however the description */}
          <div
            id="category"
            className="flex w-full mb-auto justify-between items-center text-xs"
          >
            <div className="relative justify-start font-medium text-gray-600 px-3 py-1.5 rounded-full bg-gray-50 bg-opacity-75 backdrop-blur-sm">
              {category.title}
            </div>
            <span className="justify-end text-gray-600 px-3 py-1.5 rounded-full bg-gray-50 bg-opacity-75 backdrop-blur-sm">{date}</span>
          </div>
          <header className="text-gray-200 mt-auto leading-snug tracking-normal antialiased text-lg">
            <h2>{title}</h2>
          </header>
          {/* <p className="text-gray-200 text-pretty">{content}</p> */}

          {/* <div className="flex w-full justify-between items-center gap-x-2 text-xs">
        </div> */}
        </div>
      {/* </div> */}
    </article>
  );
};

export default Post;
