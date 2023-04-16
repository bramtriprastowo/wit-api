require("dotenv").config()
const express = require("express");
const app = express();
const cors = require("cors");
const mainRouter = require("./routers/main");
require("./websocket/connection");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Set static files and EJS for MQTT views
app.use("/assets", express.static("public"));
app.set("view engine", "ejs");
app.use('/api/v1', mainRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Connected to ${PORT}`);
});