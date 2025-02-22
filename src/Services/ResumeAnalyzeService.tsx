import { AxiosError } from "axios";
import axiosInstance from "../Interceptor/AxiosInterceptor";

const handleError = (error: AxiosError) => {
  console.error("API Error:", error.response?.data || error.message);
  throw error.response?.data || error.message;
};

export const extractText = async (file: any) => {
  try {
    const response = await axiosInstance.post("/resume/upload", file, {
      // headers: {
      //   "Content-Type": "multipart/form-data",
      //   Authorization: `Bearer ${token}`,
      // },
    });

    console.log("Response received:", response.data);
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const saveResume = async (resumeData: any) => {
  try {
    const response = await axiosInstance.post(
      `/resume/save`,
      resumeData
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${localStorage.getItem("token")}`,
      //     "x-api-key": process.env.REACT_APP_GEMINI_API_KEY,
      //   },
      // }
    );

    console.log("Response received:", response.data);
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const analyzeResume = async (text: any) => {
  try {
    const aiResponse = await axiosInstance.post(`/resume/analyze`, { text });

    console.log("AI Response:", aiResponse.data); // 🔍 Debugging log
    return aiResponse.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};
