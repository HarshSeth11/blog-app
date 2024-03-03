// const v2 = require("cloudinary");
const v2 = require("cloudinary");
// import {v2 as cloudinary} from 'cloudinary';
const fs = require("fs");

const cloudinary = v2;

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    if(!localFilePath) return null;

    try {
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" });
        console.log("File is Uploaded: ", response.original_filename);

        // unlink this file. basically delete it from the disk storage.
        fs.unlinkSync(localFilePath);

        // Return the response.
        return response;

    } catch (error) {

        // unlink this file. basically delete it from the disk storage.
        fs.unlinkSync(localFilePath);
        console.log("File Upload failed.", error);
        return null;

    }
}

async function deleteFromCloudinary(fileUrl) {
  try {
    // Get the public ID from the Cloudinary URL
    const publicId = getPublicIdFromUrl(fileUrl);

    // Delete the file using the public ID
    const result = await cloudinary.uploader.destroy(publicId);
    console.log('File deleted successfully:', result);
  } catch (error) {
    console.error('Error deleting file:', error);
  }
}

// Function to extract public ID from Cloudinary URL
function getPublicIdFromUrl(cloudinaryUrl) {
  // Cloudinary URL format: https://res.cloudinary.com/<cloud_name>/<resource_type>/<type>/<public_id>.<format>
  const parts = cloudinaryUrl.split('/');
  const publicIdWithExtension = parts[parts.length - 1]; // Get the last part
  const publicId = publicIdWithExtension.split('.')[0]; // Remove the file extension
  return publicId;
}



module.exports = { uploadOnCloudinary, deleteFromCloudinary };