import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "drxe0t2yg",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
