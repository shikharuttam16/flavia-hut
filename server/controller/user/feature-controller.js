
const Feature = require("../../models/Feature");

const cloudinary = require("cloudinary").v2;
const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;

   
    const featureImages = new Feature({
      image,
    });

    await featureImages.save();

    res.status(201).json({
      success: true,
      data: featureImages,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getFeatureImages = async (req, res) => {
  try {
    const images = await Feature.find({});

    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (e) {
  
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};
const deleteFeatureImage = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the feature image by ID
    const featureImage = await Feature.findById(id);
    if (!featureImage) {
      return res.status(404).json({
        success: false,
        message: "Feature image not found",
      });
    }

    // Delete the image from Cloudinary
    const publicId = featureImage.image.split('/').pop().split('.')[0]; // Change 'imageUrl' to 'image'
    await cloudinary.uploader.destroy(publicId);

    // Delete the image from the database
    await Feature.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Feature image deleted successfully",
    });
  } catch (error) {
  
    return res.status(500).json({
      success: false,
      message: "Error deleting feature image",
    });
  }
};




module.exports = { addFeatureImage, getFeatureImages,deleteFeatureImage };
