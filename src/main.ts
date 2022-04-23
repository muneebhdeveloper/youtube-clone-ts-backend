import { CORS_ORIGIN } from "./constants";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import { connectToDatabase, disconnectToDatabase } from "./utils/database";
import logger from "./utils/logger";
import userRoute from "./modules/user/user.route";
import authRoute from "./modules/auth/auth.route";
import deserializeUser from "./middlewares/deserializeUser";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);
app.use(helmet());
app.use(deserializeUser);

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

const server = app.listen(PORT, async () => {
  await connectToDatabase();
  logger.info(`Server is running on http://localhost:${PORT}`);
});

const signals = ["SIGTERM", "SIGINT"];

const grafefulShutdown = (signal: string) => {
  process.on(signal, async () => {
    logger.info(`Goodbye got signal "${signal}"`);
    server.close();

    await disconnectToDatabase();

    logger.info(`Server is closed gracefully`);

    process.exit(0);
  });
};

for (const signal of signals) {
  grafefulShutdown(signal);
}
