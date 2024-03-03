const Sequelize = require('sequelize')

const sequelize = require('./connect')

const Logs = sequelize.define('logs', {
    log_id : {
        primaryKey : true,
        type : Sequelize.INTEGER,
        autoIncrement: true
    },
    actor_name : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    actor_email : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    action_type : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    action_description : {
        type : Sequelize.STRING,
        allowNull : false,
    },
})

module.exports = Logs;