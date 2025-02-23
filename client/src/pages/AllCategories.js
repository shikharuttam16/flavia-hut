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

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const dataResponse = await response.json();
      setAllCategories(dataResponse);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Refresh list after edit or delete
  const handleUpdate = () => {
    fetchAllCategories();
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <div className="bg-white p-4 border rounded-md">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-black text-white">
            <th className="p-2">#</th>
            <th className="p-2">Name</th>
            <th className="p-2">Slug</th>
            <th className="p-2">Header</th>
            <th className="p-2">Home Page</th>
            <th className="p-2">Edit</th>
            <th className="p-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {allCategories.length > 0 ? (
            allCategories.map((category, index) => (
              <CategoryItem
                key={category._id}
                data={category}
                index={index}
                onUpdate={handleUpdate}
              />
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center p-4">
                No categories found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AllCategories;
