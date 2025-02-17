import { getCurrentUser } from "./user.js";

export const createPost = (postData) => {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  localStorage.setItem(
    "posts",
    JSON.stringify([
      ...posts,
      {
        ...postData,
        likes: [],
        comments: [],
        views: 0,
        date: Date.now(),
      },
    ])
  );
};

export const updatePost = (postData) => {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  localStorage.setItem(
    "posts",
    JSON.stringify(
      posts.map((post) => (post.id === postData.id ? postData : post))
    )
  );
};

export const getAllPosts = () => {
  return JSON.parse(localStorage.getItem("posts")) || [];
};

export const getPostWithId = (id) => {
  const posts = getAllPosts();
  return posts.find((post) => post.id === id);
};

export const addComment = (id, content) => {
  const posts = getAllPosts();

  localStorage.setItem(
    "posts",
    JSON.stringify(
      posts.map((post) =>
        post.id === id
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  author: getCurrentUser(),
                  date: Date.now(),
                  content,
                },
              ],
            }
          : post
      )
    )
  );
};

export const addView = (id) => {
  const posts = getAllPosts();

  localStorage.setItem(
    "posts",
    JSON.stringify(
      posts.map((post) =>
        post.id === id
          ? {
              ...post,
              views: post.views + 1,
            }
          : post
      )
    )
  );
};

export const toggleLikes = (postId, email) => {
  const posts = getAllPosts();

  localStorage.setItem(
    "posts",
    JSON.stringify(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.likes.includes(email)
                ? post.likes.filter((e) => e !== email)
                : [...post.likes, email],
            }
          : post
      )
    )
  );
};

export const deletePost = (id) => {
  const posts = getAllPosts();

  localStorage.setItem(
    "posts",
    JSON.stringify(posts.filter((post) => post.id !== id))
  );
};
