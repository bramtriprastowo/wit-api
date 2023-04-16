const express = require("express");
const usersRouter = require("./usersRouter");
const sensorsRouter = require("./sensorsRouter");
const mqttRouter = require("./mqttRouter");
const mainRouter = express.Router();

mainRouter
    .use("/users", usersRouter)
    .use("/sensors", sensorsRouter)
    .use("/mqtt", mqttRouter)

module.exports = mainRouter