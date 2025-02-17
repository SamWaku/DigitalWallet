import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const token = Cookies.get("token");
  const user = !!token;

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (user) {
      window.location.href = "/dashboard/:id";
    }
  }, [user]);
  const handleLogin = async () => {
    if (email === "" || password === "") {
      setError("Please fill out the missing fields");
    } else {
      try {
        const response = await axios.post(`${API_BASE_URL}/api/login`, {
          email,
          password,
        });
        if (response.status === 200) {
          const { userid, email, name, token } = response.data;
          Cookies.set("name", name, {
            expires: 14,
            sameSite: "None",
            secure: true,
          });
          const userData = {
            email: email,
            userid: userid,
            token: token,
          };
          Cookies.set("token", JSON.stringify(userData), {
            expires: 14,
            sameSite: "None",
            secure: true,
          });
          alert("Login successful");
          window.location.href = `/dashboard/${userid}`;
        } else {
          console.log("Authentication error:", response.data.error);
          setError("Authentication failed");
        }
      } catch (error) {
        console.log("Error Login user:", error);
        setError("Password incorrect");
      }
    }
  };
  return (
    <div id="login" className="grid lg:grid-cols-1 grid-cols-1 min-h-screen">
      <div className="w-full flex gap-4 flex-col px-4 md:px-8 lg:px-12 items-center justify-center h-full">
        <h1 className="font-extrabold text-3xl md:w-fit w-full text-gray-800">
          Welcome
        </h1>
        {/* Email Input */}
        <div className="grid gap-1 md:max-w-xs w-full">
          <span className=" font-semibold text-gray-700 pl-2">Email</span>
          <input
            type="email"
            placeholder="Email"
            className=" rounded-2xl shadow-xl border p-3 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="grid gap-1 md:max-w-xs w-full">
          <span className=" font-semibold text-gray-700 pl-2">Password</span>
          <input
            type="password"
            placeholder="Password"
            className=" rounded-2xl shadow-xl border p-3 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <span className="text-red-500 text-sm font-semibold">{error}</span>
        )}

        {/* Login button */}
        <div className="md:max-w-xs w-full mt-3">
          <button
            onClick={handleLogin}
            className="bg-[#82eefd] font-semibold text-[#213053] shadow-xl active:scale-95 transition-all transform ease-in-out duration-200 w-full rounded-2xl p-3"
          >
            Login
          </button>
        </div>
        <Link to={"/register"}>
          Don&#39;t have an account?{" "}
          <span className="underline text-[#54aab5]"> Register</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
