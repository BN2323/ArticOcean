// utils/cloudinary.js
import axios from 'axios';
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";


export async function getCloudinarySignature(folder) {
  const { data } = await axios.get(`${API_BASE}/cloudinary/signature?folder=${folder}`, {
    headers: {
     Authorization: `Bearer ${localStorage.getItem("token")}`,
  }});
  console.log("Cloudinary signature data:", data);
  return data;
}

export async function uploadToCloudinary(file, folder = 'thumbnails') {
  const { timestamp, signature, apiKey, cloudName } = await getCloudinarySignature(folder);
    console.log(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`);
  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', apiKey);
  formData.append('timestamp', timestamp);
  formData.append('signature', signature);
  formData.append('folder', folder);

  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );

  
    console.log("Uploaded to Cloudinary:", data.secure_url);
  return data.secure_url;
}
