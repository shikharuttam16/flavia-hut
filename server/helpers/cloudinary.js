const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "dp3tcxxbx",
  api_key: "816247688469996",
  api_secret: "OJ6WrengyCE2_8B_JROGMM_JUf0",
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
