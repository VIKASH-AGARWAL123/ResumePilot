import dotenv from "dotenv";
dotenv.config({
    quiet: true,
});

import app from "./app.js";
import connectDB from "./config/db.js";

// Get port from environment variables
const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start the server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
        console.log("API Key:", process.env.CLOUDINARY_API_KEY);
        console.log(
          "API Secret:",
          process.env.CLOUDINARY_API_SECRET ? "Loaded" : "Not Loaded",
        );
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
