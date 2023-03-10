const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const OrderItem = sequelize.define('orderItem', {
    Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = OrderItem