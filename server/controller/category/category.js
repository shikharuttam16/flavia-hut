const slugify = require("slugify");
const Category = require("../../models/productCategory");

// Create a new category
const addCategory = async (req, res) => {
  try {
    const { name, visibleInHeader, visibleOnHomePage } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const slug = slugify(name, { lower: true, strict: true });
    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = new Category({ name, slug, visibleInHeader, visibleOnHomePage });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get all categories
const getCategory = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const getCategoryConditionally = async (req, res)=>{
   try {
     const renderIn = req.body.renderIn;
     let categories='';
     if(renderIn === "header"){
        categories = await Category.find({
          visibleInHeader: true
        })
     }else{
        categories = await Category.find({
          visibleOnHomePage:true
        })
     }
     res.status(200).json(categories)
   } catch (error) {
     res.status(500).json({ message: "Server Error",error })    
   }
}

// Update a category by ID
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, visibleInHeader, visibleOnHomePage } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const slug = slugify(name, { lower: true, strict: true });
    const category = await Category.findByIdAndUpdate(
      id,
      { name, slug, visibleInHeader, visibleOnHomePage },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Delete a category by ID
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = { addCategory, getCategory, updateCategory, deleteCategory, getCategoryConditionally };
