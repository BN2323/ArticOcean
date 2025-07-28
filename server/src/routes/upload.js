// routes/cloudinarySignature.js
const express = require('express');
const cloudinary = require('../utils/cloudinary');
const upload = require('../middlewares/multer'); // Assuming you have a middleware for handling file uploads
const router = express.Router();

router.post("/upload", upload.single('image'), (req, res) => {
    cloudinary.uploader.upload(req.file.path, function (error, result) {
        if (error) {
            console.error("Cloudinary upload error:", error);
            return res.status(500).json({ message: "Upload failed", success: false, error });
        }
        
        res.status(200).json({
            message: "Upload successful",
            success: true,
            data: result
        });
    })
});
module.exports = router;
