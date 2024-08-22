import axios from "axios";
import { refreshToken } from "../services/auth";

const instance = axios.create({
  baseURL: "https://api-test-web.agiletech.vn",
  timeout: 1000,
  // withCredentials: true,
});
instance.interceptors.request.use(
  (config) => {
    if (JSON.parse(localStorage.getItem('accessToken') as string)) {
      const token =  JSON.parse(localStorage.getItem('accessToken') as string);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    }else {
      delete config.headers["Authorization"];
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    console.log(">>> response", error.response?.status);
    
    if (error.response?.status === 401) {
      if (JSON.parse(localStorage.getItem('refreshToken') as string)){
        const token = JSON.parse(localStorage.getItem('refreshToken') as string);
        const { data } = await refreshToken(token);
        console.log(data);
        
        localStorage.setItem('accessToken',JSON.stringify(data.accessToken));
        localStorage.setItem('refreshToken',JSON.stringify(data.refreshToken));
        error.config.headers["Authorization"] = `Bearer ${data.access_token}`;
        return instance(error.config);
      }
     
    }
    return Promise.reject(error);
  }
);
export default instance;
