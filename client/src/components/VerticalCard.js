import React, { useContext } from 'react';
import scrollTop from '../helpers/scrollTop';
import displayINRCurrency from '../helpers/displayCurrency';
import Context from '../context';
import addToCart from '../helpers/addToCart';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const VerticalCard = ({ loading, data = [] }) => {
  const loadingList = new Array(13).fill(null);
  const { fetchUserAddToCart,fetchCartData } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    fetchCartData()
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 vertical">
      {loading
        ? loadingList?.map((product, index) => {
            return (
              <div
                key={index}
                className="w-full bg-white rounded-sm shadow border border-red-200"
              >
                <div className="bg-slate-200 h-48 p-4 flex justify-center items-center animate-pulse"></div>
                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-base text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200"></h2>
                  <p className="capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200 py-2"></p>
                  <div className="flex gap-3">
                    <p className="text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2"></p>
                    <p className="text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2"></p>
                  </div>
                  <button className="text-sm text-white px-3 rounded-full bg-slate-200 py-2 animate-pulse"></button>
                </div>
              </div>
            );
          })
        : data?.map((product, index) => (
            <ProductCard
              key={product?._id}
              product={product}
              handleAddToCart={handleAddToCart} className="verticalss"
            />
          ))}
    </div>
  );
};

export default VerticalCard;
