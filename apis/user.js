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

export const logout = () => {
  localStorage.removeItem("currentUser");
  window.location.href = "/index.html";
};
