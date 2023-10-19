import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { customFetch } from "../helpers/customFetch";
import { setUserInfo } from "../redux/userSlice";

import { useDispatch } from "react-redux";

const getUser = async () => {
  const response = await customFetch.get("/user");
  return response.data;
};

export default function useGetUser() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery("user", () => getUser(), {
    onSuccess: (data) => {
      dispatch(setUserInfo(data));
    },
  });

  return { user, isLoading, error };
}
