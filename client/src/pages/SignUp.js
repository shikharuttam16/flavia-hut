import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("User Data:", data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fff]">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Create my account</h2>
        <p className="text-center text-gray-600 mb-6">Fill in all the details below for account</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={data.firstName}
            onChange={handleOnChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={data.lastName}
            onChange={handleOnChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleOnChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleOnChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition duration-300">Register</button>
          {/* <div className="text-center text-gray-500 my-2">Or</div>
          <button className="w-full border border-gray-300 py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-gray-200 transition">
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" /> Continue with Google
          </button> */}
          <p className="text-center text-gray-600 mt-4">
            Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
