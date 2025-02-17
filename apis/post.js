export const createPost = (postData) => {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  localStorage.setItem("posts", JSON.stringify([...posts, postData]));
};
