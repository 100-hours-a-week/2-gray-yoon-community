import { createPost } from "../apis/post.js";
import { getCurrentUser } from "../apis/user.js";

const profileBtn = document.querySelector(".navbar__profile-btn");

const profileImgSrc = getCurrentUser().profileImg;

const imgEl = document.createElement("img");
imgEl.classList.add("profile-img");
imgEl.alt = "프로필 이미지";
imgEl.src = profileImgSrc;

profileBtn.appendChild(imgEl);

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

let isTitleValid = false;
const titleInput = document.querySelector(".input-box__input.title");
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

let isContentValid = false;
const contentInput = document.querySelector(".input-box__input.content");
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

  createPost({
    id: crypto.randomUUID(),
    author: getCurrentUser(),
    title,
    content,
    image: postImage || null,
  });

  alert("게시글이 등록되었습니다.");
  window.location.href = "/post/index.html";
});
