import { getCurrentUser } from "../apis/user.js";

const profileBtn = document.querySelector(".navbar__profile-btn");

const profileImgSrc = getCurrentUser().profileImg;

const imgEl = document.createElement("img");
imgEl.classList.add("profile-img"); // 스타일 적용을 위해 클래스 추가
imgEl.alt = "프로필 이미지";
imgEl.src = profileImgSrc;

profileBtn.appendChild(imgEl);
