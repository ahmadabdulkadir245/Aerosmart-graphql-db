const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const CartItem = sequelize.define('cartItem', {
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

module.exports = CartItem