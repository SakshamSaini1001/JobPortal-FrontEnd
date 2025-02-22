import { AxiosError } from "axios";
import axiosInstance from "../Interceptor/AxiosInterceptor";

const handleError = (error: AxiosError) => {
  console.error("API Error:", error.response?.data || error.message);
  throw error.response?.data || error.message;
};

const postJob = async (job: any) => {
  return axiosInstance
    .post(`/jobs/post`, job)
    .then((response) => response.data)
    .catch((error) => {
      handleError(error);
      throw error;
    });
};

const getAllJobs = async () => {
  return axiosInstance
    .get(`/jobs/getAll`)
    .then((response) => response.data)
    .catch((error) => {
      handleError(error);
      throw error;
    });
};

const getJob = async (id: any) => {
  return axiosInstance
    .get(`/jobs/get/${id}`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      handleError(error);
      throw error;
    });
};

const applyJob = async (id: any, applicant: any) => {
  return axiosInstance
    .post(`/jobs/apply/${id}`, applicant)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      handleError(error);
      throw error;
    });
};

const getPostedBy = async (id: any) => {
  return axiosInstance
    .get(`/jobs/postedBy/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      handleError(error);
      throw error;
    });
};

const changeAppStatus = async (application: any) => {
  return axiosInstance
    .post(`/jobs/changeAppStatus`, application)
    .then((response) => response.data)
    .catch((error) => {
      handleError(error);
      throw error;
    });
};

export { postJob, getAllJobs, getJob, applyJob, getPostedBy, changeAppStatus };
