import React, { useState } from "react";
import SummaryApi from "../common";

function CategoryItem({ data, index, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [categoryName, setCategoryName] = useState(data.name);
  const [visibleInHeader, setVisibleInHeader] = useState(data.visibleInHeader);
  const [visibleOnHomePage, setVisibleOnHomePage] = useState(data.visibleOnHomePage);

  // Handle Edit (Update Category)
  const handleEdit = async () => {
    try {
      const response = await fetch(`${SummaryApi.updateCategory.url}/${data._id}`, {
        method: SummaryApi.updateCategory.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: categoryName,
          visibleInHeader,
          visibleOnHomePage,
        }),
        credentials:'include'
      });

      if (response.ok) {
        setIsEditing(false);
        onUpdate(); // Refresh category list after update
      } else {
        console.error("Failed to update category");
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  // Handle Delete (Remove Category)
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      const response = await fetch(`${SummaryApi.deleteCategory.url}/${data._id}`, {
        method: SummaryApi.deleteCategory.method,
      });

      if (response.ok) {
        onUpdate(); // Refresh category list after deletion
      } else {
        console.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <tr className="border-b">
      <td className="p-2 text-center">{index + 1}</td>
      <td className="p-2">
        {isEditing ? (
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="border p-1 rounded w-full"
          />
        ) : (
          data.name
        )}
      </td>
      <td className="p-2">{data.slug}</td>
      <td className="p-2 text-center">
        {isEditing ? (
          <input
            type="checkbox"
            checked={visibleInHeader}
            onChange={(e) => setVisibleInHeader(e.target.checked)}
          />
        ) : data.visibleInHeader ? "✅" : "❌"}
      </td>
      <td className="p-2 text-center">
        {isEditing ? (
          <input
            type="checkbox"
            checked={visibleOnHomePage}
            onChange={(e) => setVisibleOnHomePage(e.target.checked)}
          />
        ) : data.visibleOnHomePage ? "✅" : "❌"}
      </td>
      <td className="p-2 text-center">
        {isEditing ? (
          <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={handleEdit}>
            Save
          </button>
        ) : (
          <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
      </td>
      <td className="p-2 text-center">
        <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default CategoryItem;
