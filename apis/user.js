export const getAllUsers = () => {
  return JSON.parse(localStorage.getItem("users"));
};

export const getUserDataWithEmail = (email) => {
  const allUsers = getAllUsers();

  return allUsers.find((user) => user.email === email);
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("currentUser"));
};

export const updateCurrentUserInfo = (nickname, profileImg) => {
  const currentUser = getCurrentUser();

  localStorage.setItem(
    "currentUser",
    JSON.stringify({ ...currentUser, nickname, profileImg })
  );
};

export const updateCurrentUserPassword = (password) => {
  const currentUser = getCurrentUser();

  localStorage.setItem(
    "currentUser",
    JSON.stringify({ ...currentUser, password })
  );
};

export const signup = (data) => {
  const users = getAllUsers();

  if (users) {
    localStorage.setItem("users", JSON.stringify([...users, data]));
  } else {
    localStorage.setItem("users", JSON.stringify([data]));
  }
};

export const confirmPassword = (email, password) => {
  const userData = getUserDataWithEmail(email);

  return userData?.password === password;
};

export const updatePassword = (password) => {
  const currentUser = getCurrentUser();
  const users = getAllUsers();

  updateCurrentUserPassword(password);

  localStorage.setItem(
    "users",
    JSON.stringify(
      users.map((user) =>
        user.email === currentUser.email
          ? {
              ...user,
              password,
            }
          : user
      )
    )
  );
};

export const updateUser = (nickname, profileImg) => {
  const currentUser = getCurrentUser();
  const users = getAllUsers();

  updateCurrentUserInfo(nickname, profileImg);

  localStorage.setItem(
    "users",
    JSON.stringify(
      users.map((user) =>
        user.email === currentUser.email
          ? {
              ...user,
              nickname,
              profileImg,
            }
          : user
      )
    )
  );
};

export const logout = () => {
  localStorage.removeItem("currentUser");
  window.location.href = "/index.html";
};

export const withdraw = () => {
  const users = getAllUsers();
  const currentUser = getCurrentUser();

  logout();
  localStorage.setItem(
    "users",
    JSON.stringify(users.filter((user) => user.email !== currentUser.email))
  );
};
