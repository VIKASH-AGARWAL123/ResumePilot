import API from "./axios";

export const matchJob = async (resumeId, jobDescription) => {
  const token = localStorage.getItem("token");

  const { data } = await API.post(
    "/job/match",
    {
      resumeId,
      jobDescription,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};
