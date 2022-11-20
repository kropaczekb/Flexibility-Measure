const Sequelize = require('sequelize')
const db = require('../db')
const axios = require('axios');

const Measurement = db.define('measurement', {
  hamstring: {
    type: Sequelize.DECIMAL(5, 2),
  },
  shoulder: {
    type: Sequelize.DECIMAL(5, 2),
  },
  age: {
    type: Sequelize.INTEGER
  },
  gender: {
    type: Sequelize.ENUM('MALE', 'FEMALE', 'TRANSGENDER', 'NON-BINARY')
  }
})

module.exports = Measurement
