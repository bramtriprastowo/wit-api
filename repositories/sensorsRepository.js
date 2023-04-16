const { DataTypes } = require("sequelize");
const db = require("../config/database");
const User = require("./usersRepository");

const Sensor = db.define('Sensor', {
    // Model attributes are defined here
    sensorName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    //userId as foreign key
}, {
    // Other model options go here
});

Sensor.belongsTo(User, {foreignKey: "userId"});

module.exports = Sensor