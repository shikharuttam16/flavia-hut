const addToCartLocally = async (e, id) => {
    e?.stopPropagation();
    e?.preventDefault();

    // Retrieve existing cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the id already exists in the array
    if (!cartItems.includes(id)) {
        cartItems.push(id); // Add new id if not already in the cart
        localStorage.setItem("cart", JSON.stringify(cartItems)); // Store updated array in localStorage
        return true
    }else{
        return false
    }
};

export default addToCartLocally;
