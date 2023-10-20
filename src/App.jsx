import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
        </Route>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
