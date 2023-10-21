import React, { useEffect, useState } from "react";
import { customFetch } from "../helpers/customFetch";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { saveUserToLocalStorage } from "../helpers/localstorage/saveUser";
import { useMutation } from "react-query";


export default function Profile() {
  const [newUsername, setNewUsername] = useState("");

  const navigate = useNavigate();

  const getUserProfileFn = async () => {
    const res = await customFetch.get("/profile");
    return res.data;
  };

  const query = useQuery("user", getUserProfileFn, {
    onSuccess: (data) => {
      setNewUsername(data);
    },
  });

  const updateProfileFn = async () => {
    const res = await customFetch.patch("/update", { newUsername });
    return res.data;
  };

  const user = "user";

  const { mutate: updateProfileMutation, isLoading } = useMutation(
    () => updateProfileFn(),
    {
      onSuccess: (data) => {
        localStorage.setItem("user", data.username)
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
    e.preventDefault();
    updateProfileMutation();
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label>Username: </label>
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          className="bg-slate-200 p-3 rounded-lg"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80">
          {isLoading ? "Updating..." : "Update profile"}
        </button>
      </form>
    </div>
  );
}
