export const createPost = (postData) => {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  localStorage.setItem(
    "posts",
    JSON.stringify([
      ...posts,
      {
        ...postData,
        likes: 0,
        comments: 0,
        views: 0,
        date: Date.now(),
      },
    ])
  );
};

export const getAllPosts = () => {
  return JSON.parse(localStorage.getItem("posts")) || [];
};
