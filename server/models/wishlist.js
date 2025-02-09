const mongoose = require('mongoose');

// Define the wishlist schema
const wishlistSchema = mongoose.Schema({
    productId : {
        ref : 'product',
        type : String,
   },
   quantity : Number,
   userId : String,
}, {
    timestamps: true, // Automatically create createdAt and updatedAt fields
});

// Create the wishlist model
const wishlistModel = mongoose.model("wishlist", wishlistSchema);

// Export the wishlist model
module.exports = wishlistModel;
