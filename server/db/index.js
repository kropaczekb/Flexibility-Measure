//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Measurement = require('./models/Measurement')

//associations could go here!

User.hasMany(Measurement)
Measurement.belongsTo(User)


module.exports = {
  db,
  models: {
    User,
    Measurement
  },
}
