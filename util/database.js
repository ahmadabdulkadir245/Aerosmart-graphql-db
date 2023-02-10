const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.SQL_DEFAULT_DATABASE, process.env.SQL_ROOT_DIRECTORY, process.env.SQL_PASSWORD, {dialect: process.env.SQL_DIALECT, host: process.env.SQL_HOST})

module.exports = sequelize