import React, { useContext, useState } from "react";
import loginIcons from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart,fetchCartData } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
     
      navigate("/admin-panel/all-products");
      fetchUserDetails();
      fetchUserAddToCart();
      fetchCartData()
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };


  return (
    <>
      <div className="flex justify-center  h-[80vh] bg-gray-100 ">
        <div className="bg-white p-8 rounded-lg shadow-md   h-[450px] mt-[50px] border w-[350px] md:w-[450px] ">
          <h2 className="text-2xl font-bold text-center mb-6 text-red-700">
            Login to your account
          </h2>
          <p className="text-center mb-6 text-gray-700">
            Welcome back!{" "}
            <span role="img" aria-label="wave">
              👋
            </span>
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleOnChange}
                placeholder="Please enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="enter password"
                value={data.password}
                name="password"
                onChange={handleOnChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              {/* <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((preve)=>!preve)}>
                                    <span>
                                        {
                                            showPassword ? (
                                                <FaEyeSlash/>
                                            )
                                            :
                                            (
                                                <FaEye/>
                                            )
                                        }
                                    </span>
                                </div> */}
            </div>

            {/* <div className="mb-4 text-right">
          <a href="#" className="text-sm text-blue-500 hover:underline">
            Forgot Password?
          </a>
        </div> */}

            <button
              className="w-full bg-red-700 text-white py-2 rounded-lg hover:bg-red-800 transition duration-300"
            >
              Login
            </button>

            <p className="text-center mt-4">
              Not registered?{" "}
              <a
                href="/sign-up"
                className="text-red-600 font-semibold hover:underline"
              >
                Create an account
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
