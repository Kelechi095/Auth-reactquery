import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "./firebase/firebase";
import { customFetch } from "../helpers/customFetch";
import { useNavigate } from "react-router-dom";
import { setLogin, setUserInfo } from "../redux/userSlice";
import { useDispatch } from "react-redux";

export default function Oauth() {
  const navigate = useNavigate();

  const dispatch = useDispatch()

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const newUser = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      };
      
      const res = await customFetch.post("/google", newUser);
      dispatch(setUserInfo(res.data.accessToken))
      dispatch(setLogin())
      navigate("/");
    } catch (err) {
      console.log("Could not log in with google", err);
    }
  };

  return (
    <button
      type="button"
      className="bg-green-700 text-white rounded-lg p-3 uppercase hover:opacity-95"
      onClick={handleGoogleClick}
    >
      Continue with google
    </button>
  );
}
