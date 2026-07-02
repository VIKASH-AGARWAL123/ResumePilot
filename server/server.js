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
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
