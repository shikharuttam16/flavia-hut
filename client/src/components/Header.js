import React, { useContext, useEffect, useState } from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaHamburger, FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";
import CartDrawer from "./CartDrawer";
import logos from "../assest/images/logo.png";

import WishlistDrawer from "./WishlistDrawer";
import { FiAlignJustify } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { CgSearch } from "react-icons/cg";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import { GiChipsBag } from "react-icons/gi";
import { AiFillInfoCircle } from "react-icons/ai";
import { MdLocalPhone } from "react-icons/md";
import { FaQuestion } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";




const Header = ({ onFAQClick }) => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(13).fill(null);
  const [toggle, setToggle] = useState(false);
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const toggleProductDropdown = () => {
    setIsProductDropdownOpen(!isProductDropdownOpen);
  };
  const showNav = () => {
    setToggle(!toggle);
  };

  const fetchCategoryProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.categoryProduct.url);
    const dataResponse = await response.json();
    setLoading(false);
    setCategoryProduct(dataResponse.data);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  const toggleProductsDropdown = () => {
    setIsProductsDropdownOpen(!isProductsDropdownOpen);
  };

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
      window.location.reload();
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search) {
      navigate(`/search?q=${search}`);
    } else {
      navigate("/search");
    }
    setSearch("");
  };
  const handleFAQClick = () => {
    // Navigate to home page
    navigate("/"); // Adjust the path if necessary

    // After navigating, scroll to the FAQ section
    setTimeout(onFAQClick, 0); // Using a timeout to ensure navigation completes before scrolling
  };
  const isOnAdminPanel = location.pathname.startsWith("/admin-panel");
  return (
    <header className="shadow-md bg-white w-full z-40   sticky top-0">
      <div className="w-full">
        {/* Top Store Location Bar */}
        <div className="bg-[#FFB255] bg-[#FFB255]-700 text-white text-xs md:text-sm py-2  flex justify-center items-center">
          <div >
            {/* <span className="mr-1 hidden sm:inline">📍 Store Location:</span>  */}
            <span className="mr-1 hidden sm:inline text-black ">
              {/* #985/986 Housing Board Colony Sector 10 Ambala */}
              Get 8% Discount on Purchase of 899 and Above With Code <span className="font-bold">"SAVER8"</span>
            </span>
          </div>
          
        </div>

        <div className="bg-white shadow-md px-4  ">
          <div
            className="flex   items-center w-[100%] "
            style={{ whiteSpace: "nowrap" }}
          >
            {/* Logo Section */}
            <div className="w-[10%]">
              <Link to="/">
                <div className="flex-grow flex justify-center">
                  <img src={logos} alt="logo" className="h-18 w-25" />{" "}
                </div>
              </Link>
            </div>

            {/* Search Section */}
            <div className="flex items-center space-x-2  mt-2 w-[90%] ">
              <div className="relative border border-gray-400 rounded w-[65%] ">
                <input
                  type="text"
                  className="pl-5 pr-4 py-2 w-44 sm:w-72 h-10 bg-white border-none rounded w-[100%]"
                  value={search}
                  onChange={handleSearch}
                  placeholder="Search products..."
                />
              </div>

              <button
                onClick={handleSearchSubmit}
                className="bg-[#424750] text-white px-4 sm:px-6 py-2 rounded h-10 hidden lg:block"
                style={{marginLeft:0}}
              >
                <FaSearch  style={{ fill: 'white' }}/>
              </button>
              <button
                onClick={handleSearchSubmit}
                className="bg-red-700 text-white px-4 sm:px-6 py-2 rounded h-10  lg:hidden mr-2"
              >
                <CgSearch />
              </button>

              {/* Phone Icon and Number */}
              {/* <div className="hidden sm:flex items-center space-x-2">
                <span className="text-black text-sm">+91-8307252108</span>
              </div> */}

              {/* <div className="flex gap-2 items-center"> */}
            {/* {user?._id && (
              <div
                className="text-3xl cursor-pointer relative"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-10 h-10 rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )} */}
            <div>
              {user?._id ? (
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 hover:bg-red-700"
                >
                  Logout
                </button>
              ) : (
                <div className="flex ml-1 items-center text-[#424750] ">
                  {/* <FaRegUser /> */}
                  <Link to={"/login"} className="px-1 py-1 text-sm">
                    Login
                  </Link>
                  <span className="text-sm">/</span>
                  <Link to={"/sign-up"} className="px-1 py-1 text-sm">
                    SignUp
                  </Link>
                </div>
              )}
            </div>
            <div className="hidden md:flex items-center gap-4 flex items-center">
                {/* <WishlistDrawer /> */}
                {/* <CartDrawer /> */}
                <button className="flex justify-center">
                <FiShoppingBag
                size={30}
                />
                <span className="ml-3 text-sm font-bold flex items-center">Cart</span>
                </button>
            </div>



            {/* {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded text-[#1A1A1A] font-semibold">
                <nav>
                  {user?.role === ROLE.ADMIN ? (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap  md:block hover:bg-slate-100 p-2"
                      onClick={() => setMenuDisplay((prev) => !prev)}
                    >
                      Admin Panel
                    </Link>
                  ) : (
                    <p>{user?.name}</p>
                  )}
                </nav>
              </div>
            )} */}
          {/* </div> */}
            </div>
          </div>
        </div>

        <div className="bg-[#fff] text-[#283B53] shadow-md  sm:px-15 py-4" style={{paddingInline:5}}>
          <div className="flex justify-between items-center">
            {/* Left Section: Logo and Links */}
            <div className="flex items-center">
              <ul className="hidden md:flex space-x-8 ">
                <Link to="/" className="">
                  Home
                </Link>
                <Link to="/" className="">
                  BestSellers
                </Link>
                <Link to="/" className="">
                  Combo's
                </Link>
                <Link to="/" className="">
                  Featured Products
                </Link>
                <Link to="/" className="">
                  Makhana's
                </Link>
                <Link to="/" className="">
                  New Arrivals
                </Link>
                <Link to="/" className="">
                  Bulk Orders
                </Link>
                <Link to="/" className="">
                  Contact Us
                </Link>
                {/* <div className="relative">
                  <button
                    className="flex items-center gap-x-1  font-semibold "
                    aria-expanded="false"
                    onClick={toggleProductsDropdown}
                  >
                    Products
                    {/* <svg
                      className="h-5 w-5 flex-none text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                    > */}
                      {/* <path
                        fill-rule="evenodd"
                        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                        clip-rule="evenodd"
                      /> */}
                    {/* </svg> */}
                  {/* </button> */}
                  {/* {isProductsDropdownOpen && (
                    <div className="absolute mt-2 w-48 bg-white border shadow-lg rounded-lg text-black">
                      {loading
                        ? categoryLoading?.map((_, index) => (
                            <div
                              className="h-16 w-16 bg-slate-200 animate-pulse"
                              key={index}
                            />
                          ))
                        : categoryProduct?.map((product, index) => (
                            <ul className="py-2" key={index}>
                              <li className="px-4 py-2 hover:bg-gray-100">
                                <Link
                                  to={`/product-category?category=${product?.category}`}
                                  onClick={() =>
                                    setIsProductsDropdownOpen(false)
                                  }
                                >
                                  {product?.category}
                                </Link>
                              </li>
                            </ul>
                          ))}
                    </div>
                  )} 
                </div>
                {/* <Link to="/about" className="font-semibold">
                  About Us
                </Link>
                <p
                  className="font-semibold cursor-pointer"
                  onClick={handleFAQClick}
                >
                  FAQ
                </p>  */}
              </ul>
            </div>

            {/* Right Section: Search and Icons */}
            <div className="flex items-center gap-4 sm:gap-7">
              <div className="hidden md:flex items-center gap-4">
                {/* <WishlistDrawer /> */}
                {/* <CartDrawer /> */}
              </div>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex justify-between items-center  bg-[#333333] text-white ">
            <FiAlignJustify onClick={toggleDrawer} size={25} />

            {/* Drawer */}
            <div
              className={`fixed top-0 left-0 h-full w-60 bg-gray-900 text-white z-40 transform ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              } transition-transform duration-300 ease-in-out`}
            >
              <div className="p-4 ">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold mb-4 text-white">
                    Menu
                  </h2>
                  <button
                    onClick={toggleDrawer}
                    className="text-black bg-[#AA0000] p-2 rounded-full  w-10 h-10 "
                  >
                    &#10094;
                  </button>
                </div>

                <div className="mt-6 ">
                  <ul className="space-y-12">
                    <li
                      className="flex items-center space-x-2"
                      onClick={toggleDrawer}
                    >
                      <span>
                        <IoHomeOutline size={25} />
                      </span>
                      <a href="/" className="hover:text-gray-400">
                        Home
                      </a>
                    </li>

                    {/* Products Dropdown */}
                    <li
                      className="flex items-center space-x-2 cursor-pointer"
                      onClick={toggleProductDropdown}
                    >
                      <span>
                        <GiChipsBag size={25} />
                      </span>
                      <span className="hover:text-gray-400">Products</span>
                      {isProductDropdownOpen ? (
                        <FiChevronUp />
                      ) : (
                        <FiChevronDown />
                      )}
                    </li>
                    {isProductDropdownOpen && (
                      <div className="ml-8 space-y-2">
                        {loading
                          ? categoryLoading?.map((_, index) => (
                              <div
                                className="h-16 w-16 bg-slate-200 animate-pulse"
                                key={index}
                              />
                            ))
                          : categoryProduct?.map((product, index) => (
                              <ul
                                className="py-2"
                                key={index}
                                onClick={toggleDrawer}
                              >
                                <li className="px-4 py-2 text-[#999999]">
                                  <Link
                                    to={`/product-category?category=${product?.category}`}
                                    onClick={() =>
                                      setIsProductsDropdownOpen(false)
                                    }
                                  >
                                    {product?.category}
                                  </Link>
                                </li>
                              </ul>
                            ))}
                      </div>
                    )}

                    <li
                      className="flex items-center space-x-2"
                      onClick={toggleDrawer}
                    >
                      <span>
                        <AiFillInfoCircle size={25} />
                      </span>
                      <a href="/about" className="hover:text-gray-400">
                        About Us
                      </a>
                    </li>
                    <li
                      className="flex items-center space-x-2"
                      onClick={toggleDrawer}
                    >
                      <span>
                        <MdLocalPhone size={25} />
                      </span>
                      <a href="/about" className="hover:text-gray-400">
                        Contact Us
                      </a>
                    </li>
                    <li
                      className="flex items-center space-x-2"
                      onClick={toggleDrawer}
                    >
                      <span>
                        <FaQuestion size={25} />
                      </span>
                      <a
                        href="#"
                        className="hover:text-gray-400"
                        onClick={handleFAQClick}
                      >
                        FAQ's
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex  gap-4">
              <WishlistDrawer />
              <CartDrawer />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
