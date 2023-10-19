import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { QueryClient, useMutation } from "react-query";
import { customFetch } from "../helpers/customFetch";
import { useDispatch, useSelector } from "react-redux";
import { Ring } from "@uiball/loaders";
import Oauth from "../components/Oauth";
import useSetError from "../helpers/useSetError";

export default function Login() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  // const {isLoading: isChecking} = useGetUser()

  const queryClient = new QueryClient();

  const { currentUser } = useSelector((state) => state.user);

  const loginUser = async () => {
    const response = await customFetch.post("/login", formData);
    return response.data;
  };

  const {
    mutate: loginMutation,
    isLoading,
    error,
  } = useMutation(() => loginUser(), {
    onSuccess: () => {
      // queryClient.invalidateQueries("user");
      navigate("/");
    },
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginMutation();
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  //if(isChecking) return <Ring size={20}/>

  const { customError } = useSetError(
    error?.response.data?.error?.split(" ")[0] === "E11000"
      ? "Email already used"
      : error?.response.data?.error
  );

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
      {error && <p className="text-red-700 mt-5">{customError}</p>}
    </div>
  );
}
