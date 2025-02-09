import React, { useState } from "react";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import SummaryApi from "../common";
import { FiDelete } from "react-icons/fi";

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(SummaryApi.deleteProductById.url, {
        method: SummaryApi.deleteProductById.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete the product");
      }

      const responseData = await response.json();
 
      if (responseData.success) {
        fetchdata(); // Refresh data if deletion is successful
      }
    } catch (error) {
     
    }
  };

  return (
    <div className="bg-white p-4 rounded mt-4">
      <div className="w-40">
        <div className="w-32 h-32 flex justify-center items-center">
          <img
            src={data?.productImage[0]}
            className="mx-auto object-fill h-full"
          />
        </div>
        <h1 className="text-ellipsis line-clamp-2">{data.productName}</h1>

        <div>
          <p className="font-semibold">
            {displayINRCurrency(data.sellingPrice)}
          </p>
          <div className="flex ">
            <div
              className="w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer"
              onClick={() => setEditProduct(true)}>
              <MdModeEditOutline />
            </div>

            <div
              className="w-fit ml-auto p-2 bg-red-100 hover:bg-red-600 rounded-full hover:text-white cursor-pointer"
              onClick={() => deleteProduct(data._id)}>
              <MdDelete />
            </div>
          </div>
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
