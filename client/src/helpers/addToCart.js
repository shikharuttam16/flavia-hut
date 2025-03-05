import SummaryApi from "../common"
import { toast } from 'react-toastify'

const addToCart = async(e,id,quantity = 1) =>{
    // console.log("Received Quantity:", quantity);
    e?.stopPropagation()
    e?.preventDefault()

    const response = await fetch(SummaryApi.addToCartProduct.url,{
        method : SummaryApi.addToCartProduct.method,
        credentials : 'include',
        headers : {
            "content-type" : 'application/json'
        },
        body : JSON.stringify(
            { productId : id, quantity }
        )
    })

    const responseData = await response.json()

    if(responseData.success){
        toast.success(responseData.message)
        return true
    }

    if(responseData.error){
        toast.error(responseData.message)
    }


    return responseData

}


export default addToCart