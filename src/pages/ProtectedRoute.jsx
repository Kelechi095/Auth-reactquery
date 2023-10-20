import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate } from "react-router-dom";
import { customFetch } from "../helpers/customFetch";
import { removeUserInfo, setUserInfo } from "../redux/userSlice";
import { Ring } from "@uiball/loaders";
import useRefresh from "../hooks/useRefresh";

export default function ProtectedRoute({ children }) {
  const [isAuthError, setIsAuthError] = useState(false);
  const {isLoggedIn} = useSelector(state => state.user)

  const {loading } = useRefresh()

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    navigate("/login");
    await customFetch.get("/logout");
    dispatch(removeUserInfo());
  };

  
  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true);
      }
      return Promise.reject(error);
    }
  );

  console.log(isLoggedIn)


  useEffect(() => {
    if (!isAuthError) return;
    handleLogout();
    dispatch(removeUserInfo());
  }, [isAuthError]);

  if(loading) return <p>Loading...</p>

  return children;
}
