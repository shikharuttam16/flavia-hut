const backendDomin = "https://api.flaviahut.com";

const SummaryApi = {
    signUP : {
        url : `${backendDomin}/api/signup`,
        method : "post"
    },
    signIn : {
        url : `${backendDomin}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${backendDomin}/api/user-details`,
        method : "get"
    },
    logout_user : {
        url : `${backendDomin}/api/userLogout`,
        method : "post"
    },
    allUser : {
        url : `${backendDomin}/api/all-user`,
        method : "get"
    },
    updateUser : {
        url : `${backendDomin}/api/update-user`,
        method : "post"
    },
    uploadProduct : {
        url : `${backendDomin}/api/upload-product`,
        method : "post"
    },
    allProduct : {
        url : `${backendDomin}/api/get-product`,
        method : "get"
    },
    updateProduct : {
        url : `${backendDomin}/api/update-product`,
        method  : "post"
    },
    getConditionalCategory: {
        url : `${backendDomin}/api/getCategoryConditionally`,
        method : "post"
    },
    allCategories: {
        url: `${backendDomin}/api/getCategory`,
        method: "get",
      },
    addCategory:{
        url: `${backendDomin}/api/addCategory`,
        method: "post",
    },
    updateCategory: {
        url: `${backendDomin}/api/updateCategory`,
        method: "put",
      },
    deleteCategory: {
        url: `${backendDomin}/api/deleteCategory`,
        method: "delete",
    },
    categoryProduct : {
        url : `${backendDomin}/api/get-categoryProduct`,
        method : 'get'
    },
    categoryWiseProduct : {
        url : `${backendDomin}/api/category-product`,
        method : 'post'
    },
    productDetails : {
        url : `${backendDomin}/api/product-details`,
        method : 'post'
    },
    addToCartProduct : {
        url : `${backendDomin}/api/addtocart`,
        method : 'post'
    },
    addToCartProductCount : {
        url : `${backendDomin}/api/countAddToCartProduct`,
        method : 'get'
    },
    addToCartProductView : {
        url : `${backendDomin}/api/view-card-product`,
        method : 'get'
    },
    updateCartProduct : {
        url : `${backendDomin}/api/update-cart-product`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `${backendDomin}/api/delete-cart-product`,
        method : 'post'
    },
    searchProduct : {
        url : `${backendDomin}/api/search`,
        method : 'get'
    },
    filterProduct : {
        url : `${backendDomin}/api/filter-product`,
        method : 'post'
    },

    addAddress:{
        url : `${backendDomin}/api/add`,
        method : 'post'
    },
    fetchAddress : {
        url : `${backendDomin}/api/get/:userId`,
        method : 'get'
    },
    deleteAddress : {
        url : `${backendDomin}/api/delete/:userId/:addressId`,
        method : 'delete'
    },
    updateAddress : {
        url : `${backendDomin}/api/update/:userId/:addressId`,
        method : 'put'
    },
    createOrder:{
         url : `${backendDomin}/api/create-order`,
        method : 'post'
    },
    getAllOrdersOfAllUsers: {
        url: `${backendDomin}/api/get`,
        method: 'get',
    },
    orderDetails: {
        url: `${backendDomin}/api/order-details/:id`,
        method: 'get',
    },
    updateOrderStatus: {
        url: `${backendDomin}/api/order-update/:id`,
        method: 'put',
    },
    orderListByUser: {
        url: `${backendDomin}/api/order-list`,
        method: 'get',
    },
    orderDetailsById: {
        url: `${backendDomin}/api/orderdetails/:id`,
        method: 'get',
    },
    addFeatureImage: {
        url: `${backendDomin}/api/addimage`,
        method: 'post',
    },
    getFeatureImages: {
        url: `${backendDomin}/api/getimage`,
        method: 'get',
    },
    deleteFeatureImage: {
        url: `${backendDomin}/api/feature-image/:id`,
        method: 'delete',
    },
    addToWishlist: {
        url: `${backendDomin}/api/wishlist`,
        method: 'post',
    },
    getWishlist: {
        url: `${backendDomin}/api/getwishlist`,
        method: 'get',
    },
    deleteWishlist: {
        url: `${backendDomin}/api/delete-wishlist`,
        method: 'delete',
    },
    updateWishlist: {
        url: `${backendDomin}/api/update-wishlist`,
        method: 'post',
    },
   deleteProductById: {
        url: `${backendDomin}/api/delete-product`,
        method: 'delete',
    },
    paymentOrder:{
         url : `${backendDomin}/order`,
        method  : 'post'
    },
    paymentValidate:{
         url : `${backendDomin}/order/validate`,
        method  : 'post'
    },
    AddFooterDescription:{
        url:`${backendDomin}/api/add-offer`,
        method  : 'post'
    },
    showFooterDescription:{
        url:`${backendDomin}/api/get-offer`,
        method: 'get',
    },
    updateFooterDescription:{
        url:`${backendDomin}/api/update-offer`,
        method: 'put',
    },
    checkEmail: {
        url: `${backendDomin}/api/check-email`,
        method: "POST",
    },
    logout: {
        url: `${backendDomin}/api/logout`,
        method: "POST",
    },
    addToCartFromLocal: {
        url: `${backendDomin}/api/add-to-cart-local-products`,
        method: "POST",
    },

   
}


export default SummaryApi
