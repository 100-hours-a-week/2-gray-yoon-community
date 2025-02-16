export const getAllUsers = () => {
  return JSON.parse(localStorage.getItem("users"));
};

export const signup = (data) => {
  const users = getAllUsers();

  if (users) {
    localStorage.setItem("users", JSON.stringify([...users, data]));
  } else {
    localStorage.setItem("users", JSON.stringify([data]));
  }
};
