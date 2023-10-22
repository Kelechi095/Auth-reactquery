import React from "react";
import { Link} from "react-router-dom";
import useGetUser from "../hooks/useGetUser";
import useLogoutUser from "../hooks/useLogoutUser";

export default function Header() {

  const { user } = useGetUser();
  const {logoutMutation} = useLogoutUser()
  
  const handleLogout = () => {
    logoutMutation();
  };


  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold">Auth App</h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hover:text-blue-500 font-bold">{user}</li>
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
