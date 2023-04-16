const MySQLEvents = require('mysql-events');
const WebSocket = require('ws');
const Sensor = require('../repositories/sensorsRepository');
const wss = new WebSocket.Server({ port: process.env.WS_PORT }, );

// Using MySQLEvents to track sensors table event (insert, update, or delete)
const dsn = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};
const mysqlEventWatcher = MySQLEvents(dsn);

// Create websocket server
wss.on('connection', async (ws) => {
  console.log('New client connected')

  mysqlEventWatcher.add(
    `${process.env.DB_NAME}.sensors`,
    async function (oldRow, newRow, _event) {
      // Get data from database if sensor table have an event (insert, update, or delete)
      let allSensors = await Sensor.findAll();
      let data = allSensors.map((item) => item.dataValues);
      data = JSON.stringify(data);
      // Row inserted
      if (oldRow === null) {
        ws.send(data)
      }
      // Row deleted
      if (newRow === null) {
        ws.send(data)
      }
      // Row updated
      if (oldRow !== null && newRow !== null) {
        ws.send(data)
      }
    },
  );
});


