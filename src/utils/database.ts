import mongoose from "mongoose";
import logger from "./logger";

const DB_CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING ||
  "mongodb+srv://admin:wJ3VC6fdwYFq4CHm@cluster0.w9lnf.mongodb.net/youtube-clone?retryWrites=true&w=majority";

export async function connectToDatabase() {
  try {
    await mongoose.connect(DB_CONNECTION_STRING);
    logger.info("Database Connected");
  } catch (e) {
    logger.error(e, "Failed to connect to the database. Goodbye");
    process.exit(1);
  }
}

export async function disconnectToDatabase() {
  await mongoose.connection.close();

  logger.info("Disconnect from database");

  return;
}
