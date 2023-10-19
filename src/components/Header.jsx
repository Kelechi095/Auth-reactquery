import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { customFetch } from "../helpers/customFetch";
import { QueryClient } from "react-query";
import { removeUserInfo } from "../redux/userSlice";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const queryClient = new QueryClient()

  const handleLogout = async () => {
    await customFetch.get("/logout");
    queryClient.invalidateQueries();
    dispatch(removeUserInfo())
    navigate("/login");
  };

  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold">Auth App</h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hover:text-blue-500 font-bold">
              {currentUser?.username}
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
