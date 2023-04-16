const { responseError500, response } = require("../helpers/response");
const MQTTService = require("../mqtt/mqttService");
const Sensor = require("../repositories/sensorsRepository");

const MQTT_HOST_NAME = "mqtt://127.0.0.1:1883";

var mqttClient = new MQTTService(MQTT_HOST_NAME);
mqttClient.connect();

const getPublisherPage = async (req, res) => {
    try {
        return res.render("pages/publisher");
    } catch (error) {
        return responseError500(res, error);
    }
};

const publishMQTTMessage = async (req, res) => {
    try {
        const topic = req.body.topic;
        const message = req.body.message;
        const userId = req.body.userId;

        console.log(`Request Topic :: ${topic}`);
        console.log(`Request Message :: ${message}`);

        const findSensor = await Sensor.findOne({
            where: {
                userId,
                sensorName: topic
            }
        });
        if (findSensor) {
            await Sensor.update({
                sensorName: topic,
                value: message
            }, {
                where: {
                    id: findSensor.id
                }
            })
        } else {
            await Sensor.create({
                sensorName: topic,
                value: message,
                userId
            })
        }
        mqttClient.publish(topic, message, {});
        return response(res, 200, "Success", "Publish success!")
    } catch (error) {
        return responseError500(res, error.message);
    }
};

const getSubscriberPage = async (req, res) => {
    try {
        return res.render("pages/subscriber");
    } catch (error) {
        return responseError500(res, "Error getting subscriber page!");
    }
};

module.exports = { getPublisherPage, publishMQTTMessage, getSubscriberPage }
