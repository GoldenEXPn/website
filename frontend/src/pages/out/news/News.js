import React from "react";

import Post from "../../../components/elements/Post";
import PostCollection from "../../../components/elements/PostCollection";

import _news from "../../../asset/content/_news";
// const _post_content_path = "./content/news.json";

//it's better to not use parse

const News = () => {

  // Separate featured post and the rest
  const featuredPost = _news.find((post) => post.isFeatured);
  const otherPosts = _news.filter((post) => !post.isFeatured);

  return (
        <>
          {featuredPost && (
            <Post
              date={featuredPost.date}
              title={featuredPost.title}
              image={featuredPost.image}
              content={featuredPost.content}
              link={featuredPost.link}
              isFeatured={featuredPost.isFeatured}
            />
          )}
          {otherPosts.length > 0 && <PostCollection posts={otherPosts} />}
        </>
  );
};

export default News;
