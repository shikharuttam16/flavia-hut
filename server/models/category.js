const mongoose = require("mongoose");
const slugify = require("slugify"); // Optional: For automatic slug generation

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
  },
  { timestamps: true } // Adds createdAt & updatedAt fields automatically
);

// Middleware to auto-generate slug before saving
CategorySchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
