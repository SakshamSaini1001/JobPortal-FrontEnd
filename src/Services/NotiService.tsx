import { AxiosError } from "axios";
import axiosInstance from "../Interceptor/AxiosInterceptor";

const handleError = (error: AxiosError) => {
  const errorMessage = error.response?.data || error.message;
  console.error("API Error:", errorMessage);
  throw errorMessage;
};

const getNotification = async (id: any) => {
  try {
    const response = axiosInstance.get(`/notification/get/${id}`);
    return (await response).data;
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with an error status
      console.error("API Error:", error.response?.status, error.response?.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Network Error (No Response):", error.request);
    } else {
      // Something else happened in setting up the request
      console.error("Error Message:", error.message);
    }
    throw error; // Ensure return type consistency
  }
};

const readNotification = (id: any) => {
  return axiosInstance
    .put(`/notification/read/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      handleError(error);
      throw error;
    });
};
export { getNotification, readNotification };
