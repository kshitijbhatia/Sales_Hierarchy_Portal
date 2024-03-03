const sequelize = require('./connect')
const Sequelize = require('sequelize')

const Sales = sequelize.define('sales', {
    DealerCode : {
        type : Sequelize.BIGINT,
        primaryKey : true,
        allowNull : false
    },
    DealerName : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    DealerEmailAddress : {
        type : Sequelize.STRING,
        allowNull : true
    },
    DealerContactNumber :{
        type : Sequelize.BIGINT,
        allowNull : true
    },
    TMRole : {
        type : Sequelize.STRING,
        allowNull : false
    },
    TMName: {
        type : Sequelize.STRING,
        allowNull : false
    },
    TMEmailAddress: {
        type : Sequelize.STRING,
        allowNull : false
    },
    TMPhoneNumber: {
        type : Sequelize.BIGINT,
        allowNull : false
    },
    TMUserName: {
        type : Sequelize.STRING,
        allowNull : false
    },
    AMRole: {
        type : Sequelize.STRING,
        allowNull : false
    },
    AMName: {
        type : Sequelize.STRING,
        allowNull : false
    },
    AMEmailAddress: {
        type : Sequelize.STRING,
        allowNull : false
    },
    AMPhoneNumber : {
        type : Sequelize.BIGINT,
        allowNull : false
    },
    AMUserName : {
        type : Sequelize.STRING,
        allowNull : false
    },
    NSMRole: {
        type : Sequelize.STRING,
        allowNull : false
    },
    NSMName : {
        type : Sequelize.STRING,
        allowNull : false
    },
    NSMEmailAddress: {
        type : Sequelize.STRING,
        allowNull : false
    },
    NSMPhoneNumber: {
        type : Sequelize.BIGINT,
        allowNull : false
    },
    NSMUserName : {
        type : Sequelize.STRING,
        allowNull : false
    },
    NSM1Name : {
        type : Sequelize.STRING,
        allowNull : false
    },
    NSM1EmailAddress: {
        type : Sequelize.STRING,
        allowNull : false
    },
    NSM1PhoneNumber: {
        type : Sequelize.BIGINT,
        allowNull : false
    },
    NSM1UserName: {
        type : Sequelize.STRING,
        allowNull : false
    },
    VPRole: {
        type : Sequelize.STRING,
        allowNull : false
    },
    VPName: {
        type : Sequelize.STRING,
        allowNull : false
    },
    VPEmailAddress : {
        type : Sequelize.STRING,
        allowNull : false
    },
    VPPhoneNumber : {
        type : Sequelize.BIGINT,
        allowNull : false
    },
    VPUserName : {
        type : Sequelize.STRING,
        allowNull : false
    },
    VP1Name : {
        type : Sequelize.STRING,
        allowNull : false
    },
    VP1EmailAddress : {
        type : Sequelize.STRING,
        allowNull : false
    },
    VP1PhoneNumber: {
        type : Sequelize.BIGINT,
        allowNull : false
    },
    VP1UserName : {
        type : Sequelize.STRING,
        allowNull : false
    },
    VP2Name : {
        type : Sequelize.STRING,
        allowNull : false
    },
    VP2EmailAddress : {
        type : Sequelize.STRING,
        allowNull : false
    },
    VP2PhoneNumber: {
        type : Sequelize.BIGINT,
        allowNull : false
    },
    VP2UserName : {
        type : Sequelize.STRING,
        allowNull : false
    },
    HORole: {
        type : Sequelize.STRING,
        allowNull : false
    },
    HOName : {
        type : Sequelize.STRING,
        allowNull : false
    },
    HOEmailAddress : {
        type : Sequelize.STRING,
        allowNull : false
    },
    HOPhoneNumber: {
        type : Sequelize.BIGINT,
        allowNull : true
    },
    HOUserName : {
        type : Sequelize.STRING,
        allowNull : false
    }
})

module.exports = Sales;
