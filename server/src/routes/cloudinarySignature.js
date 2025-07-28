// routes/cloudinarySignature.js
const express = require('express');
const crypto = require('crypto');
const dotenv = require('dotenv');  

dotenv.config();

const router = express.Router();

router.get('/signature', (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const folder = req.query.folder || 'thumbnails';

  const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;
  const signature = crypto
    .createHash('sha1')
    .update(paramsToSign + process.env.CLOUDINARY_API_SECRET)
    .digest('hex');

    console.log("Generated Cloudinary signature:", signature);
    console.log("Cloudinary Name:", process.env.CLOUDINARY_CLOUD_NAME);
  res.json({
    timestamp,
    signature,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    folder,
  });
});

module.exports = router;
