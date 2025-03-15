// const productModel = require("../../models/productModel");

const productModel = require("../../models/productModel");

// const deleteProductController = async (req, res) => {

 
//     try {
//         const { productId } = req.body;

//         // Check if productId is provided
//         if (!productId) {
//             return res.status(400).json({
//                 message: "Product ID is required",
//                 error: true,
//                 success: false,
//             });
//         }

//         // Attempt to delete the product by ID
//         const deletedProduct = await productModel.findByIdAndDelete(productId);

//         // If no product found to delete, respond with an error
//         if (!deletedProduct) {
//             return res.status(404).json({
//                 message: "Product not found",
//                 error: true,
//                 success: false,
//             });
//         }

//         // Success response
//         res.json({
//             message: "Product deleted successfully",
//             success: true,
//             error: false,
//         });
//     } catch (err) {
//         res.status(500).json({
//             message: err.message || "An error occurred while deleting the product",
//             error: true,
//             success: false,
//         });
//     }
// };

// module.exports = deleteProductController;
const deleteProductController = async (req, res) => {

    try {
        const  _id  = req.body._id; 
     
        if (!_id) {
            return res.status(400).json({
                message: "Product ID is required",
                error: true,
                success: false,
            });
        }

        // Attempt to delete the product by _id
        const deletedProduct = await productModel.deleteOne({_id:_id});

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found",
                error: true,
                success: false,
            });
        }

        res.json({
            message: "Product deleted successfully",
            success: true,
            error: false,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "An error occurred while deleting the product",
            error: true,
            success: false,
        });
    }
};

module.exports = deleteProductController;
