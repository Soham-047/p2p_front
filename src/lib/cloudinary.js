// utils/uploadToCloudinary.js
export async function uploadToCloudinary(file) {
    if (!file) throw new Error("No file provided for upload");
  
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME; // e.g. "dx123abc"
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET; // unsigned preset name
  
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
  
    try {
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });
  
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Cloudinary upload failed: ${errText}`);
      }
  
      const data = await res.json();
      return data.secure_url; // ✅ return final image URL
    } catch (err) {
      console.error("Upload error:", err);
      throw err;
    }
  }
  