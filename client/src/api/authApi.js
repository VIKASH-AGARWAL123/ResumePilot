import API from "./axios";

export const signupUser = async (userData) => {
  const { data } = await API.post("/auth/signup", userData);
  return data;
};

export const loginUser = async (userData) => {
  const { data } = await API.post("/auth/login", userData);
  return data;
};
export const logoutUser = async () => {
  const { data } = await API.post("/auth/logout");

  return data;
};
export const getProfile = async () => {
  const token = localStorage.getItem("token");

  const { data } = await API.get("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
