import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { customFetch } from "../helpers/customFetch";
import Oauth from "../components/Oauth";
import { useMutation } from "react-query";
import { saveUserToLocalStorage } from "../helpers/localstorage/saveUser";
import useIsLoggedIn from "../hooks/useIsLoggedIn";


export default function Register() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null)

  const {isLoggedIn} = useIsLoggedIn()


  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const registerFn = async () => {
    const res = await customFetch.post("/auth/register", formData);
    return res.data;
  };

  const { mutate: registerMutation, isLoading } = useMutation(
    () => registerFn(),
    {
      onSuccess: () => {
        navigate("/login");
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
    registerMutation()
  }

  useEffect(() => {
    if(isLoggedIn) navigate('/')
  }, [isLoggedIn])


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Register</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-200 p-3 rounded-lg"
          onChange={handleChange}
        />
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
        <button
          className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "REGISTER"}
        </button>
        <Oauth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/login">
          <span className="text-blue-500">
            {isLoading ? "Submitting..." : "Login"}
          </span>
        </Link>
      </div>
      {error && <p className="text-red-700 mt-5">{customError}</p>}
    </div>
  );
}
