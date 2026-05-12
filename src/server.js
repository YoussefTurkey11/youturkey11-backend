import { connectDB } from "./config/db.js";
import app from "./app.js";
import config from "./config/index.js";

const port = config.port;

process.on("uncaughtException", (err) => {
  console.error(`Uncaught Exception: ${err.name} | ${err.message}`);
  process.exit(1);
});

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(port, () =>
      console.log(`Server is running on ${port} port`),
    );

    // Handle Rejections outof Express
    process.on("unhandledRejection", (err) => {
      console.error(`Unhandled Rejection: ${err.name} | ${err.message}`);
      server.close(() => {
        console.log("Server shutting down");
        process.exit(1);
      });
    });
  } catch (err) {
    console.error(`Database connection failed: ${err.message}`);
    process.exit(1);
  }
};

startServer();
