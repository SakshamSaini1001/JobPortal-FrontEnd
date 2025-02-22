import axios, { AxiosError } from "axios";
import { removeUser } from "../Slices/UserSlice";

const api = axios.create({
  baseURL: "https://jobportal-backend-4.onrender.com/auth/",
});

const handleError = (error: AxiosError) => {
  console.error("API Error:", error.response?.data || error.message);
  throw error.response?.data || error.message;
};

const loginUser = async (login: any) => {
  try {
    const response = await api.post("login", login);
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

const navigateToLogin = (navigate: any) => {
  localStorage.removeItem("token");
  removeUser();
  navigate("/login");
};
export { loginUser, navigateToLogin };
