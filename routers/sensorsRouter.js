const sensorsRouter = require("express").Router();
const sensorsController = require("../controllers/sensorsController");
const { verifyAccessToken } = require("../middlewares/verifyToken");

sensorsRouter
    .get("/", sensorsController.getAllSensors)
    .post("/", sensorsController.addSensor)
    .put("/:id", sensorsController.updateSensor)
    .delete("/:id", sensorsController.deleteSensor)

module.exports = sensorsRouter
