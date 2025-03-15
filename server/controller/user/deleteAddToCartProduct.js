const addToCartModel = require("../../models/cartProduct");

const deleteCartProducts = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const addToCartProductId = req.body._id;

        let deleteResult;

        if (addToCartProductId) {
            // Delete a specific product from the cart
            deleteResult = await addToCartModel.deleteOne({ _id: addToCartProductId, userId: currentUserId });
            res.json({
                message: "Product deleted from cart",
                error: false,
                success: true,
                data: deleteResult,
            });
        } else {
            // Delete all products from the cart for the current user
            deleteResult = await addToCartModel.deleteMany({ userId: currentUserId });
            res.json({
                message: "All products deleted from cart",
                error: false,
                success: true,
                data: deleteResult,
            });
        }
    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false,
        });
    }
};

module.exports = deleteCartProducts;
