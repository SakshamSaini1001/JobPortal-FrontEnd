import { AxiosError } from "axios";
import axiosInstance from "../Interceptor/AxiosInterceptor";

const handleError = (error: AxiosError) => {
  console.error("API Error:", error.response?.data || error.message);
  throw error.response?.data || error.message;
};

export const saveMockInterview = async (mockInterviewData: any) => {
  try {
    const response = await axiosInstance.post(
      `/mockInterview/save`,
      mockInterviewData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "x-api-key": process.env.REACT_APP_GEMINI_API_KEY,
        },
      }
    );

    console.log("Response received:", response.data);
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const saveInterviewAnswer = async (InterviewAnswerData: any) => {
  try {
    const response = await axiosInstance.post(
      `/mockInterview/save/InterviewAnswer`,
      InterviewAnswerData
    );

    console.log("Response received:", response.data);
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const fetchInterviewAnswersBymockIdRef = async (mockIdRef: any) => {
  try {
    const response = await axiosInstance.get(`/mockInterview/${mockIdRef}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching interview answers:", error);
  }
};

export const fetchMockInterviewsByUser = async (userId: any) => {
  try {
    const response = await axiosInstance.get(
      `/mockInterview/createdBy/${userId}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching mock interviews:", error);
    return [];
  }
};

export const getMockInterviewAnswerById = async (id: any) => {
  try {
    const response = await axiosInstance.get(
      `/mockInterview/get/interviewAnswer/${id}`
    );
    console.log("API Response:", response.data);
    return response.data; // ✅ Ensure you return the response data
  } catch (error) {
    handleError(error as AxiosError);
    return null; // ✅ Prevent undefined values
  }
};

export const getFeedback = async (question: any, userAnswer: any) => {
  try {
    const response = await axiosInstance.post("/mockInterview/feedback", {
      question,
      userAnswer,
    });
    console.log("Feedback:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting feedback:", error);
  }
};

export const getMockInterview = async (id: any) => {
  try {
    const response = await axiosInstance.get(`/mockInterview/get/${id}`);
    console.log("API Response:", response.data);
    return response.data; // ✅ Ensure you return the response data
  } catch (error) {
    handleError(error as AxiosError);
    return null; // ✅ Prevent undefined values
  }
};

export const generateMockInterview = async () => {
  return axiosInstance
    .get(`/mockInterview/generate`, {
      // params: {
      //   jobPosition: jobPosition,
      //   jobDescription: jobDescription,
      //   yearsOfExperience: yearsOfExperience,
      // },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Add JWT or API key
        "x-api-key": process.env.REACT_APP_GEMINI_API_KEY,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      handleError(error);
      throw error;
    });
};
