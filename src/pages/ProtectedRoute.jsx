import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import useGetUser from "../hooks/useGetUser";
import { customFetch } from "../helpers/customFetch";
import { QueryClient } from "react-query";
import { removeUserInfo } from "../redux/userSlice";
import {Ring} from '@uiball/loaders'


export default function ProtectedRoute({ children }) {
  const { currentUser } = useSelector((state) => state.user);
  const [isAuthError, setIsAuthError] = useState(false);

  const { isLoading } = useGetUser();

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const queryClient = new QueryClient()

  console.log(currentUser)


  const handleLogout = async () => {
      navigate("/login");
      dispatch(removeUserInfo())
    await customFetch.get("/logout");
   // queryClient.invalidateQueries();

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

  useEffect(() => {
    if (!isAuthError) return;
    handleLogout();
  }, [isAuthError]);

  /* useEffect(() => {
    if(!currentUser) {
      navigate('/login')
    }
  }, [currentUser])
 */


  if(isLoading) return <Ring size={20}/>
  
  return children
}
