// const v2 = require("cloudinary");
import {v2 as cloudinary} from 'cloudinary';
const fs = require("fs");
          

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    if(!localFilePath) return null;

    try {
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: auto });
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

module.exports = { uploadOnCloudinary };