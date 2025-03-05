import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart, fetchCartData } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/admin-panel/all-products");
      fetchUserDetails();
      fetchUserAddToCart();
      fetchCartData();
    } else {
      toast.error(dataApi.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#fff]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 border">
        <h2 className="text-xl font-bold text-center mb-2">Login to my account</h2>
        <p className="text-center text-gray-600 mb-4">Enter your e-mail and password</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleOnChange}
              placeholder="Email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={data.password}
              onChange={handleOnChange}
              placeholder="Password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900">
            Login
          </button>
        </form>

        {/* <div className="text-center my-4 text-gray-500">Or</div> */}

        {/* <button className="w-full border py-2 rounded-md flex items-center justify-center gap-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button> */}

        <div className="text-center mt-4">
          <p>
            New customer? <a href="/sign-up" className="text-blue-600">Create your account</a>
          </p>
          {/* <p>
            Lost password? <a href="/recover" className="text-blue-600">Recover Password</a>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
