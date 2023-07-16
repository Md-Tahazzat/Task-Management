import axios from "axios";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import auth from "../Firebase/Firebase";

const UseAxiosSecure = () => {
  const navigate = useNavigate();
  const axiosInstance = axios.create({
    baseURL: "https://task-management-server-vert.vercel.app",
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      // add authorization token in header
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    (response) => response?.data,
    async (error) => {
      if (error.response && error.response.status === (401 || 403)) {
        localStorage.removeItem("access-token");
        signOut(auth);
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};

export default UseAxiosSecure;
