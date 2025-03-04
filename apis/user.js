import { apiRequest } from "./apiRequest.js";

export const getAllUsers = () => {
  return JSON.parse(localStorage.getItem("users"));
};

export const getUserDataWithEmail = (email) => {
  const allUsers = getAllUsers();

  return allUsers.find((user) => user.email === email);
};

// export const getCurrentUser = () => {
//   return JSON.parse(localStorage.getItem("currentUser"));
// };
export const getCurrentUser = async () => {
  const data = await apiRequest("/currentUser.json");

  return data.data;
};

export const updateCurrentUserInfo = async (nickname, profileImg) => {
  const currentUser = await getCurrentUser();

  localStorage.setItem(
    "currentUser",
    JSON.stringify({ ...currentUser, nickname, profileImg })
  );
};

export const updateCurrentUserPassword = async (password) => {
  const currentUser = await getCurrentUser();

  localStorage.setItem(
    "currentUser",
    JSON.stringify({ ...currentUser, password })
  );
};

export const signup = (data) => {
  const users = getAllUsers() || [];

  localStorage.setItem("users", JSON.stringify([...users, data]));
};
// export const signup = async (data) => {
//   const data = await apiRequest("/auth/signup", "POST", {
//     data,
//   });

//   return data;
// };

export const checkEmailDuplication = (email) => {
  const users = getAllUsers() || [];

  return !!users.find((user) => user.email === email);
};

export const checkNicknameDuplication = (nickname) => {
  const users = getAllUsers() || [];

  return !!users.find((user) => user.nickname === nickname);
};

export const confirmPassword = (email, password) => {
  const userData = getUserDataWithEmail(email);

  return userData?.password === password;
};

export const updatePassword = async (password) => {
  const currentUser = await getCurrentUser();
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
// export const updatePassword = async (password) => {
//   const data = await apiRequest("/user/me", "PATCH", {
//     data: {
//       password,
//     },
//   });

//   return data;
// };

export const updateUser = async (nickname, profileImg) => {
  const currentUser = await getCurrentUser();
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
// export const updateUser = async (id, nickname, profileImg) => {
//   const data = await apiRequest(`/user/${id}`, "PATCH", {
//     data: {
//       nickname,
//       profileImg,
//     },
//   });

//   return data;
// };

export const logout = () => {
  localStorage.removeItem("currentUser");
  window.location.href = "/index.html";
};
// export const logout = async () => {
//   const data = await apiRequest("/auth/logout", "POST");

//   return data;
// };

export const withdraw = async () => {
  const users = getAllUsers();
  const currentUser = await getCurrentUser();

  logout();
  localStorage.setItem(
    "users",
    JSON.stringify(users.filter((user) => user.email !== currentUser.email))
  );
};
// export const withdraw = async () => {
//   const data = await apiRequest("/user/me", "DELETE");

//   return data;
// };
