import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { customFetch } from "../helpers/customFetch";
import useGetUser from "../hooks/useGetUser";
import { useMutation } from "react-query";

export default function Header() {

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

  const handleLogout = () => {
    logoutMutation()
  }

  const {user} = useGetUser()


  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold">Auth App</h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hover:text-blue-500 font-bold">
              {user}
            </li>
          </Link>
          <Link to="/">
            <li className="hover:text-blue-500">Home</li>
          </Link>
          <Link to="/profile">
            <li className="hover:text-blue-500">Profile</li>
          </Link>
          <Link to="/about">
            <li className="hover:text-blue-500">About</li>
          </Link>
          <button onClick={handleLogout}>Logout</button>
        </ul>
      </div>
    </div>
  );
}
