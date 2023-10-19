import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "./firebase/firebase";
import { customFetch } from "../helpers/customFetch";
import { useNavigate } from "react-router-dom";

export default function Oauth() {
  const navigate = useNavigate();

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
      /* const res = await fetch("/google", {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(newUser)
      }) */
     navigate("/");
     console.log(res.data)
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
