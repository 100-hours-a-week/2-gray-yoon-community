// Header 컴포넌트 클래스
class Header extends HTMLElement {
  constructor() {
    super();
    this.showPrevBtn = false;
    this.showProfileBtn = false;
    this.prevUrl = "";
    this.loadStyles();
  }

  // CSS 로드 메서드 추가
  async loadStyles() {
    try {
      // 현재 스크립트의 위치를 기준으로 CSS 파일의 경로를 설정
      const response = await fetch("/components/Header.css");
      const css = await response.text();

      // style 태그 생성 및 추가
      const style = document.createElement("style");
      style.textContent = css;
      document.head.appendChild(style);
    } catch (error) {
      console.error("Failed to load Header styles:", error);
    }
  }

  static get observedAttributes() {
    return ["show-prev-btn", "show-profile-btn", "prev-url"]; // 관찰할 속성 목록
  }

  // 속성이 변경될 때 실행
  attributeChangedCallback(name, _, newValue) {
    switch (name) {
      case "show-prev-btn":
        this.showPrevBtn = newValue === "true";
        break;
      case "show-profile-btn":
        this.showProfileBtn = newValue === "true";
        break;
      case "prev-url":
        this.prevUrl = newValue;
        break;
    }
    this.render();
  }

  // 컴포넌트가 DOM에 추가될 때 실행
  connectedCallback() {
    this.render();
    if (this.showProfileBtn) {
      this.setupProfileMenu();
    }
  }

  setupProfileMenu() {
    const profileBtn = this.querySelector(".navbar__profile-btn");
    const profileMenu = this.querySelector(".profile-menu");
    const logoutBtn = this.querySelector(".logout-btn");

    if (profileBtn && profileMenu) {
      profileBtn.addEventListener("click", () => {
        profileMenu.classList.toggle("hidden");
      });
    }

    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        logout();
      });
    }
  }

  render() {
    this.innerHTML = `
      <header class="navbar">
        <div class="navbar__content">
          ${
            this.showPrevBtn
              ? `
            <a class="prev-btn" href="${this.prevUrl}">
              <i class="fa-solid fa-chevron-left"></i>
            </a>
          `
              : ""
          }
          <h1 class="navbar__title">아무 말 대잔치</h1>
          ${
            this.showProfileBtn
              ? `
            <button class="navbar__profile-btn">
              <img class="profile-img" src="${this.getProfileImage()}" alt="Profile" />
            </button>
            <div class="profile-menu hidden">
              <ul class="profile-menu-list">
                <li><a href="/profile-edit/index.html">회원정보수정</a></li>
                <li><a href="/password-edit/index.html">비밀번호수정</a></li>
                <li>
                  <button class="logout-btn">로그아웃</button>
                </li>
              </ul>
            </div>
          `
              : ""
          }
        </div>
      </header>
    `;
  }

  getProfileImage() {
    try {
      const currentUser = getCurrentUser();
      return currentUser?.profileImg || "";
    } catch (error) {
      console.error("Failed to get profile image:", error);
      return "";
    }
  }
}

// 컴포넌트 등록
customElements.define("app-header", Header);

// getCurrentUser와 logout 함수 import
import { getCurrentUser, logout } from "../apis/user.js";

export default Header;
