import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import VerticalCard from "../components/VerticalCard";
import SummaryApi from "../common";
import ReactSlider from "react-slider";
import "./Slider.css";

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const category = urlSearch.get("category");

  const fetchData = async () => {
    if (!category) return;
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.filterProduct.url, {
        method: SummaryApi.filterProduct.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category }),
      });
      const dataResponse = await response.json();
      console.log("Fetched category data:", dataResponse);
      setData(dataResponse?.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="w-[95%] mx-auto p-4">
      <div className="flex justify-between">
        <h3>{category?.charAt(0).toUpperCase() + category?.slice(1)}</h3>
        <select className="px-4 py-1 rounded-full border">
          <option value="">Select Filter</option>
          <option value="price">Price</option>
          <option value="availability">Availability</option>
        </select>
      </div>
      <div className="lg:grid grid-cols-[250px,1fr] mt-4">
        <div className="bg-white p-2 lg:block hidden lg:relative lg:w-full lg:min-h-full">
          <h2>Filters</h2>
          <div className="mt-[24px]">
            <div className="flex items-center">
              <span className="text-sm font-semibold">Availability</span>
            </div>
            <form>
              <div>
                <input type="checkbox" className="text-xs" />
                <label className="text-xs ml-[5px]">In Stock</label>
              </div>
              <div>
                <input type="checkbox" className="text-xs" />
                <label className="text-xs ml-[5px]">Out of Stock</label>
              </div>
            </form>
          </div>
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
                renderThumb={(props, state) => (
                  <div {...props}>{state.valueNow}</div>
                )}
              />
            </div>
          </div>
        </div>
        <div className="sm:px-4 sm:flex sm:flex-col items-center">
          {loading ? <p>Loading...</p> : <VerticalCard data={data} loading={loading} />}
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;