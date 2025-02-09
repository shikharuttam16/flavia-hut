const wishlistModel = require("../../models/wishlist");

const addToWishlistController = async (req, res) => {
    try {
        const { productId } = req.body; // Get the productId from the request body
        const currentUser = req.userId; // Assume userId is set in the request

        // Check if the product is already in the wishlist
        const isProductInWishlist = await wishlistModel.findOne({ productId });

        if (isProductInWishlist) {
            return res.json({
                message: "Already exists in the wishlist",
                success: false,
                error: true,
            });
        }

        // Create a new wishlist item payload
        const payload = {
            productId: productId,
            userId: currentUser,
            quantity: 1,
        };

        // Create a new instance of the wishlist model
        const newWishlistItem = new wishlistModel(payload);
        const savedWishlistItem = await newWishlistItem.save(); // Save the new item to the database

        return res.json({
            data: savedWishlistItem,
            message: "Product added to wishlist",
            success: true,
            error: false,
        });
        
    } catch (err) {
        return res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

module.exports = addToWishlistController;
