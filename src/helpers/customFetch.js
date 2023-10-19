import axios from "axios";

export const customFetch = axios.create({
    baseURL: `api/auth`,
    withCredentials: true
  });
  