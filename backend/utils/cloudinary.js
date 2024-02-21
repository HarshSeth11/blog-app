// const v2 = require("cloudinary");
const v2 = require("cloudinary");
// import {v2 as cloudinary} from 'cloudinary';
const fs = require("fs");

const cloudinary = v2;

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
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

// Function to delete a file from Cloudinary using its URL
async function deleteFromCloudinary(fileUrl) {
    try {
      // Search for the file using its URL
      const searchResult = await cloudinary.search
        .expression(`url:${fileUrl}`)
        .execute();
      
      // Extract the public ID from the search result
      const publicId = searchResult.resources[0].public_id;
  
      // Delete the file using the public ID
      const result = await cloudinary.uploader.destroy(publicId);
      console.log('File deleted successfully:', result);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }

module.exports = { uploadOnCloudinary, deleteFromCloudinary };