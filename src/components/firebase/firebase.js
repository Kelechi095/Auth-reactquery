import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDFFYeMqKeCZxV70iaHlpnNzJEQgxH9PfU",
  authDomain: "mern-auth-881dd.firebaseapp.com",
  projectId: "mern-auth-881dd",
  storageBucket: "mern-auth-881dd.appspot.com",
  messagingSenderId: "615183990641",
  appId: "1:615183990641:web:0df13e93b439d321dc40d0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
