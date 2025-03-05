const mongoose = require("mongoose");
const addToCartModel = require("../../models/cartProduct")
const ProductModel = require("../../models/productModel");

const addToCartLocally = async (req, res) => {
    try {
        const { productIds, userId, quantity } = req.body;
        
        if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
            return res.status(400).json({ message: "Invalid product IDs." });
        }
        console.log("product ids",productIds);
        
        const validProducts = await ProductModel.find({ _id: { $in: productIds } });
        const validProductIds = validProducts.map((product) => product._id.toString());

        if (validProductIds.length === 0) {
            return res.status(404).json({ message: "No valid products found." });
        }

        for (const productId of validProductIds) {
            const existingCartItem = await addToCartModel.findOne({ userId, productId });
            if (existingCartItem) {
                existingCartItem.quantity += quantity || 1;
                await existingCartItem.save();
            } else {
                await addToCartModel.create({ userId, productId, quantity: quantity || 1 });
            }
        }

        res.status(200).json({ message: "Products added to cart successfully." });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = addToCartLocally;