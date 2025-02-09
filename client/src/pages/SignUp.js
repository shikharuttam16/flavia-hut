import React, { useState } from "react";
import loginIcons from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../helpers/imageTobase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];

    const imagePic = await imageTobase64(file);

    setData((preve) => {
      return {
        ...preve,
        profilePic: imagePic,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      }

      if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } else {
      toast.error("Please check password and confirm password");
    }
  };

  return (
    <>
      <section id="signup" className="bg-gray-100 ">
        <div className="mx-auto container p-4  ">
          <div className="bg-white p-3 md:p-8 w-full w-[350px] md:w-[480px] mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6 text-red-700">
              Sign up to your account
            </h2>

            <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="mb-4">
                <label className="block text-gray-700">Full Name</label>
                <input
                  type="text"
                  placeholder="enter your name"
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  placeholder="enter email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Create Password */}
              <div className="mb-4 relative">
                <label className="block text-gray-700">Create a Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="enter password"
                  value={data.password}
                  name="password"
                  onChange={handleOnChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600 hover:text-gray-900"
                  //   onClick={() => setShowPassword(!showPassword)}
                >
                  {/* {showPassword ? "🙈" : "👁️"} */}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="mb-4 relative">
                <label className="block text-gray-700">Confirm Password</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder=" confirm password"
                  value={data.confirmPassword}
                  name="confirmPassword"
                  onChange={handleOnChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600 hover:text-gray-900"
                  //   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {/* {showConfirmPassword ? "🙈" : "👁️"} */}
                </button>
              </div>

              {/* Remember me and Terms */}
              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-red-500"
                  />
                  <span className="ml-2 text-gray-700">Remember me</span>
                </label>
              </div>

              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-red-500"
                  />
                  <span className="ml-2 text-gray-700">
                    I accept the{" "}
                    <a href="#" className="text-red-600 hover:underline">
                      Terms of Use
                    </a>{" "}
                    &{" "}
                    <a href="#" className="text-red-600 hover:underline">
                      Privacy Policy
                    </a>
                  </span>
                </label>
              </div>

              {/* Sign Up Button */}
              <button className="w-full bg-red-700 text-white py-2 rounded-lg hover:bg-red-800 transition duration-300">
                Sign Up
              </button>

              <p className="text-center mt-4">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-red-600 font-semibold hover:underline">
                  Log In
                </a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
