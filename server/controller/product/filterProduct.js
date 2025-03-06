const productModel = require("../../models/productModel");

const filterProductController = async (req, res) => {
  try {
    const { category, priceMin, priceMax, sort } = req.body;

    let query = {};
    
    // Category filter
    if (category) {
      query.category = { "$in": [category] };
    }

    // Price range filter
    if (priceMin !== undefined && priceMax !== undefined) {
      query.price = { $gte: priceMin, $lte: priceMax };
    }

    let sortQuery = {};
    if (sort === "price_high") {
      sortQuery.price = -1;
    } else if (sort === "price_low") {
      sortQuery.price = 1;
    } else {
      sortQuery.createdAt = -1; // Default sorting (latest)
    }

    const products = await productModel.find(query).sort(sortQuery);

    res.json({
      data: products,
      message: "Products fetched successfully",
      error: false,
      success: true
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false
    });
  }
};

module.exports = filterProductController;
