import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import CategoryItem from "../components/CategoryItem";

function AllCategories() {
  const [allCategories, setAllCategories] = useState([]);

  // Fetch all categories
  const fetchAllCategories = async () => {
    try {
      const response = await fetch(SummaryApi.allCategories.url, {
        method: SummaryApi.allCategories.method,
        credentials: "include",
      });
      const dataResponse = await response.json();
      console.log("All categories data", dataResponse);
      setAllCategories(dataResponse);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <div className="bg-white pb-4 border overflow-y-scroll">
      <table className="w-full userTable">
        <thead>
          <tr className="bg-black text-white">
            <th>Sr.</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Visible in Header</th>
            <th>Visible on Home Page</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {allCategories &&
            allCategories.map((categoryItem, index) => (
              <CategoryItem key={categoryItem._id} data={categoryItem} index={index} />
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllCategories;
