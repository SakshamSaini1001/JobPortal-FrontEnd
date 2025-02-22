// import axios from "axios";

// const base_url = "https://jobportal-backend-4.onrender.com/users/";

// // const registerUser=async (user:any)=>{
// //     return axios.post(`${base_url}register`,user)
// //     .then(res=>res.data)
// //     .catch(error=>{throw error});
// //     console.log(res);
// // }

// const registerUser = async (user: any) => {
//   try {
//     const response = await axios.post(`${base_url}register`, user);
//     return response.data;
//   } catch (error: any) {
//     console.error(
//       "Error registering user:",
//       error.response?.data || error.message
//     );
//     throw error.response?.data || error; // Throw the detailed error message if available
//   }
// };

// const loginUser = async (login: any) => {
//   return axios
//     .post(`${base_url}login`, login)
//     .then((res) => res.data)
//     .catch((error) => {
//       throw error;
//     });
// };

// const sendOtp = async (email: any) => {
//   return axios
//     .post(`${base_url}sendotp/${email}`)
//     .then((res) => res.data)
//     .catch((error) => {
//       console.log(error);
//       throw error;
//     });
// };

// const verifyOtp = async (email: any, otp: any) => {
//   return axios
//     .get(`${base_url}verifyOtp/${email}/${otp}`)
//     .then((res) => res.data)
//     .catch((error) => {
//       throw error;
//     });
// };

// const changePass = async (email: string, password: string) => {
//   return axios
//     .post(`${base_url}changePass`, { email, password })
//     .then((res) => res.data)
//     .catch((error) => {
//       throw error;
//     });
// };

// export { registerUser, loginUser, sendOtp, verifyOtp, changePass };

import axios, { AxiosError } from "axios";
import axiosInstance from "../Interceptor/AxiosInterceptor";

const handleError = (error: AxiosError) => {
  console.error("API Error:", error.response?.data || error.message);
  throw error.response?.data || error.message;
};

// Register User
const registerUser = async (user: any) => {
  try {
    const response = axiosInstance.post("/users/register", user);
    return (await response).data;
  } catch (error: any) {
    throw error;
  }
};

// Login User
const loginUser = async (login: any) => {
  return axiosInstance
    .post("/users/login", login)
    .then((result) => result.data)
    .catch((error: any) => {
      throw error;
    });
};

// Send OTP
const sendOtp = async (email: string) => {
  return axiosInstance
    .post(`/users/sendOtp/${email}`)
    .then((result) => result.data)
    .catch((error) => {
      throw error;
    });
};

// Verify OTP
const verifyOtp = async (email: string, otp: string) => {
  return axiosInstance
    .get(`/users/verifyOtp/${email}/${otp}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

// Change Password
const changePass = async (email: string, password: string) => {
  return axiosInstance
    .post("/users/forgotpassword", { email, password })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export { registerUser, loginUser, sendOtp, verifyOtp, changePass };
