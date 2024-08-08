import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import authRoutes from "./routes/auth.js";
import finxsRoutes from "./routes/finxs.js";

// Data imports - MongoDB models and some initial data
import Members from "./models/Members.js";
import Teams from "./models/Teams.js";
import Organisations from "./models/Organisations.js";
import { dataMembers, dataTeams, dataOrganisation } from "./data/index.js";

/* CONFIGURATIONS */
// Loading environment variables from a .env file
dotenv.config();

// Creating an instance of Express.js
const app = express();

// Middleware configurations
app.use(express.json({ limit: "5mb" })); // Parses incoming JSON payloads
app.use(helmet()); // Sets various HTTP headers for security
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Enables CORS with specific policy
app.use(morgan("common")); // Logs HTTP requests to the console
app.use(cors()); // Enables Cross-Origin Resource Sharing

/* Routes */
app.use("/client", clientRoutes); // Mounting clientRoutes under "/client"
app.use("/auth", authRoutes); // Mounting authRoutes under "/auth"
app.use("/finxs", finxsRoutes); // Mounting finxsRoutes under "/finxs"

/* Mongoose Setup */
const PORT = process.env.PORT || 9000;

// Connecting to MongoDB using Mongoose
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // If the connection is successful, start the server on the specified PORT
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    // Used for adding initial data to the database - uncomment once data has been populated once.
    //Members.insertMany(dataMembers);
    //Teams.insertMany(dataTeams);
    //Organisations.insertMany(dataOrganisation);
  })
  .catch((error) => console.log(`${error} did not connect`));
