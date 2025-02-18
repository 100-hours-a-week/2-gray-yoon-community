import { getCurrentUser, updateUser, withdraw } from "../apis/user.js";
import { NICKNAME_REGEX } from "../constants/regex.js";

const profileBtn = document.querySelector(".navbar__profile-btn");

const profileImgSrc = getCurrentUser().profileImg;

const imgEl = document.createElement("img");
imgEl.classList.add("profile-img");
imgEl.alt = "프로필 이미지";
imgEl.src = profileImgSrc;

profileBtn.appendChild(imgEl);

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

const { email, nickname, profileImg } = getCurrentUser();

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

// 닉네임 입력 및 유효성 검사
let isNicknameValid = true;
const nicknameInput = document.querySelector("#nickname");
const nicknameHelperText = document.querySelector(
  ".input-box__helper-text.nickname"
);

nicknameInput.addEventListener("input", (e) => {
  const value = e.target.value.trim();

  if (value === "") {
    nicknameHelperText.textContent = "닉네임을 입력해주세요.";
    isNicknameValid = false;
  } else if (!NICKNAME_REGEX.test(value)) {
    nicknameHelperText.textContent = "닉네임은 최대 10자까지 가능합니다.";
    isNicknameValid = false;
  } else {
    nicknameHelperText.textContent = "";
    isNicknameValid = true;
  }

  updateButtonState();
});

// 버튼 활성화 상태 업데이트
const updateButtonState = () => {
  if (isNicknameValid) {
    editBtn.classList.add("enabled");
    editBtn.disabled = false;
  } else {
    editBtn.classList.remove("enabled");
    editBtn.disabled = true;
  }
};

// 수정하기 버튼 클릭 시
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

// 수정 완료 토스트 메시지 표시
const showToastMessage = () => {
  const toast = document.querySelector(".toast-message");
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
};

// 모달 요소 가져오기
const withdrawModal = document.getElementById("withdraw-modal");
const cancelBtn = document.querySelector(".modal-cancel");
const confirmBtn = document.querySelector(".modal-confirm");

// 회원 탈퇴 버튼 클릭 시 모달 표시
const withdrawBtn = document.querySelector(".withdraw-btn");
withdrawBtn.addEventListener("click", () => {
  withdrawModal.classList.remove("hidden");
});

// 취소 버튼 클릭 시 모달 닫기
cancelBtn.addEventListener("click", () => {
  withdrawModal.classList.add("hidden");
});

// 확인 버튼 클릭 시 회원 탈퇴 처리 후 로그인 페이지로 이동
confirmBtn.addEventListener("click", () => {
  withdraw(); // 회원탈퇴 API 호출
  alert("회원 탈퇴가 완료되었습니다.");
  window.location.href = "/index.html";
});
