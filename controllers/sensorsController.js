const Sensor = require("../repositories/sensorsRepository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { response, responseError500 } = require("../helpers/response");

const sensorsController = {
    getAllSensors: async (req, res) => {
        try {
            const result = await Sensor.findAll();
            return response(res, 200, "Success", "Get all sensors success!", result);
        } catch (error) {
            return responseError500(res, error);
        }
    },
    addSensor: async (req, res) => {
        try {
            const {sensorName, value, userId} = req.body;
            const result = await Sensor.create({
                sensorName,
                value,
                userId
            })
            return response(res, 201, "Success", "Create data success!", result);
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                return response(res, 400, "Failed", error.errors[0].message)
            } else {
                return responseError500(res, error);
            }
        }
    },
    updateSensor: async (req, res) => {
        try {
            const {id} = req.params;
            if (!id) {
                return response(res, 400, "Failed", "No ID selected!");
            }
            const sensorName = req.body.sensorName;
            const value = req.body.value || 0;
            const result = await Sensor.update({
                sensorName,
                value
            }, {where: {
                id
            }});
            return response(res, 200, "Success", "Update data success!", result)
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                return response(res, 400, "Failed", error.errors[0].message)
            } else {
                return responseError500(res, error);
            }
        }
    },
    deleteSensor: async (req, res) => {
        try {
            const {id} = req.params;
            if (!id) {
                return response(res, 400, "Failed", "No ID selected!");
            }
            await Sensor.destroy({
                where: {
                    id
                }
            });
            return response(res, 200, "Success", "Delete data success!");
        } catch (error) {
            return responseError500(res, error);
        }
    }
}

module.exports = sensorsController