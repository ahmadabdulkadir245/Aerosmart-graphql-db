const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.SQL_DEFAULT_DATABASE, 'root', process.env.SQL_PASSWORD, {dialect:'mysql', host: "127.0.0.1"})

module.exports = sequelize