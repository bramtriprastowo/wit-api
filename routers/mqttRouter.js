const mqttRouter = require("express").Router();
const { getSubscriberPage, publishMQTTMessage, getPublisherPage } = require("../controllers/mqttController");

mqttRouter
    .get("/publisher", getPublisherPage)
    .post("/publisher", publishMQTTMessage)
    .get("/subscriber", getSubscriberPage)

module.exports = mqttRouter
