const sensorsRouter = require("express").Router();
const sensorsController = require("../controllers/sensorsController");
const { verifyAccessToken } = require("../middlewares/verifyToken");

sensorsRouter
    .get("/", verifyAccessToken, sensorsController.getAllSensors)
    .post("/", verifyAccessToken, sensorsController.addSensor)
    .put("/:id", verifyAccessToken, sensorsController.updateSensor)
    .delete("/:id", verifyAccessToken, sensorsController.deleteSensor)

module.exports = sensorsRouter
