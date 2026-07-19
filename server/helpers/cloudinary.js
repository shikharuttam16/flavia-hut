const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "*********",
  api_key: "***********",
  api_secret: ""***********",",
});
const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}
const imageDeleteUtil = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {

    throw error;
  }
};

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil,imageDeleteUtil };
