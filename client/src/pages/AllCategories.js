import React from "react";

function AllCategories() {
  return (
    <div className="bg-white pb-4 border overflow-y-scroll">
      <table className="w-full userTable">
        <thead>
          <tr className="bg-black text-white">
            <th>Sr.</th>
            <th>Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default AllCategories;
