import { customFetch } from "../helpers/customFetch";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/userSlice";

export default function useRefresh() {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

  const refreshUser = async () => {
    setLoading(true)
    try {
      const res = await customFetch.get("/refresh");
      dispatch(setUserInfo(res.data.accessToken));
      setLoading(false)
    } catch (err) {
      console.log(err);
      setLoading(false)
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return {loading}
}
