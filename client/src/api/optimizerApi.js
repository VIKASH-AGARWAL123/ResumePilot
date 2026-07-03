import API from "./axios";

export const optimizeResume = async (resumeId, targetRole) => {
  const token = localStorage.getItem("token");

  const { data } = await API.post(
    "/optimizer/optimize",
    {
      resumeId,
      targetRole,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};
