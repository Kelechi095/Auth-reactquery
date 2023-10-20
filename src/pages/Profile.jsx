import React, { useEffect, useState } from "react";
import { customFetch } from "../helpers/customFetch";
import { useQuery } from "react-query";
import { setUserInfo } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";


export default function Profile() {
  const [newUsername, setNewUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()


  const getUserProfile = async() => {
    try {
      const res = await customFetch.get("/profile")
      setNewUsername(res.data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserProfile()
  }, [])

  const updateProfile = async(e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await customFetch.patch("/update", {newUsername})
      setUserInfo(res.data.accessToken)
      navigate('/')
      setIsLoading(false)
    } catch (err) {
      console.log(err)
      setIsLoading(false)
    }
  }

  console.log(newUsername)


  return (
    <div className="p-3 max-w-lg mx-auto">
      <form className="flex flex-col gap-4" onSubmit={updateProfile}>
        <label>Username: </label>
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          className="bg-slate-200 p-3 rounded-lg"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80">{isLoading ? 'Updating...' : "Update profile"}</button>
      </form>
    </div>
  );
}
