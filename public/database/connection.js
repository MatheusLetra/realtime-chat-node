const Sequelize = require('sequelize')

// Config Database Connection
const sequelize = new Sequelize('realtimechat', 'root', 'masterkey', {
    host: "localhost",
    dialect: "mysql"
});

module.exports = sequelize