import { confirmPassword, getUserDataWithEmail } from "../apis/user.js";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../constants/regex.js";

const updateLoginBtnState = () => {
  if (isEmailValid && isPasswordValid) {
    loginBtn.style.backgroundColor = "#7f6aee";
    loginBtn.style.cursor = "pointer";
    loginBtn.disabled = false;
  } else {
    loginBtn.style.backgroundColor = "#aca0eb";
    loginBtn.style.cursor = "not-allowed";
    loginBtn.disabled = true;
  }
};

let isEmailValid = false;
const emailInput = document.querySelector(".input-box__input.email");
const emailHelperText = document.querySelector(".input-box__helper-text.email");

emailInput.addEventListener("input", (e) => {
  const value = e.target.value.trim();

  if (value === "") {
    emailHelperText.textContent = "이메일을 입력해주세요.";
    isEmailValid = false;
  } else if (!EMAIL_REGEX.test(value)) {
    emailHelperText.textContent = "올바른 이메일 주소 형식을 입력해주세요.";
    isEmailValid = false;
  } else {
    emailHelperText.textContent = "";
    isEmailValid = true;
  }

  updateLoginBtnState();
});

let isPasswordValid = false;
const passwordInput = document.querySelector(".input-box__input.password");
const passwordHelperText = document.querySelector(
  ".input-box__helper-text.password"
);

passwordInput.addEventListener("input", (e) => {
  const value = e.target.value.trim();

  if (value === "") {
    passwordHelperText.textContent = "비밀번호를 입력해주세요.";
    isPasswordValid = false;
  } else if (!PASSWORD_REGEX.test(value)) {
    passwordHelperText.textContent =
      "비밀번호는 8자 이상, 20자 이하이며, 대소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.";
    isPasswordValid = false;
  } else {
    passwordHelperText.textContent = "";
    isPasswordValid = true;
  }

  updateLoginBtnState();
});

const loginBtn = document.querySelector(".login-btn");

const form = document.querySelector(".content__form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const email = formData.get("email").trim();
  const password = formData.get("password").trim();

  if (!confirmPassword(email, password)) {
    passwordInput.focus();
    passwordHelperText.textContent = "비밀번호를 확인해주세요.";
    isPasswordValid = false;
    updateLoginBtnState();
    return;
  }

  localStorage.setItem(
    "currentUser",
    JSON.stringify(getUserDataWithEmail(email))
  );
  alert("로그인 성공");
  window.location.href = "/post/index.html";
});
