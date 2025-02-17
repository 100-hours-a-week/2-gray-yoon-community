import { getPostWithId, updatePost } from "../apis/post.js";
import { getCurrentUser } from "../apis/user.js";

const profileBtn = document.querySelector(".navbar__profile-btn");

const { profileImg: profileImgSrc } = getCurrentUser();

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

const { title, image, content } = post;

const updateSubmitBtnState = () => {
  if (isTitleValid && isContentValid) {
    submitBtn.style.backgroundColor = "#7f6aee";
    submitBtn.style.cursor = "pointer";
    submitBtn.disabled = false;
  } else {
    submitBtn.style.backgroundColor = "#aca0eb";
    submitBtn.style.cursor = "not-allowed";
    submitBtn.disabled = true;
  }
};

let isTitleValid = true;
const titleInput = document.querySelector(".input-box__input.title");
titleInput.value = title;
const titleHelperText = document.querySelector(".input-box__helper-text.title");

titleInput.addEventListener("input", (e) => {
  const value = e.target.value.trim();

  if (value === "") {
    titleHelperText.textContent = "제목을 입력해주세요.";
    isTitleValid = false;
  } else if (value.length > 26) {
    titleHelperText.textContent = "제목은 최대 26자까지 작성할 수 있습니다.";
    isTitleValid = false;
  } else {
    titleHelperText.textContent = "";
    isTitleValid = true;
  }

  updateSubmitBtnState();
});

let isContentValid = true;
const contentInput = document.querySelector(".input-box__input.content");
contentInput.value = content;
const contentHelperText = document.querySelector(
  ".input-box__helper-text.textarea"
);

contentInput.addEventListener("input", (e) => {
  const value = e.target.value.trim();

  if (value === "") {
    contentHelperText.textContent = "내용을 입력해주세요.";
    isContentValid = false;
  } else {
    contentHelperText.textContent = "";
    isContentValid = true;
  }

  updateSubmitBtnState();
});

let postImage;
const imageUploader = document.querySelector("#imageUploader");
const imagePreview = document.querySelector("#imagePreview");
const imagePreviewContainer = document.querySelector(
  ".image-preview-container"
);
postImage = image;
imagePreview.src = image;
imagePreview.classList.remove("hidden");
imagePreviewContainer.classList.remove("hidden");

imageUploader.addEventListener("change", (e) => {
  const file = e.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      postImage = e.target.result;
      imagePreview.src = postImage;
      imagePreview.classList.remove("hidden");
      imagePreviewContainer.classList.remove("hidden");
    };

    reader.readAsDataURL(file);
  }
});

const submitBtn = document.querySelector(".submit-btn");
const form = document.querySelector(".post-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const title = formData.get("title").trim();
  const content = formData.get("content").trim();

  updatePost({
    ...post,
    title,
    content,
    image: postImage || null,
  });

  alert("게시글이 수정되었습니다.");
  window.location.href = `/post-detail/index.html?id=${postId}`;
});

updateSubmitBtnState();

const profileMenu = document.querySelector(".profile-menu");
const logoutBtn = document.querySelector(".logout-btn");

// 메뉴 토글 기능
profileBtn.addEventListener("click", () => {
  profileMenu.classList.toggle("show");
});

// 메뉴 외부 클릭 시 닫기
document.addEventListener("click", (e) => {
  if (!profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
    profileMenu.classList.remove("show");
  }
});

logoutBtn.addEventListener("click", () => {
  logout();
});
