import {
  checkEmailDuplication,
  checkNicknameDuplication,
  signup,
} from "../apis/user.js";
import {
  EMAIL_ERROR_MESSAGE,
  NICKNAME_ERROR_MESSAGE,
  PASSWORD_ERROR_MESSAGE,
} from "../constants/message.js";
import {
  EMAIL_REGEX,
  NICKNAME_REGEX,
  PASSWORD_REGEX,
} from "../constants/regex.js";
import "../components/Header.js";

const updateSignupBtnState = () => {
  if (
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid &&
    isNicknameValid
  ) {
    signupBtn.style.backgroundColor = "#7f6aee";
    signupBtn.style.cursor = "pointer";
    signupBtn.disabled = false;
  } else {
    signupBtn.style.backgroundColor = "#aca0eb";
    signupBtn.style.cursor = "not-allowed";
    signupBtn.disabled = true;
  }
};

let isEmailValid = false;
const emailInput = document.querySelector(".input-box__input.email");
const emailHelperText = document.querySelector(".input-box__helper-text.email");

emailInput.addEventListener("input", (e) => {
  const value = e.target.value.trim();

  if (value === "") {
    emailHelperText.textContent = EMAIL_ERROR_MESSAGE.REQUIRED;
    isEmailValid = false;
  } else if (!EMAIL_REGEX.test(value)) {
    emailHelperText.textContent = EMAIL_ERROR_MESSAGE.VALIDATION;
    isEmailValid = false;
  } else {
    emailHelperText.textContent = "";
    isEmailValid = true;
  }

  updateSignupBtnState();
});

let password = "";
let isPasswordValid = false;
const passwordInput = document.querySelector(".input-box__input.password");
const passwordHelperText = document.querySelector(
  ".input-box__helper-text.password"
);

passwordInput.addEventListener("input", (e) => {
  const value = e.target.value.trim();
  password = value;

  if (value === "") {
    passwordHelperText.textContent = PASSWORD_ERROR_MESSAGE.REQUIRED;
    isPasswordValid = false;
  } else if (!PASSWORD_REGEX.test(value)) {
    passwordHelperText.textContent = PASSWORD_ERROR_MESSAGE.VALIDATION;
    isPasswordValid = false;
  } else {
    passwordHelperText.textContent = "";
    isPasswordValid = true;
  }

  updateSignupBtnState();
});

let confirmPassword = "";
let isConfirmPasswordValid = false;
const confirmpasswordInput = document.querySelector(
  ".input-box__input.confirm-password"
);
const confirmpasswordHelperText = document.querySelector(
  ".input-box__helper-text.confirm-password"
);

confirmpasswordInput.addEventListener("input", (e) => {
  const value = e.target.value.trim();
  confirmPassword = value;

  if (value === "") {
    confirmpasswordHelperText.textContent =
      PASSWORD_ERROR_MESSAGE.CONFIRM_REQUIRED;
    isConfirmPasswordValid = false;
  } else if (password !== confirmPassword) {
    confirmpasswordHelperText.textContent = PASSWORD_ERROR_MESSAGE.CONFIRM_DIFF;
    isConfirmPasswordValid = false;
  } else {
    confirmpasswordHelperText.textContent = "";
    isConfirmPasswordValid = true;
  }

  updateSignupBtnState();
});

let isNicknameValid = false;
const nicknameInput = document.querySelector(".input-box__input.nickname");
const nicknameHelperText = document.querySelector(
  ".input-box__helper-text.nickname"
);

nicknameInput.addEventListener("input", (e) => {
  const value = e.target.value.trim();

  if (value === "") {
    nicknameHelperText.textContent = NICKNAME_ERROR_MESSAGE.REQUIRED;
    isNicknameValid = false;
  } else if (!NICKNAME_REGEX.test(value)) {
    nicknameHelperText.textContent = NICKNAME_ERROR_MESSAGE.VALIDATION;
    isNicknameValid = false;
  } else {
    nicknameHelperText.textContent = "";
    isNicknameValid = true;
  }

  updateSignupBtnState();
});

const signupBtn = document.querySelector(".signup-btn");

const form = document.querySelector(".content__form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const email = formData.get("email").trim();
  const password = formData.get("password").trim();
  const nickname = formData.get("nickname").trim();

  if (checkEmailDuplication(email)) {
    emailHelperText.textContent = EMAIL_ERROR_MESSAGE.DUPLICATION;
    isEmailValid = false;
    emailInput.focus();
    updateSignupBtnState();
    return;
  }

  if (checkNicknameDuplication(nickname)) {
    nicknameHelperText.textContent = NICKNAME_ERROR_MESSAGE.DUPLICATION;
    isNicknameValid = false;
    nicknameInput.focus();
    updateSignupBtnState();
    return;
  }

  signup({
    email,
    password,
    nickname,
    profileImg: profileImg || "/assets/default_profile.jpg",
  });

  alert("회원가입이 완료되었습니다.");
  window.location.href = "/";
});

let profileImg;
const profileUploader = document.querySelector("#profile-uploader");
const profilePreview = document.querySelector("#profilePreview");
const profileIcon = document.querySelector(".profile-icon");

profileUploader.addEventListener("change", function (event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const src = e.target.result;
      profileImg = src;
      profilePreview.src = src;
      profilePreview.classList.remove("hidden");
      if (profileIcon) {
        profileIcon.classList.add("hidden");
      }
    };

    reader.readAsDataURL(file);
  }
});
