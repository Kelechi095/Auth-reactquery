import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";

export default function useGetUser() {
  const { token } = useSelector((state) => state.user);

  let user = null

  if (token) {
    const decoded = jwtDecode(token);
    const { username } = decoded.UserInfo;
    user = username

  } 

  return { user};
}
