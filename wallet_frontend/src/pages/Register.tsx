import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Register = () => {
  const navigation = useNavigate();
  const [error, setError] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Username, setName] = useState("");
  const token = Cookies.get("token");
  const user = !!token;
  useEffect(() => {
    if (user) {
      window.location.href = "/dashboard/:id";
    }
  }, [user]);
  const handleRegister = async () => {
    setError("");
    if (Password === "" || Email === "" || Username === "") {
      setError("Please fill out the missing fields!");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5143/api/register",
          {
            Username,
            Email,
            Password,
          }
        );

        if (response.status === 201) {
          alert("Registration successful");
          navigation(`/`);
        } else {
          console.log("Registration error:", response.data.error);
          setError("User Registration error!");
        }
      } catch (error) {
        console.log("Error registering user:", error);
        setError("An error occurred");
      }
    }
  };
  return (
    <div className="grid md:grid-cols-1 grid-cols-1 min-h-screen">
      <div className="w-full flex gap-4 flex-col md:pt-24 px-4 md:px-8 lg:px-12 items-center justify-center h-full">
        <h1 className="font-extrabold text-3xl md:w-fit w-full text-gray-800">
          Hello
        </h1>
        {/* Name Input */}
        <div className="grid gap-1 md:max-w-xs w-full">
          <span className=" font-semibold text-gray-700 pl-2">Name</span>
          <input
            type="text"
            placeholder="Name"
            className={`rounded-2xl shadow-xl border p-3 focus:outline-none`}
            value={Username}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Email Input */}
        <div className="grid gap-1 md:max-w-xs w-full">
          <span className=" font-semibold text-gray-700 pl-2">Email</span>
          <input
            type="email"
            placeholder="Email"
            className=" rounded-2xl shadow-xl border p-3 focus:outline-none"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
        <div className="grid gap-1 md:max-w-xs w-full">
          <span className=" font-semibold text-gray-700 pl-2">Password</span>
          <input
            type="password"
            placeholder="Password"
            className=" rounded-2xl shadow-xl border p-3 focus:outline-none"
            value={Password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <span className="text-red-500 text-sm font-semibold">{error}</span>
        )}

        {/* Login button */}
        <div className="md:max-w-xs w-full mt-2">
          <button
            onClick={handleRegister}
            className="bg-[#82eefd] font-semibold text-[#213053] shadow-xl active:scale-95 transition-all transform ease-in-out duration-200 w-full rounded-2xl p-3"
          >
            Register
          </button>
        </div>
        <Link to={"/"}>
          Already have an account?{" "}
          <span className="underline text-[#54aab5]"> Login</span>
        </Link>
      </div>
    </div>
  );
};

export default Register;
