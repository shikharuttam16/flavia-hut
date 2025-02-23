const backendDomain = "https://flavia-hut.vercel.app"

const SummaryApi = {
    signUP : {
        url : `${backendDomain}/api/signup`,
        method : "post"
    },
    signIn : {
        url : `${backendDomain}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${backendDomain}/api/user-details`,
        method : "get"
    },
    logout_user : {
        url : `${backendDomain}/api/userLogout`,
        method : 'get'
    },
    allUser : {
        url : `${backendDomain}/api/all-user`,
        method : 'get'
    },
    updateUser : {
        url : `${backendDomain}/api/update-user`,
        method : "post"
    },
    uploadProduct : {
        url : `${backendDomain}/api/upload-product`,
        method : 'post'
    },
    allProduct : {
        url : `${backendDomain}/api/get-product`,
        method : 'get'
    },
    updateProduct : {
        url : `${backendDomain}/api/update-product`,
        method  : 'post'
    },
    allCategories : {
        url : `${backendDomain}/api/getCategory` ,
        method : 'get'
    },
    addCategory: {
        url: `${backendDomain}/api/addCategory`,
        method: "POST",
    },
    updateCategory: {
        url: `${backendDomain}/api/updateCategory`,
        method: "PUT",
    },
    deleteCategory: {
        url: `${backendDomain}/api/deleteCategory`,
        method: "DELETE",
    },
    categoryProduct : {
        url : `${backendDomain}/api/get-categoryProduct`,
        method : 'get'
    },
    categoryWiseProduct : {
        url : `${backendDomain}/api/category-product`,
        method : 'post'
    },
    productDetails : {
        url : `${backendDomain}/api/product-details`,
        method : 'post'
    },
    addToCartProduct : {
        url : `${backendDomain}/api/addtocart`,
        method : 'post'
    },
    addToCartProductCount : {
        url : `${backendDomain}/api/countAddToCartProduct`,
        method : 'get'
    },
    addToCartProductView : {
        url : `${backendDomain}/api/view-card-product`,
        method : 'get'
    },
    updateCartProduct : {
        url : `${backendDomain}/api/update-cart-product`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `${backendDomain}/api/delete-cart-product`,
        method : 'post'
    },
    searchProduct : {
        url : `${backendDomain}/api/search`,
        method : 'get'
    },
    filterProduct : {
        url : `${backendDomain}/api/filter-product`,
        method : 'post'
    },

    addAddress:{
        url : `${backendDomain}/api/add`,
        method : 'post'
    },
    fetchAddress : {
        url : `${backendDomain}/api/get/:userId`,
        method : 'get'
    },
    deleteAddress : {
        url : `${backendDomain}/api/delete/:userId/:addressId`,
        method : 'delete'
    },
    updateAddress : {
        url : `${backendDomain}/api/update/:userId/:addressId`,
        method : 'put'
    },
    createOrder:{
         url : `${backendDomain}/api/create-order`,
        method : 'post'
    },
    createOrder: {
        url: `${backendDomain}/api/create-order`,
        method: 'post',
    },
    getAllOrdersOfAllUsers: {
        url: `${backendDomain}/api/get`,
        method: 'get',
    },
    orderDetails: {
        url: `${backendDomain}/api/order-details/:id`,
        method: 'get',
    },
    updateOrderStatus: {
        url: `${backendDomain}/api/order-update/:id`,
        method: 'put',
    },
    orderListByUser: {
        url: `${backendDomain}/api/order-list/:userId`,
        method: 'get',
    },
    orderDetailsById: {
        url: `${backendDomain}/api/orderdetails/:id`,
        method: 'get',
    },
    addFeatureImage: {
        url: `${backendDomain}/api/addimage`,
        method: 'post',
    },
    getFeatureImages: {
        url: `${backendDomain}/api/getimage`,
        method: 'get',
    },
    deleteFeatureImage: {
        url: `${backendDomain}/api/feature-image/:id`,
        method: 'delete',
    },
    addToWishlist: {
        url: `${backendDomain}/api/wishlist`,
        method: 'post',
    },
    getWishlist: {
        url: `${backendDomain}/api/getwishlist`,
        method: 'get',
    },
    deleteWishlist: {
        url: `${backendDomain}/api/delete-wishlist`,
        method: 'delete',
    },
    updateWishlist: {
        url: `${backendDomain}/api/update-wishlist`,
        method: 'post',
    },
   deleteProductById: {
        url: `${backendDomain}/api/delete-product`,
        method: 'delete',
    },
    deleteProductById : {
        url : `${backendDomain}/api/delete-product`,
        method  : 'delete'
    },
    paymentOrder:{
         url : `${backendDomain}/order`,
        method  : 'post'
    },
    paymentValidate:{
         url : `${backendDomain}/order/validate`,
        method  : 'post'
    }
}


export default SummaryApi
