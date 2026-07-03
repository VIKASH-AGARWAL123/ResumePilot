import API from "./axios";

const getToken = () => localStorage.getItem("token");

export const getOptimizedResumes = async () => {
  const { data } = await API.get("/optimizer", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return data;
};

export const getOptimizedResume = async (id) => {
  const { data } = await API.get(`/optimizer/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return data;
};

export const deleteOptimizedResume = async (id) => {
  const { data } = await API.delete(`/optimizer/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return data;
};

export const updateOptimizedResume = async (id, resumeData) => {
  const token = localStorage.getItem("token");

  const { data } = await API.put(`/optimizer/${id}`, resumeData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
