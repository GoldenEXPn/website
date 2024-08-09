import React from "react";
import Post from "./Post";

//  TODO: const post_information = [{}, {}, {}];

const PostCollection = ({ posts, scrollContainerRef}) => {
  return (

    // flex flex-row flex-nowrap
    //px-40 does not make space on the each side
    //TODO: the height is not set for changing the viewport width, need to change
    //TODO: the width is dependable to the viewport
    //TODO: add padding
    //TODO: height should not be dependent on the change of the width
    //TODO: set parent height


    //TODO: instead of doing grid, i should do flex w-[var(--document-width)]
    /**
     * first and last should Have <div class="shrink-0 w-[var(--gutter-size)]"></div>
     */

    <div id='content-box' ref={scrollContainerRef}
        className="relative
        min-w-full scroll-px-[var(--gutter-size)]
        flex overflow-x-auto overflow-y-hidden snap-mandatory snap-x no-scrollbar overscroll-behavior-contain">
      <div className="shrink-0 w-[--gutter-size] snap-start"></div>
      {posts.map((post, index) => (
        <Post
          key={index}
          id={post.id}
          date={post.date}
          title={post.title}
          image={post.image}
          content={post.content}
          link={post.link}
          isFeatured={post.isFeatured}
          category={post.category}
          // className=''
        />
      ))}
      <div className="shrink-0 w-[--gutter-size]"></div>
    </div>
  );
};

export default PostCollection;
