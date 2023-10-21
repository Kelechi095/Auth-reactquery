import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { customFetch } from "../helpers/customFetch";
import { Ring } from "@uiball/loaders";
import Oauth from "../components/Oauth";
import useSetError from "../helpers/useSetError";
import { useMutation, useQueryClient } from "react-query";
import { saveUserToLocalStorage } from "../helpers/localstorage/saveUser";
import useIsLoggedIn from "../hooks/useIsLoggedIn";


export default function Login() {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const {isLoggedIn} = useIsLoggedIn()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const loginFn = async () => {
    const res = await customFetch.post("/login", formData);
    return res.data;
  };

  const user = 'user'
  const token = 'token'

  const { mutate: loginMutation, isLoading } = useMutation(
    () => loginFn(),
    {
      onSuccess: (data) => {
        saveUserToLocalStorage(user, data.username);
        saveUserToLocalStorage(token, data.accessToken);
        navigate("/");
      },
      onError: (error) => {
        error?.response?.data?.error?.split(" ")[0] === "E11000"
          ? setError("Email already used")
          : setError(error.response.data.error);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault()
    loginMutation()
  }

  useEffect(() => {
    if(isLoggedIn) navigate('/')
  }, [isLoggedIn])

  
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
      {error && <p className="text-red-700 mt-5">{error}</p>}
    </div>
  );
}
