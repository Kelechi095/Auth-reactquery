import { useMutation, useQueryClient } from "react-query";
import { customFetch } from "../helpers/customFetch";
import { useNavigate } from "react-router-dom";

export default function useLogoutUser() {
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  const logoutFn = async () => {
    await customFetch.get("/auth/logout");
  };

  const { mutate: logoutMutation } = useMutation(() => logoutFn(), {
    onSuccess: () => {
      localStorage.clear();
      queryClient.removeQueries();
      navigate("/login");
    },
  });

  return { logoutMutation };
}
