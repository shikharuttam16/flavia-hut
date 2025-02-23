import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import CategoryItem from "../components/CategoryItem";

function AllCategories() {
  const [allCategories, setAllCategories] = useState([]);

  // Fetch all categories
  const fetchAllCategories = async () => {
    const response = await fetch(SummaryApi.allCategories.url,{
      method: SummaryApi.allCategories.method,
      credentials:'include'
    })
    const dataResponse = await response.json()
    console.log('All categories data',dataResponse);
    
    setAllCategories(dataResponse)
  }

  useEffect(()=>{
    fetchAllCategories()
  },[])
  return (
    <div className="bg-white pb-4 border overflow-y-scroll">
      <table className="w-full userTable">
        <thead>
          <tr className="bg-black text-white">
            <th>Sr.</th>
            <th>Name</th>
            <th>Edit</th>
            <th>Header</th>
            <th>Home Page</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {allCategories && allCategories.map((categoryItem,index)=><CategoryItem data={categoryItem} />) }
        </tbody>
      </table>
    </div>
  );
}

export default AllCategories;
