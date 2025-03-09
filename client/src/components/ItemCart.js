import { FiPlus } from "react-icons/fi";
import { AiOutlineMinus } from "react-icons/ai";
import { CgTrash } from "react-icons/cg";
import { FaChevronDown } from "react-icons/fa"; // FontAwesome
import { useEffect, useState } from "react";

const ItemCart = ({
  id,
  name,
  image,
  description,
  price,
  sellingPrice,
  quantity,
  onMinusButton,
  onPlusButton,
  onDeleteButton,
  cartLength,
  index,
}) => {
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };
  const [qty, setQty] = useState(1);

  useEffect(()=>{
    
  },[qty])

  return (
    <>
      <div className="flex">
        <div className="min-h-40 flex flex-col items-center justify-center p-4 max-sm:p-1">
          {/* Image area */}
          <div className="">
            <img src={image} alt={name} className="w-24 object-cover" />
          </div>

          {/* Counter Section */}
          <div className="flex items-center gap-x-4 mt-3 self-start max-sm:gap-x-2">
            <button
              className="w-8 h-8 flex items-center justify-center text-lg font-bold block "
              onClick={onMinusButton}
            >
              <AiOutlineMinus size={24} />
            </button>
            <span className="text-sm border rounded-md border-gray-300 px-3.5 py-2 block ">
              {quantity}
            </span>
            <button
              className="w-8 h-8 flex items-center justify-center text-lg font-bold block "
              onClick={onPlusButton}
            >
              <FiPlus size={24} />
            </button>
          </div>
        </div>

        <div className="w-full px-6 py-6 max-sm:px-0">
          {/* Product Title */}
          <div className="title flex items-center justify-between">
            <p className="font-semibold text-lg">{name}</p>
            {/* <p className="text-sm font-semibold">
              Delivery by <span>Mon Feb 18</span>
            </p> */}
          </div>

          {/* Description */}
          <div className="mt-2 description w-full max-w-md">
            <p className=" text-base sm:text-lg font-medium text-gray-500 line-clamp-2 break-words">
              {truncateText(description, 190)}
            </p>
          </div>

          {/* Price */}
          <div className="mt-5 flex gap-x-8 items-center max-sm:items-start max-sm:flex-col">
             <span className="text-xs text-white  bg-[#56CF01] rounded-md px-3 py-[3px]">Save<span>Rs.{price - sellingPrice}</span> </span>
            <div className="flex items-center gap-4">
              <div className="font-light">
                <span className="line-through max-sm:text-sm font-extralight whitespace-nowrap">Rs.{price}</span>
              </div>
              <div className="flex items-center gap-x-2 max-sm:ml-[12px]">
                <span className="text-2xl text-[#56CF01] font-semibold max-sm:text-sm whitespace-nowrap">
                  Rs. {sellingPrice}
                </span>
                <p className="text-sm font-light max-sm:text-[.5rem] whitespace-nowrap">(incl. of all taxes)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Remove Button */}
        <div className="mt-6">
          <button onClick={onDeleteButton}>
            <CgTrash size={24} color="red" />
          </button>
        </div>
      </div>
      {/* Conditionally render <hr> */}
      {index !== cartLength - 1 && (
        <hr className="border-t-2 border-gray-500" />
      )}
    </>
  );
};

export default ItemCart;
