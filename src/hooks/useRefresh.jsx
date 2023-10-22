import { useQuery } from "react-query";
import { customFetch } from "../helpers/customFetch";
import { useEffect, useState } from "react";
import { saveUserToLocalStorage } from "../helpers/localstorage/saveUser";

export default function useRefresh() {

  const refreshUserFn = async () => {
      const res = await customFetch.get("/auth/refresh");
      return res.data
  }
  const user = 'user'
  const token = 'token'


  const {data, isLoading} = useQuery("users", refreshUserFn, {
    onSuccess: (data) => {
      saveUserToLocalStorage(user, data.username);
      saveUserToLocalStorage(token, data.accessToken);
    }
  })

  
  return {isLoading}
}
