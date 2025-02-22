// import axios, { AxiosRequestConfig } from "axios";

// const axiosInstance = axios.create({
//   baseURL: "https://jobportal-backend-4.onrender.com",
// });

// axiosInstance.defaults.withCredentials = true;

// axiosInstance.interceptors.request.use(
//   (config: AxiosRequestConfig) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export const setupResponseInterceptor = (navigate: any) => {
//   axiosInstance.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     (error) => {
//       if (error.response?.status === 401) {
//         setTimeout(() => navigate("/login"), 0);
//       }
//       return Promise.reject(error);
//     }
//   );
// };

// export default axiosInstance;

import axios, { InternalAxiosRequestConfig, AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jobportal-backend-4.onrender.com",
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {}; // Ensure headers exist
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export const setupResponseInterceptor = (navigate: (path: string) => void) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user"); // Remove invalid token
        setTimeout(() => navigate("/login"), 0);
      }
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
