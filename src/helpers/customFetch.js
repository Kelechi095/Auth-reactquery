import axios from "axios";

export const customFetch = axios.create({
    baseURL: `${import.meta.env.VITE_API_ENDPOINT}/api/auth`,
    withCredentials: true
  });
  