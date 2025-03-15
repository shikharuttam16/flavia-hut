import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import Context from "../context";
import logos from "../assest/images/logo.png";
import { FiAlignJustify, FiShoppingBag } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { FaChevronDown, FaCrown } from "react-icons/fa";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";

const Header = ({ onFAQClick }) => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location?.search);
  const searchQuery = searchParams.get("q") || "";
  const [search, setSearch] = useState(searchQuery);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const { cartProductCount } = useContext(Context);
  const { localProductCount } = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(SummaryApi.getConditionalCategory.url, {
        method: SummaryApi.getConditionalCategory.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ renderIn: "header" }),
      });
      const data = await response.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(SummaryApi.logout_user.url, {
        method: SummaryApi.logout_user.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Logout failed: ${response.statusText}`);
      }

      const data = await response.json();
      // console.log("Logout successful", data);

      // Perform additional actions like clearing tokens and redirecting
      localStorage.removeItem("authToken"); // Adjust based on your auth mechanism
      sessionStorage.clear();
      // window.location.reload();
      localStorage.removeItem("cart");
      window.location.href = "/"; // Redirect to login page
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="bg-white border-b-2 border-b-[#E1E3E4] w-full sticky top-0 z-50">
      <div className="bg-[#FFB255] text-white text-sm py-2 text-center">
        <span className="text-black">
          Get 8% Discount on Purchase of 899 and Above With Code
          <span className="font-bold"> "SAVER8"</span>
        </span>
      </div>

      <div className="bg-white px-4 pt-3 flex items-center justify-between w-[95%] mx-auto mb-[6px]">
        <Link to="/" className="flex-shrink-0">
          <img src={logos} alt="logo" className="h-14 w-auto" />
        </Link>

        <div className="hidden md:flex items-center border border-gray-400 rounded overflow-hidden w-3/4 mx-4 bg-gray-700">
          <input
            type="text"
            className="px-4 py-2 w-full outline-none bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(search ? `/search?q=${search}` : "/search");
              }
            }}
            placeholder="Search products..."
          />
          <button
            onClick={() => navigate(search ? `/search?q=${search}` : "/search")}
            className="text-white px-4 flex items-center"
          >
            <FaSearch />
          </button>
        </div>

        <div className="flex items-center gap-4">
          {user?._id ? (
            <div className="relative">
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm block max-md:hidden">{user.name}</span>
                <button
                  className="flex items-center text-lg font-bold text-gray-900"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span className="max-md:hidden flex items-center justify-center">My account
                  <FaChevronDown className="ml-1 text-gray-700" /></span>
                  <span className="hidden max-md:block"><FaRegUser size={24} color="black" />
                  </span>
                </button>
              </div>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <ul className="py-2 text-gray-800">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <Link to="/my-account">My Orders</Link>
                    </li>
                    <li
                      onClick={() => {
                        handleLogout();
                        dispatch(setUserDetails(null));
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            // <button
            //   onClick={() => dispatch(setUserDetails(null))}
            //   className="text-gray-700 text-sm"
            // >
            //   {user.name}
            //   Logout
            // </button>
            <div className="flex items-center">
              <Link to="/login">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-lg font-medium hover:bg-gray-100">
                  <FaSignInAlt size={22} /> {/* Increased icon size */}
                  <span className="text-lg">Login</span>{" "}
                  {/* Increased text size */}
                </button>
              </Link>
            </div>
          )}
          <span className="relative mr-0">
            <Link to="/my-cart">
              <span className="flex">
                <FiShoppingBag size={28} className="cursor-pointer" />
                <span className="w-[20px] h-[20px] bg-[#424750] rounded-full py-1 px-2 absolute flex justify-center items-center top-[-7px] left-3 ">
                  <span className="text-white">
                    {user != null ? cartProductCount : localProductCount}
                  </span>
                </span>

                <span className="ml-2">Cart</span>
              </span>
            </Link>
          </span>

          <FiAlignJustify
            size={28}
            className="cursor-pointer md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          />
        </div>
      </div>

       {/* Navigation Links */}
       <nav className="hidden md:flex justify-center md:justify-start  bg-white py-2 w-[95%] mx-auto max-w-[1400px]">
        <ul className="flex space-x-6 text-gray-700">
          <Link to="/">Homessss</Link>
          {categories.map((cat) => (
            <Link key={cat.slug} to={`/product-category?category=${cat.slug}`}>
              {cat.name}
            </Link>
          ))}
          <Link to="/contact">Contact Us</Link>
        </ul>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-3/4 h-full bg-white shadow-lg p-5 z-50"
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#000]-700 w-5 h-5 text-[40px]"
            >
              &times;
            </button>
            <ul className="mt-6 space-y-2 text-gray-800">
              <li className="border-b border-gray-200">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-lg hover:bg-gray-100"
                >
                  Home
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.slug} className="border-b border-gray-200">
                  <Link
                    to={`/product-category?category=${cat.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-lg hover:bg-gray-100"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li className="border-b border-gray-200">
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-lg hover:bg-gray-100"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
