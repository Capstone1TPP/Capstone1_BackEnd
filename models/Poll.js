const { notDeepEqual } = require('node:assert')
const { DataTypes, Sequelize } = require('sequelize')

const PollModel = new Sequelize('poll', {
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