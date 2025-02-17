import {
  addComment,
  deletePost,
  getPostWithId,
  toggleLikes,
} from "../apis/post.js";
import { getCurrentUser } from "../apis/user.js";
import { formatTimestamp } from "../utils/format.js";

const profileBtn = document.querySelector(".navbar__profile-btn");

const {
  profileImg: profileImgSrc,
  email: currentUserEmail,
  nickname: currentUserNickname,
} = getCurrentUser();

const imgEl = document.createElement("img");
imgEl.classList.add("profile-img");
imgEl.alt = "프로필 이미지";
imgEl.src = profileImgSrc;

profileBtn.appendChild(imgEl);

const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

const post = getPostWithId(postId);

if (!post) {
  window.location.href = "/post/index.html";
  alert("존재하지 않는 게시물입니다.");
}

const {
  title,
  author: { email, nickname, profileImg },
  date,
  image,
  content,
  likes,
  views,
  comments,
} = post;

document.querySelector(".content__title").innerText = title;
document.querySelector(".author-profile").src =
  profileImg || "default-profile.png";
document.querySelector(".author-nickname").innerText = nickname;
document.querySelector(".post-date").innerText = formatTimestamp(date);

const editBtns = document.querySelector(".edit-btns");

if (currentUserEmail === email) {
  editBtns.innerHTML = `
    <button class="edit">수정</button>
    <button class="delete">삭제</button>
  `;
}

document.querySelector(".edit-btns .edit").addEventListener("click", () => {
  window.location.href = `/post-edit/index.html?id=${postId}`;
});

const postImage = document.querySelector(".post-image");
if (image) {
  postImage.src = image;
  postImage.style.display = "block";
} else {
  postImage.style.display = "none";
}

document.querySelector(".post-content").innerText = content;
const likeCount = document.querySelector(".like-count");
likeCount.innerText = likes.length;
let likeEmails = [...likes];
document.querySelector(".view-count").innerText = views;
const commentCount = document.querySelector(".comment-count");
commentCount.innerText = comments.length;
let commentCountState = comments.length;

const commentList = document.querySelector(".comment-list");

const renderComments = () => {
  commentList.innerHTML = "";
  commentCount.innerText = comments.length;

  comments.forEach(({ author: { nickname, profileImg }, date, content }) => {
    const commentItem = document.createElement("li");
    commentItem.classList.add("comment-item");
    commentItem.innerHTML = `
      <div class="comment-info">
        <img src="${
          profileImg || "default-profile.png"
        }" alt="댓글 작성자 이미지" class="author-profile" />
        <div class="comment-box">
          <div class="authorAndDate">
            <p class="author-nickname">${nickname}</p>
            <p class="comment-date">${formatTimestamp(date)}</p>
          </div>
          <p class="comment-content">${content}</p>
        </div>
      </div>
    `;
    commentList.appendChild(commentItem);
  });
};

renderComments();

const likeBtn = document.querySelector(".like-btn.metadata-box");
likeBtn.addEventListener("click", () => {
  toggleLikes(postId, currentUserEmail);
  if (likeEmails.includes(currentUserEmail)) {
    likeEmails = likeEmails.filter((email) => email !== currentUserEmail);
    likeBtn.style.backgroundColor = "#d9d9d9";
    likeBtn.style.color = "#000";
  } else {
    likeEmails = [...likeEmails, currentUserEmail];
    likeBtn.style.backgroundColor = "#7f6aee";
    likeBtn.style.color = "#fff";
  }

  likeCount.innerText = likeEmails.length;
});

const commentForm = document.querySelector(".comment-form");
const commentInput = document.querySelector(".comment-input");

commentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const content = formData.get("comment").trim();

  if (content.trim() === "") return;

  addComment(postId, content);
  commentCountState++;

  commentInput.value = "";

  const commentItem = document.createElement("li");
  commentItem.classList.add("comment-item");
  commentItem.innerHTML = `
      <div class="comment-info">
        <img src="${profileImgSrc}" alt="댓글 작성자 이미지" class="author-profile" />
        <div class="comment-box">
          <div class="authorAndDate">
            <p class="author-nickname">${currentUserNickname}</p>
            <p class="comment-date">${formatTimestamp(Date.now())}</p>
          </div>
          <p class="comment-content">${content}</p>
        </div>
      </div>
    `;
  commentList.appendChild(commentItem);

  commentCount.innerText = commentCountState;
});

const deleteBtn = document.querySelector(".edit-btns .delete");
const deleteModal = document.getElementById("delete-modal");
const confirmDelete = document.getElementById("confirm-delete");
const cancelDelete = document.getElementById("cancel-delete");

deleteBtn.addEventListener("click", () => {
  deleteModal.classList.add("show");
  document.body.style.overflow = "hidden";
});

cancelDelete.addEventListener("click", () => {
  deleteModal.classList.remove("show");
  document.body.style.overflow = "auto";
});

confirmDelete.addEventListener("click", () => {
  deletePost(postId);

  window.location.href = "/post/index.html";
});
