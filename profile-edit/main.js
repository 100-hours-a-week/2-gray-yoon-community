import { getCurrentUser, updateUser, withdraw } from "../apis/user.js";
import { NICKNAME_ERROR_MESSAGE } from "../constants/message.js";
import { NICKNAME_REGEX } from "../constants/regex.js";
import "../components/Header.js";

const { email, nickname, profileImg } = await getCurrentUser();

document.querySelector(".email").textContent = email;
document.querySelector("#nickname").value = nickname;
document.querySelector("#profilePreview").src = profileImg;
document.querySelector("#profilePreview").classList.remove("hidden");

let newProfileImg = profileImg;
const profileUploader = document.querySelector("#profile-uploader");
const profilePreview = document.querySelector("#profilePreview");

profileUploader.addEventListener("change", (e) => {
  const file = e.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      newProfileImg = e.target.result;
      profilePreview.src = newProfileImg;
      profilePreview.classList.remove("hidden");
    };
    reader.readAsDataURL(file);

    updateButtonState();
  }
});

let isNicknameValid = true;
const nicknameInput = document.querySelector("#nickname");
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

  updateButtonState();
});

const updateButtonState = () => {
  if (isNicknameValid) {
    editBtn.classList.add("enabled");
    editBtn.disabled = false;
  } else {
    editBtn.classList.remove("enabled");
    editBtn.disabled = true;
  }
};

const editBtn = document.querySelector(".edit-btn");
editBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const newNickname = nicknameInput.value.trim();

  if (!isNicknameValid) return;

  isNicknameValid = false;
  updateButtonState();

  imgEl.src = newProfileImg;

  updateUser(newNickname, newProfileImg);

  showToastMessage();
});

const showToastMessage = () => {
  const toast = document.querySelector(".toast-message");
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
};

const withdrawModal = document.getElementById("withdraw-modal");
const cancelBtn = document.querySelector(".modal-cancel");
const confirmBtn = document.querySelector(".modal-confirm");

const withdrawBtn = document.querySelector(".withdraw-btn");
withdrawBtn.addEventListener("click", () => {
  withdrawModal.classList.remove("hidden");
});

cancelBtn.addEventListener("click", () => {
  withdrawModal.classList.add("hidden");
});

confirmBtn.addEventListener("click", () => {
  withdraw();
  alert("회원 탈퇴가 완료되었습니다.");
  window.location.href = "/index.html";
});
