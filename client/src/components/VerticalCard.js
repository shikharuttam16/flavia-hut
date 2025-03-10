import React, { useContext, useState } from 'react';
import scrollTop from '../helpers/scrollTop';
import displayINRCurrency from '../helpers/displayCurrency';
import Context from '../context';
import addToCart from '../helpers/addToCart';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import addToCartLocally from '../helpers/addToCartLocally';
import { useSelector } from 'react-redux';

const VerticalCard = ({ loading, data = [], localItems }) => {
  const loadingList = new Array(13).fill(null);
  const { fetchUserAddToCart,fetchCartData } = useContext(Context);
  const { getCartItemCountLocal } = useContext(Context);  
  const { cartProduct } = useContext(Context);
  const user = useSelector((state) => state?.user?.user);

  const handleAddToCart = async (e, id) => {
    if(user == null){
      const added =  await addToCartLocally(e, id);
      return added
    }else{ 
      const result =  await addToCart(e, id);
      await fetchUserAddToCart();
      await fetchCartData();
      return result
    }
  };

  return (
    <div className="grid grid-cols-2 max-sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 vertical category-card-parent">
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
              localItems={localItems}
              getCartItemCountLocal = {getCartItemCountLocal}
              cartProduct = {cartProduct}
            />
          ))}
    </div>
  );
};

export default VerticalCard;
