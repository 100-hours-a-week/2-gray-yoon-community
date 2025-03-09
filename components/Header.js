import { getCurrentUser, logout } from "../apis/user.js";

class Header extends HTMLElement {
  constructor() {
    super();
    this.showPrevBtn = false;
    this.showProfileBtn = false;
    this.prevUrl = "";
    this.loadStyles();
  }

  async loadStyles() {
    try {
      const response = await fetch("/components/Header.css");
      const css = await response.text();

      const style = document.createElement("style");
      style.textContent = css;
      document.head.appendChild(style);
    } catch (error) {
      console.error("Failed to load Header styles:", error);
    }
  }

  static get observedAttributes() {
    return ["show-prev-btn", "show-profile-btn", "prev-url"];
  }

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
    this.updateContent();
  }

  connectedCallback() {
    this.updateContent();
  }

  async updateContent() {
    await this.render();
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

  async render() {
    const imgSrc = await this.getProfileImage();

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
              <img class="profile-img" src="${imgSrc}" alt="Profile" />
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

  async getProfileImage() {
    try {
      const currentUser = await getCurrentUser();
      return currentUser?.profileImg || "";
    } catch (error) {
      console.error("Failed to get profile image:", error);
      return "";
    }
  }
}

customElements.define("app-header", Header);

export default Header;
