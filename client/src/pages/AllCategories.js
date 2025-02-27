import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import CategoryItem from "../components/CategoryItem";

function AllCategories() {
  const [allCategories, setAllCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [visibleInHeader, setVisibleInHeader] = useState(false);
  const [visibleOnHomePage, setVisibleOnHomePage] = useState(false);
  const [loading, setLoading] = useState(false);

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

  // Handle Add Category
  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      alert("Category name is required!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(SummaryApi.addCategory.url, {
        method: SummaryApi.addCategory.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newCategory,
          visibleInHeader,
          visibleOnHomePage,
        }),
        credentials:'include'
      });

      if (!response.ok) {
        throw new Error("Failed to add category");
      }

      // Reset state and close modal
      setNewCategory("");
      setVisibleInHeader(false);
      setVisibleOnHomePage(false);
      setIsModalOpen(false);
      fetchAllCategories(); // Refresh list after adding
    } catch (error) {
      console.error("Error adding category:", error);
    } finally {
      setLoading(false);
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

      {/* Button to open modal */}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Add New Category
      </button>

      {/* Add Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Add New Category</h3>
            <input
              type="text"
              placeholder="Enter category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="border p-2 rounded w-full mb-3"
            />
            <div className="flex items-center gap-3 mb-4">
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={visibleInHeader}
                  onChange={(e) => setVisibleInHeader(e.target.checked)}
                />
                Show in Header
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={visibleOnHomePage}
                  onChange={(e) => setVisibleOnHomePage(e.target.checked)}
                />
                Show on Home Page
              </label>
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleAddCategory}
                disabled={loading}
              >
                {loading ? "Adding..." : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category List */}
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
