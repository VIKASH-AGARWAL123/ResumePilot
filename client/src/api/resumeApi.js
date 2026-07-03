import API from "./axios";

const getToken = () => localStorage.getItem("token");

export const getMyResumes = async () => {
  const { data } = await API.get("/resume/my-resumes", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return data;
};

export const getResumeById = async (id) => {
  const { data } = await API.get(`/resume/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return data;
};

export const deleteResume = async (id) => {
  const token = localStorage.getItem("token");

  const { data } = await API.delete(`/resume/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
