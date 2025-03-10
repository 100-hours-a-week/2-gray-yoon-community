import { getCurrentUser, logout, updatePassword } from "../apis/user.js";
import { PASSWORD_ERROR_MESSAGE } from "../constants/message.js";
import { PASSWORD_REGEX } from "../constants/regex.js";

const profileBtn = document.querySelector(".navbar__profile-btn");

const profileImgSrc = getCurrentUser().profileImg;

const imgEl = document.createElement("img");
imgEl.classList.add("profile-img");
imgEl.alt = "프로필 이미지";
imgEl.src = profileImgSrc;

profileBtn.appendChild(imgEl);

const updatePasswordBtnState = () => {
  if (isNewPasswordValid && isConfirmPasswordValid) {
    changePasswordBtn.classList.add("enabled");
    changePasswordBtn.disabled = false;
  } else {
    changePasswordBtn.classList.remove("enabled");
    changePasswordBtn.disabled = true;
  }
};

let newPassword = "";
let isNewPasswordValid = false;
const newPasswordInput = document.querySelector(".input-box__input.password");
const newPasswordHelperText = document.querySelector(
  ".input-box__helper-text.password"
);

newPasswordInput.addEventListener("change", (e) => {
  const value = e.target.value.trim();
  newPassword = value;

  if (value === "") {
    newPasswordHelperText.textContent = PASSWORD_ERROR_MESSAGE.REQUIRED;
    isNewPasswordValid = false;
  } else if (!PASSWORD_REGEX.test(value)) {
    newPasswordHelperText.textContent = PASSWORD_ERROR_MESSAGE.VALIDATION;
    isNewPasswordValid = false;
  } else {
    newPasswordHelperText.textContent = "";
    isNewPasswordValid = true;
  }

  updatePasswordBtnState();
});

let isConfirmPasswordValid = false;
const confirmPasswordInput = document.querySelector(
  ".input-box__input.confirm-password"
);
const confirmPasswordHelperText = document.querySelector(
  ".input-box__helper-text.confirm-password"
);

confirmPasswordInput.addEventListener("change", (e) => {
  const value = e.target.value.trim();

  if (value === "") {
    confirmPasswordHelperText.textContent =
      PASSWORD_ERROR_MESSAGE.CONFIRM_REQUIRED;
    isConfirmPasswordValid = false;
  } else if (newPassword !== value) {
    confirmPasswordHelperText.textContent = PASSWORD_ERROR_MESSAGE.CONFIRM_DIFF;
    isConfirmPasswordValid = false;
  } else {
    confirmPasswordHelperText.textContent = "";
    isConfirmPasswordValid = true;
  }

  updatePasswordBtnState();
});

const changePasswordBtn = document.querySelector(".change-password-btn");

const form = document.querySelector(".content__form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const newPassword = formData.get("password").trim();

  updatePassword(newPassword);

  alert("비밀번호가 변경되었습니다.");
  window.location.href = "/";
});

const profileMenu = document.querySelector(".profile-menu");
const logoutBtn = document.querySelector(".logout-btn");

profileBtn.addEventListener("click", () => {
  profileMenu.classList.toggle("show");
});

document.addEventListener("click", (e) => {
  if (!profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
    profileMenu.classList.remove("show");
  }
});

logoutBtn.addEventListener("click", () => {
  logout();
});
