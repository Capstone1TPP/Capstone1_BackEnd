const { DataTypes, Sequelize } = require('sequelize')
const db = require('../db')

const PollModel = db.define('poll', {
    title: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
            notEmpty: true
        }
        
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    }

})

module.exports = PollModel