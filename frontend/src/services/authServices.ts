import axios from "axios";

export const checkAuth = async () => {
  try {
    const { data } = await axios.get("/api/v1/auth/check-session", {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.error("Auth check failed:", error);
  }
};
