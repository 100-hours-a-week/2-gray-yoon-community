import { updatePassword } from "../apis/user.js";
import { PASSWORD_REGEX } from "../constants/regex.js";

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
    newPasswordHelperText.textContent = "* 비밀번호를 입력하세요";
    isNewPasswordValid = false;
  } else if (!PASSWORD_REGEX.test(value)) {
    newPasswordHelperText.textContent =
      "* 비밀번호는 8~20자, 대소문자/숫자/특수문자를 포함해야 합니다.";
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
    confirmPasswordHelperText.textContent = "* 비밀번호를 한번 더 입력하세요";
    isConfirmPasswordValid = false;
  } else if (newPassword !== value) {
    confirmPasswordHelperText.textContent = "* 비밀번호가 일치하지 않습니다.";
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
