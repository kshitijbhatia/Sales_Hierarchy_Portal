const Sequelize = require('sequelize')

const sequelize = require('./connect')

const User = sequelize.define('users', {
    name : {
        type : Sequelize.STRING,
        allowNull : false
    },
    email : {
        type : Sequelize.STRING,
        allowNull : false,
        primaryKey : true
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false
    }
})

module.exports = User;