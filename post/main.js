import { addView, getAllPosts } from "../apis/post.js";
import { getCurrentUser } from "../apis/user.js";
import { formatTimestamp } from "../utils/format.js";

const profileBtn = document.querySelector(".navbar__profile-btn");

const profileImgSrc = getCurrentUser().profileImg;

const imgEl = document.createElement("img");
imgEl.classList.add("profile-img"); // 스타일 적용을 위해 클래스 추가
imgEl.alt = "프로필 이미지";
imgEl.src = profileImgSrc;

profileBtn.appendChild(imgEl);

const postsUl = document.querySelector(".content__posts");

const allPosts = getAllPosts();

const renderPosts = (posts) => {
  postsUl.innerHTML = "";

  posts.forEach((post) => {
    const postLi = document.createElement("li");
    postLi.classList.add("post");

    const { id, title, likes, comments, views, date, author } = post;

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
          <p class="date">${formatTimestamp(date)}</p>
        </div>
      </div>
      <div class="post__author">
        <p class="name">${author.nickname || "익명"}</p>
      </div>
    `;

    postsUl.appendChild(postLi);
  });
};

renderPosts(allPosts);
