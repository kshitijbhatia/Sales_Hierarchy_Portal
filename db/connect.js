const Sequelize = require('sequelize')

const sequelize = new Sequelize('sales_portal', 'root', 'Kritika5!',{
    host : 'localhost',
    dialect : 'mysql'
})

module.exports = sequelize;