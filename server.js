const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerJsDocOptionConstant = require("./constants/swaggerJsDoc.option.constant");
const dataRouter = require("./route/data-route");
const healthCheck = require("./route/health-check");
const GetNikkei = require("./services/get-nikkei");
const swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express");
const ManagerController = require("./services/manager-controller");
require("dotenv").config();

// Constants
const app = express();
const port = process.env.PORT || 4300;
const corsOpts = {
  origin: "*",
  methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE", "OPTIONS"],
};
const specs = swaggerJsdoc(swaggerJsDocOptionConstant);

// Routers
app.use(cors(corsOpts));
app.use(express.json());
app.use("/api", dataRouter);
app.use("/health", healthCheck);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// MongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("strictQuery", true);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

var server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

ManagerController.startInterval();

module.exports = server;
