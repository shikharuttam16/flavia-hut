import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalCard from '../components/VerticalCard'

const SearchProduct = () => {
    const query = useLocation()
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const [localItems, setLocalItems] = useState([]);

    const fetchProduct = async()=>{
        setLoading(true)
        const response = await fetch(SummaryApi.searchProduct.url+query.search)
        const dataResponse = await response.json()
        setLoading(false)
        let cartItems = JSON.parse(localStorage.getItem("cart"));
        setLocalItems(cartItems);
        setData(dataResponse.data)
        
        
        
    }

    useEffect(()=>{
        fetchProduct()
    },[query])

  return (
    <div className='container mx-auto p-4'>
      {
        loading && (
          <p className='text-lg text-center'>Loading ...</p>
        )
      }
 
      <p className='text-lg font-semibold my-3 mb-4 text-center'>Search Results : {data?.length}</p>

      {
        data?.length === 0 && !loading && (
           <p className='bg-white text-lg text-center p-4'>No Data Found....</p>
        )
      }


 <div className="px-4  flex flex-col items-center ">
          {data.length !== 0 && !loading && (
            <VerticalCard data={data} loading={loading} localItems={localItems} />
          )}
        </div>
    </div>
  )
}

export default SearchProduct