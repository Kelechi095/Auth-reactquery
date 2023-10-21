import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "./firebase/firebase";
import { customFetch } from "../helpers/customFetch";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { saveUserToLocalStorage } from "../helpers/localstorage/saveUser";

export default function Oauth() {
  const navigate = useNavigate();

  const googleFn = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const result = await signInWithPopup(auth, provider);
    const newUser = {
      name: result.user.displayName,
      email: result.user.email,
      photo: result.user.photoURL,
    };

    const res = await customFetch.post("/google", newUser);
    return res.data;
  };

  const user = "user";
  const token = "token";

  const { mutate: googleMutation, isLoading } = useMutation(() => googleFn(), {
    onSuccess: (data) => {
      console.log(data)
      saveUserToLocalStorage(token, data.accessToken);
      saveUserToLocalStorage(user, data.username);
      navigate("/");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    googleMutation();
  };

  return (
    <button
      type="button"
      className="bg-green-700 text-white rounded-lg p-3 uppercase hover:opacity-95"
      onClick={handleSubmit}
    >
      Continue with google
    </button>
  );
}
