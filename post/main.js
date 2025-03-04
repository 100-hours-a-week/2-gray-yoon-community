import { addView, getAllPosts } from "../apis/post.js";
import { formatTimestamp } from "../utils/format.js";
import "../components/Header.js";

const postsUl = document.querySelector(".content__posts");

const renderPosts = async () => {
  const posts = await getAllPosts();

  postsUl.innerHTML = "";

  const fragment = document.createDocumentFragment();

  posts.forEach((post) => {
    const postLi = document.createElement("li");
    postLi.classList.add("post");

    const { id, title, likes, comments, views, createdAt, author } = post;

    postLi.addEventListener("click", () => {
      window.location.href = `/post-detail/index.html?id=${id}`;
      addView(id);
    });

    postLi.innerHTML = `
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

    fragment.appendChild(postLi);
  });

  postsUl.appendChild(fragment);
};

renderPosts();
