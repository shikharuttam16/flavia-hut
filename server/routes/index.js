const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require('../controller/user/userSignIn')
const userDetailsController = require('../controller/user/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const addToCartViewProduct  = require('../controller/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')
const { addAddress, fetchAllAddress, deleteAddress, editAddress } = require('../controller/product/address-controller')
const { getAllOrdersOfAllUsers, updateOrderStatus, getOrderDetailsForAdmin } = require('../controller/user/order-controller-Admin')
const { createOrder, getAllOrdersByUser, getOrderDetails } = require('../controller/user/order-controller')
const { addFeatureImage, getFeatureImages, deleteFeatureImage } = require('../controller/user/feature-controller')
const addToWishlistController = require('../controller/user/addToWishlistController')
const getWishlistController = require('../controller/user/getWishlistController')
const updateWishlist = require('../controller/user/updateWishlist')
const deleteWishlistProduct = require('../controller/user/deleteWishlistProduct')
const deleteProductController = require('../controller/product/deleteProductController')



router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)

//admin panel 
router.get("/all-user",authToken,allUsers)
router.post("/update-user",authToken,updateUser)

//product
router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)

//user add to cart
router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-card-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)



router.post("/add",authToken,addAddress);
router.get("/get/:userId", authToken, fetchAllAddress);
router.delete("/delete/:userId/:addressId", authToken, deleteAddress);
router.put("/update/:userId/:addressId",authToken, editAddress);
router.get("/get", getAllOrdersOfAllUsers);
router.get("/order-details/:id", getOrderDetailsForAdmin);
router.put("/order-update/:id", updateOrderStatus);

router.post("/create-order", createOrder);
router.get("/order-list/:userId", getAllOrdersByUser);
router.get("/orderdetails/:id", getOrderDetails);

router.post("/addimage", addFeatureImage);
router.get("/getimage", getFeatureImages);
router.delete("/feature-image/:id", deleteFeatureImage);
router.post('/wishlist',authToken, addToWishlistController);
router.get('/getwishlist',authToken, getWishlistController);
router.post('/update-wishlist',authToken, updateWishlist);
router.delete('/delete-wishlist',authToken, deleteWishlistProduct);
router.delete('/delete-product',authToken, deleteProductController);
module.exports = router;

