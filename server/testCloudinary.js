import dotenv from "dotenv";
dotenv.config();

import cloudinary from "./config/cloudinary.js";

console.log("Cloudinary Config:", cloudinary.config());

try {
  const result = await cloudinary.api.ping();
  console.log("✅ Connected Successfully");
  console.log(result);
} catch (err) {
  console.error("❌ Connection Failed");
  console.error(err);
}
