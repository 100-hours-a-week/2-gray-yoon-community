import { getAllUsers, signup } from "../apis/user.js";
import { EMAIL_REGEX, NICKNAME_REGEX } from "../constants/regex.js";

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

const checkEmailDuplication = (value) => {
  const users = getAllUsers();

  if (!users) return true;

  for (const user of users) {
    if (user.email === value) return false;
  }

  return true;
};

let isEmailValid = false;
const emailInput = document.querySelector(".input-box__input.email");
const emailHelperText = document.querySelector(".input-box__helper-text.email");

emailInput.addEventListener("change", (e) => {
  const value = e.target.value.trim();

  if (value === "") {
    emailHelperText.textContent = "이메일을 입력해주세요.";
    isEmailValid = false;
  } else if (!EMAIL_REGEX.test(value)) {
    emailHelperText.textContent = "올바른 이메일 주소 형식을 입력해주세요.";
    isEmailValid = false;
  } else if (!checkEmailDuplication(value)) {
    emailHelperText.textContent = "중복된 이메일입니다.";
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

passwordInput.addEventListener("change", (e) => {
  const value = e.target.value.trim();
  password = value;

  if (value === "") {
    passwordHelperText.textContent = "비밀번호를 입력해주세요.";
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

confirmpasswordInput.addEventListener("change", (e) => {
  const value = e.target.value.trim();
  confirmPassword = value;

  if (value === "") {
    confirmpasswordHelperText.textContent = "비밀번호를 한번더 입력해주세요.";
    isConfirmPasswordValid = false;
  } else if (password !== confirmPassword) {
    confirmpasswordHelperText.textContent = "비밀번호가 다릅니다.";
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

nicknameInput.addEventListener("change", (e) => {
  const value = e.target.value.trim();

  if (value === "") {
    nicknameHelperText.textContent = "닉네임을 입력해주세요.";
    isNicknameValid = false;
  } else if (!NICKNAME_REGEX.test(value)) {
    nicknameHelperText.textContent = "10글자 이내로 입력해주세요.(띄어쓰기 X)";
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

  signup({
    email,
    password,
    nickname,
    profileImg,
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
