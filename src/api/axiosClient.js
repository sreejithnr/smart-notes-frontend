import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axiosClient.post(
          "/auth/refresh",
          {},
          { withCredentials: true },
        );

        const newAccessToken = res.data.token;

        localStorage.setItem("token", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosClient(originalRequest);
      } catch (err) {
        localStorage.clear();
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
