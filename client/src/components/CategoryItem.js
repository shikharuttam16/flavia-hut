import React from "react";

function CategoryItem({ data, index }) {
  return (
    <tr className="border-b">
      <td className="p-2 text-center">{index + 1}</td>
      <td className="p-2">{data.name}</td>
      <td className="p-2">{data.slug}</td>
      <td className="p-2 text-center">
        {data.visibleInHeader ? "✅" : "❌"}
      </td>
      <td className="p-2 text-center">
        {data.visibleOnHomePage ? "✅" : "❌"}
      </td>
      <td className="p-2 text-center">
        <button className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
      </td>
      <td className="p-2 text-center">
        <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
      </td>
    </tr>
  );
}

export default CategoryItem;
