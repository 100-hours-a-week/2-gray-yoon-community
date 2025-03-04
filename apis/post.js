import { apiRequest } from "./apiRequest.js";
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
// export const createPost = async (postData) => {
//   const data = await apiRequest("/posts", "POST", {
//     data: postData,
//   });

//   return data;
// };

export const updatePost = (postData) => {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  localStorage.setItem(
    "posts",
    JSON.stringify(
      posts.map((post) => (post.id === postData.id ? postData : post))
    )
  );
};
// export const updatePost = async (postData) => {
//   const data = await apiRequest(`/posts/${postData.id}`, "PATCH", {
//     data: postData,
//   });

//   return data;
// };

// export const getAllPosts = () => {
//   return JSON.parse(localStorage.getItem("posts")) || [];
// };
export const getAllPosts = async () => {
  const data = await apiRequest("/posts.json");

  return data.data.posts;
};

// export const getPostWithId = (id) => {
//   const posts = getAllPosts();
//   return posts.find((post) => post.id === id);
// };
export const getPostWithId = async (id) => {
  const posts = await getAllPosts();

  return posts.find((post) => post.id === id);
};

export const addComment = async (id, content) => {
  const posts = await getAllPosts();

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
// export const addComment = async (id, content) => {
//   const data = await apiRequest(`/posts/${id}/comments`, "POST", {
//     data: {
//       content,
//     },
//   });

//   return data;
// };

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
// export const toggleLikes = async (postId) => {
//   const data = await apiRequest(`/posts/${postId}/likes`, "PATCH");

//   return data;
// };

export const deletePost = (id) => {
  const posts = getAllPosts();

  localStorage.setItem(
    "posts",
    JSON.stringify(posts.filter((post) => post.id !== id))
  );
};
// export const deletePost = async (id) => {
//   const data = await apiRequest(`/posts/${id}`, "DELETE");

//   return data;
// };
