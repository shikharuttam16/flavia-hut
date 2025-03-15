import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import scrollTop from '../helpers/scrollTop'
import { FaShoppingCart } from 'react-icons/fa'

const CategroyWiseProductDisplay = ({category, heading}) => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

    const { fetchUserAddToCart ,fetchCartData} = useContext(Context)

    const handleAddToCart = async(e,id)=>{
       await addToCart(e,id)
       fetchUserAddToCart()
       fetchCartData()
    }




    const fetchData = async() =>{
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)
        setData(categoryProduct?.data)
    }

    useEffect(()=>{
        fetchData()
    },[])




  return (
    <div className='container mx-auto px-4 my-6 relative'>

            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

                
           <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-start md:gap-6 overflow-x-scroll scrollbar-none transition-all'>
           {

                loading ? (
                    loadingList?.map((product,index)=>{
                        return(
                            <div className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow '>
                                <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                                </div>
                                <div className='p-4 grid gap-3'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                                    <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200  py-2'></p>
                                    <div className='flex gap-3'>
                                        <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                                        <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                                    </div>
                                    <button className='text-sm  text-white px-3  rounded-full bg-slate-200  py-2 animate-pulse'></button>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    data?.map((product,index)=>{
                        return(
                            <Link
                            to={"product/" + product?._id}
                            className="w-full min-w-[280px] md:min-w-[220px] max-w-[280px] md:max-w-[220px] h-[310px] bg-white rounded-md shadow-lg overflow-hidden relative hover:scale-105 transition-transform rounded  "
                          >
                           
                            <div className="absolute right-0 top-0 bg-green-600 text-white text-xs font-bold p-1.5 rounded-md">
                              {product?.discount}%<br />
                              <span className="text-[10px]">OFF</span>
                            </div>
                          
                           
                            <button className="absolute top-10 right-0 bg-white bg-opacity-70 text-black p-1 rounded-full">
                              <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6.14 3.91 4 6.5 4c1.54 0 3.04.99 3.57 2.36h.87C13.46 4.99 14.96 4 16.5 4 19.09 4 21 6.14 21 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                              </svg>
                            </button>
                          
                      
                            <div className="bg-slate-200 h-[180px] border">
                              <img
                                src={product.productImage[0]}
                                className="object-cover h-full w-full  "
                                alt={product?.productName}
                              />
                            </div>
                          
                            <div className="p-4">
                              <h2 className="font-semibold text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                                {product?.productName}
                              </h2>
                             
                             
                              <div className="flex justify-between items-center mt-2">
                                <div className="flex gap-2">
                                  <p className="text-red-600 font-semibold">
                                    {displayINRCurrency(product?.sellingPrice)}
                                  </p>
                                  <p className="text-slate-500 line-through">
                                    {displayINRCurrency(product?.price)}
                                  </p>
                                </div>
                          
                               
                                <FaShoppingCart onClick={(e) => handleAddToCart(e, product?._id)}/>
                              </div>
                        <div>
                            <hr/>
                        </div>
                              {/* Discount Savings */}
                              <p className="text-sm font-bold text-green-600 mt-2">
                                Save - ₹{product?.discount}
                              </p>
                            </div>
                          </Link>
                        )
                    })
                )
                
            }
           </div>
            

    </div>
  )
}

export default CategroyWiseProductDisplay

