import { useEffect, useState } from "react";
import { Ring } from "@uiball/loaders";
import useLogoutUser from "../hooks/useLogoutUser";
import { customFetch } from "../helpers/customFetch";
import useRefresh from "../hooks/useRefresh";

export default function ProtectedRoute({ children}) {
  const [isAuthError, setIsAuthError] = useState(false)

  const {isLoading } = useRefresh()

  const { logoutMutation } = useLogoutUser();


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

  const handleLogout = (e) => {
    logoutMutation();
  };

  useEffect(() => {
    if (!isAuthError) return;
    handleLogout();
  }, [isAuthError]);

  if (isLoading)
    return (
      <div className="h-screen flex justify-center items-center">
        <Ring size={40}/>;
      </div>
    );

  return children;
}
