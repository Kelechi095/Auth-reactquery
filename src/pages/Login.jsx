import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { customFetch } from "../helpers/customFetch";
import { useDispatch, useSelector } from "react-redux";
import { Ring } from "@uiball/loaders";
import Oauth from "../components/Oauth";
import useSetError from "../helpers/useSetError";
import { setUserInfo } from "../redux/userSlice";
import { removeUserInfo } from "../redux/userSlice";
import {setLogin} from "../redux/userSlice"

export default function Login() {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();


  const { isLoggedIn } = useSelector((state) => state.user);

  const dispatch = useDispatch()

  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    try {
    const res = await customFetch.post("/login", formData);
    console.log(res.data)
    dispatch(setUserInfo(res.data.accessToken))
    dispatch(setLogin())
    setIsLoading(false)
    navigate('/')

    } catch (err) {
      console.log(err)
      setError(err)
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  console.log(isLoggedIn)



  /* const { customError } = useSetError(
    error?.response?.data?.error?.split(" ")[0] === "E11000"
      ? "Email already used"
      : error?.response.data?.error
  );
 */

  
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Login</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-200 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-200 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80">
          {isLoading ? "submitting..." : "LOGIN"}
        </button>
        <Oauth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Not registered?</p>
        <Link to="/register">
          <span className="text-blue-500">Register</span>
        </Link>
      </div>
      {error && <p className="text-red-700 mt-5">{JSON.stringify(error)}</p>}
    </div>
  );
}
