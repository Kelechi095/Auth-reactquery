import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { customFetch } from "../helpers/customFetch";
import { QueryClient , useMutation} from "react-query";
import Oauth from "../components/Oauth";
import useSetError from "../helpers/useSetError";

export default function Register() {
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  const queryClient = new QueryClient();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const registerUser = async () => {
    const response = await customFetch.post("/register", formData);
    return response.data;
  };

  const {
    mutate: registerMutation,
    isLoading,
    error,
  } = useMutation(() => registerUser(), {
    onSuccess: () => {
      //queryClient.invalidateQueries("user");
      navigate("/login");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    registerMutation();
  };

  const { customError } = useSetError(
    error?.response.data?.error.split(" ")[0] === "E11000"
      ? "Email already used"
      : error?.response.data?.error
  );

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
      {error && (
        <p className="text-red-700 mt-5">
          {customError}
        </p>
      )}
    </div>
  );
}
