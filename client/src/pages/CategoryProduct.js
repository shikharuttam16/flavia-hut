import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import VerticalCard from "../components/VerticalCard";
import SummaryApi from "../common";
import ReactSlider from "react-slider";
import Context from "../context";
import "./Slider.css";

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500]); // Default range
  const [sort, setSort] = useState("latest"); // Default sorting
  const [localItems, setLocalItems] = useState([]);
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const category = urlSearch.get("category");
  const { fetchCartData } = useContext(Context);


  const fetchData = async () => {
    if (!category) return;
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.filterProduct.url, {
        method: SummaryApi.filterProduct.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          priceMin: priceRange[0],
          priceMax: priceRange[1],
          sort,
        }),
      });
      const dataResponse = await response.json();
      setData(dataResponse?.data || []);
      let cartItems = JSON.parse(localStorage.getItem("cart"))
      setLocalItems(cartItems)
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Reset filters when category changes
    setPriceRange([0, 500]);
    setSort("latest");
  }, [category]);

  useEffect(() => {
    fetchData();
  }, [category, priceRange, sort, fetchCartData]);

  return (
    <div className="w-[95%] mx-auto p-4">
      {/* Sorting */}
      <div className="flex items-center justify-end space-x-2">
        <span className="text-gray-700">Sort by:</span>
        <select
          className="px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="latest">Latest</option>
          <option value="price_high">Price - High to Low</option>
          <option value="price_low">Price - Low to High</option>
        </select>
      </div>

      <div className="lg:grid grid-cols-[250px,1fr] mt-4">
        {/* Filters */}
        <div className="bg-white p-2 lg:block hidden lg:relative lg:w-full lg:min-h-full">
          <h2>Filters</h2>
          {/* Price Filter */}
          <div className="mt-[18px]">
            <div className="flex-col">
              <div className="text-sm font-semibold">Price</div>
              <ReactSlider
                className="horizontal-slider"
                thumbClassName="example-thumb"
                trackClassName="example-track"
                step={50}
                min={0}
                max={500}
                value={priceRange}
                onChange={(value) => setPriceRange(value)}
                renderThumb={(props, state) => (
                  <div {...props}>{state.valueNow}</div>
                )}
              />
              <div className="text-xs mt-2">
                ₹{priceRange[0]} - ₹{priceRange[1]}
              </div>
            </div>
          </div>
        </div>
        {/* Product Cards */}
        <div className="sm:px-4 sm:flex sm:flex-col items-center">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <VerticalCard data={data} loading={loading} localItems={localItems}  />
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
