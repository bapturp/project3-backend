const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME || 'toto',
  api_key: process.env.CLOUDINARY_KEY || '1234abcd',
  api_secret: process.env.CLOUDINARY_SECRET || '🤫',
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'], // If you want to restrict to some filetypes
    folder: 'court-circuits', // The name of the folder in cloudinary
    // resource_type: 'raw' => this is in case you want to upload other type of files, not just images
  },
});

module.exports = multer({ storage });
