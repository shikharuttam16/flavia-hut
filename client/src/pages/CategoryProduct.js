// export default CategoryProduct;
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import productCategory from "../helpers/productCategory";
import VerticalCard from "../components/VerticalCard";
import SummaryApi from "../common";
import Context from "../context";
import { IoFilter } from "react-icons/io5";
const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const [showDropdown, setShowDropdown] = useState(false);
  const urlCategoryListinArray = urlSearch.getAll("category");
  const [selectCategory, setSelectCategory] = useState({});
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [availability, setAvailability] = useState('inStock');

  const togglePopover = () => {
    setIsPopoverOpen((prev) => !prev);
  };
  const urlCategoryListObject = {};
  urlCategoryListinArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });
  const fetchData = async () => {
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ category: filterCategoryList }),
    });
    const dataResponse = await response.json();
    setData(dataResponse?.data || []);
  };

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;
    setSelectCategory((prev) => ({ ...prev, [value]: checked }));
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).filter(
      (key) => selectCategory[key]
    );
    setFilterCategoryList(arrayOfCategory);
  }, [selectCategory]);

  useEffect(() => {
    const urlCategoryListinArray = urlSearch.getAll("category");
    const urlCategoryListObject = {};
    urlCategoryListinArray.forEach((el) => {
      urlCategoryListObject[el] = true;
    });
    setSelectCategory(urlCategoryListObject);
  }, [location.search]);

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);
    setData((prev) =>
      [...prev].sort((a, b) =>
        value === "asc"
          ? a.sellingPrice - b.sellingPrice
          : b.sellingPrice - a.sellingPrice
      )
    );
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <div className="w-[95%] mx-auto p-4  ">
      <div className="flex gap-3 hidden  lg:flex">
        <p>Home</p>
        <p>/</p>
        <p>Category</p>
        <p>/</p>
        <p className="text-[#AA0000] ">{urlSearch.get("category")} </p>
      </div>
      <div className="flex gap-3 items-center ">
        <p
          className="text-[#AA0000] text-2xl font-bold md:hidden"
          style={{ whiteSpace: "nowrap" }}>
          {urlSearch.get("category")?.charAt(0).toUpperCase() +
            urlSearch.get("category")?.slice(1)}{" "}
        
        </p>

        <div className="w-full  p-4 flex justify-end  lg:hidden">
          <button
            className=" px-4 py-1 rounded-full  block lg:hidden  flex items-center gap-2 border"
            onClick={togglePopover}>
            filter
            <IoFilter
              size={20}
              style={{ color: "#AA0000" }}
            />
          </button>
        </div>
      </div>
      <div className="relative inline-block">
     
      {isPopoverOpen && (
        <div className="absolute z-10 top-[-30px] left-[70px]   w-64 p-4 bg-white shadow-lg rounded-lg border">
          <div>
            <h3 className="text-base uppercase font-medium text-[#1A1A1A] pb-1 border-slate-300 ">
              Sort by
            </h3>
            <form
              className="text-sm text-[#1A1A1A] flex flex-col gap-2 py-2 "
              onClick={togglePopover}>
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "asc"}
                  onChange={handleOnChangeSortBy}
                  value="asc"
                />
                Price - Low to High
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "dsc"}
                  onChange={handleOnChangeSortBy}
                  value="dsc"
                />
                Price - High to Low
              </label>
            </form>
          </div>
        </div>
      )}
    </div>

      <div className="lg:grid grid-cols-[300px,1fr] mt-4     ">
        {/* Sidebar or Dropdown */}
        <div
          className={`bg-white p-2  lg:block ${
            showDropdown ? "block" : "hidden"
          } lg:relative  lg:w-full lg:min-h-full `}>
          <div>
            <h3 className="text-base uppercase font-medium text-[#1A1A1A] pb-1 border-slate-300 mt-5">
              Sort by
            </h3>
            <form
              className="text-sm text-[#1A1A1A] flex flex-col gap-2 py-2 "
              onClick={toggleDropdown}>
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "asc"}
                  onChange={handleOnChangeSortBy}
                  value="asc"
                />
                Price - Low to High
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "dsc"}
                  onChange={handleOnChangeSortBy}
                  value="dsc"
                />
                Price - High to Low
              </label>
            </form>
          </div>

          <div className="mt-9 hidden md:block" onClick={toggleDropdown}>
            <h3 className="text-base uppercase font-medium text-[#1A1A1A] pb-1 border-slate-300">
              All Category
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory?.map((category, index) => (
                <label key={index} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="category"
                    checked={selectCategory[category.value]}
                    value={category.value}
                    onChange={handleSelectCategory}
                  />
                  {category.label}
                </label>
              ))}
            </form>
          </div>
        </div>

        <div className="sm:px-4 sm:flex sm:flex-col items-center">
          {data.length !== 0 && !loading && (
            <VerticalCard data={data} loading={loading} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
