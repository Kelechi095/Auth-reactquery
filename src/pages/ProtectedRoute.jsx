import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { customFetch } from "../helpers/customFetch";
import { Ring } from "@uiball/loaders";
import useRefresh from "../hooks/useRefresh";
import { useMutation } from "react-query";

export default function ProtectedRoute({ children }) {
  const [isAuthError, setIsAuthError] = useState(false);

  useRefresh()

  const { loading } = useRefresh();

  const navigate = useNavigate();

  const logoutFn = async () => {
    await customFetch.get("/logout");
  };

  const { mutate: logoutMutation} = useMutation(
    () => logoutFn(),
    {
      onSuccess: () => {
        localStorage.clear()
        navigate("/login");
      },
    }
  );

  const handleLogout = (e) => {
    logoutMutation()
  }
  

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

  if (loading) return <p>Loading...</p>;

  return children;
}
