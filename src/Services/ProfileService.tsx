// import axios, { AxiosError } from "axios";

// const api = axios.create({
//   baseURL: "https://jobportal-backend-4.onrender.com/profiles/",
// });

// const handleError = (error: AxiosError) => {
//   console.error("API Error:", error.response?.data || error.message);
//   throw error.response?.data || error.message;
// };

// const getProfile = async (id: number) => {
//   try {
//     const response = await api.get(`get/${id}`);
//     const profileData = response.data;

//     // Map _id to id
//     profileData.id = profileData._id;
//     return response.data;
//   } catch (error: any) {
//     handleError(error);
//   }
// };

// const updateProfile = async (profile: any) => {
//   console.log("Profile being sent to API:", profile);
//   try {
//     const response = await api.put(`update`, profile);
//     console.log("Response from API:", response.data);
//     return response.data;
//   } catch (error: any) {
//     console.error("API Error:", error?.response?.data || error);
//     handleError(error);
//     throw error;
//   }
// };

// export { getProfile, updateProfile };

import axiosInstance from "../Interceptor/AxiosInterceptor";

const handleError = (error: any) => {
  const errorMessage = error.response?.data || error.message;
  console.error("API Error:", error);
};

const getProfile = async (id: any) => {
  return axiosInstance
    .get(`/profiles/get/${id}`)
    .then((res) => res.data)
    .catch((err) => handleError(err));
};

const getAllProfiles = async () => {
  return axiosInstance
    .get(`/profiles/getAll`)
    .then((response) => response.data)
    .catch((error) => {
      handleError(error);
    });
};

const updateProfile = async (profile: any) => {
  console.log("Profile being sent to API:", profile);
  return axiosInstance
    .put(`/profiles/update`, profile)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      handleError(error);
    });
};

export { getProfile, updateProfile, getAllProfiles };
