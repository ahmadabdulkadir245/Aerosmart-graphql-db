const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.SQL_DATABASE_NAME, process.env.SQL_USER, process.env.SQL_PASSWORD, {dialect:'mysql', host: process.env.SQL_HOST, port: process.env.PORT})

module.exports = sequelize