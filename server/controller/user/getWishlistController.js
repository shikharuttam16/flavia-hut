const wishlistModel = require("../../models/wishlist"); // Adjust the path as necessary

const getWishlistController = async (req, res) => {
    try {
        const currentUser = req.userId; // Assume userId is set in the request

        // Fetch all wishlist items for the current user
        const wishlistItems = await wishlistModel.find({ userId: currentUser }).populate('productId'); // Populate to get product details

        return res.json({
            data: wishlistItems,
            message: "Wishlist items fetched successfully",
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

module.exports = getWishlistController;
