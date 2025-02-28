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

  return (
    <header className="bg-white shadow-md w-full sticky top-0 z-50">
      <div className="bg-[#FFB255] text-white text-sm py-2 text-center">
        <span className="text-black">
          Get 8% Discount on Purchase of 899 and Above With Code
          <span className="font-bold"> "SAVER8"</span>
        </span>
      </div>

      <div className="bg-white px-4 py-3 flex items-center justify-between w-[95%] mx-auto">
        <Link to="/" className="flex-shrink-0">
          <img src={logos} alt="logo" className="h-14 w-auto" />
        </Link>

        <div className="hidden md:flex items-center border border-gray-400 rounded overflow-hidden w-3/4 mx-4 bg-gray-700">
          <input
            type="text"
            className="px-4 py-2 w-full outline-none bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
            <button onClick={() => dispatch(setUserDetails(null))} className="text-gray-700 text-sm">
              Logout
            </button>
          ) : (
            <div className="flex text-gray-700 text-sm">
              <Link to="/login" className="px-2">Login</Link> /
              <Link to="/sign-up" className="px-2">SignUp</Link>
            </div>
          )}
          <FiShoppingBag size={28} className="cursor-pointer" />
          <FiAlignJustify
            size={28}
            className="cursor-pointer md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          />
        </div>
      </div>

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
              className="text-red-700 w-5 h-5 text-[40px]"
            >
              &times;
            </button>
            <ul className="mt-6 space-y-2 text-gray-800">
              <li className="border-b border-gray-200">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-lg hover:bg-gray-100">
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
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-lg hover:bg-gray-100">
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
