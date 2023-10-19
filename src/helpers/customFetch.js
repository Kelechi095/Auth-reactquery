import axios from "axios";

export const customFetch = axios.create({
    baseURL: `https://kelmauth.onrender.com/api/auth`,
    withCredentials: true
  });
  