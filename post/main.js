import { addView, getAllPosts } from "../apis/post.js";
import { formatTimestamp } from "../utils/format.js";
import "../components/Header.js";

const createPostTemplate = (post) => {
  const { title, likes, comments, views, createdAt, author } = post;

  return `
    <div class="post__content">
      <h4 class="title">${title}</h4>
      <div class="info">
        <div class="info__metadata">
          <p class="likes">좋아요 ${likes.length}</p>
          <p class="comments">댓글 ${comments.length}</p>
          <p class="views">조회수 ${views}</p>
        </div>
        <p class="date">${formatTimestamp(createdAt)}</p>
      </div>
    </div>
    <div class="post__author">
      <p class="name">${author.nickname || "익명"}</p>
    </div>
  `;
};

const createPostElement = (post) => {
  const postLi = document.createElement("li");
  postLi.classList.add("post");

  postLi.addEventListener("click", () => {
    window.location.href = `/post-detail/index.html?id=${post.id}`;
    addView(post.id);
  });

  postLi.innerHTML = createPostTemplate(post);

  return postLi;
};

const renderPosts = async () => {
  const postsUl = document.querySelector(".content__posts");
  const posts = await getAllPosts();

  const fragment = document.createDocumentFragment();
  posts.forEach((post) => {
    const postLi = createPostElement(post);
    fragment.appendChild(postLi);
  });

  postsUl.appendChild(fragment);
};

renderPosts();
