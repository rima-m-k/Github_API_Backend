import express, { Application, Request, Response } from "express";
import * as dotenv from "dotenv";
import connectDB from "./config/database";
import cors from "cors";
import globalErrorHandler from "./error/appError";
import { endPointNotFound } from "./routes/utility";
import constants from "./utils/constants";
import userRoutes from "./routes/user.routes";

// Custom type defitions
import "./types/request";

// Express App
const app: Application = express();

// dotenv Configuration
dotenv.config();


app.use(cors());

// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "1mb" }));

// Routing
// Index route
app.all("/api/v1", (req: Request, res: Response) => {
  res.send(constants.indexRouteJSON);
});

// User Routes
app.use("/api/v1/user", userRoutes);

// Handling 404 API endpoints
app.use("*", endPointNotFound);

// Global Error Handler
app.use(globalErrorHandler);

// Connecting the database - MongoDB
connectDB();

export default app;
