const addToCartModel = require("../../models/cartProduct")
const wishlistModel = require("../../models/wishlist")
const addToWishlistController = require("./addToWishlistController")

const deleteWishlistProduct = async(req,res)=>{
    try{
        const currentUserId = req.userId 
        const addToWishlistProductId = req.body._id
        

        const deleteProduct = await wishlistModel.deleteOne({ _id : addToWishlistProductId})

        res.json({
            message : "Product Deleted From Wishlist",
            error : false,
            success : true,
            data : deleteProduct
        })

    }catch(err){
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = deleteWishlistProduct