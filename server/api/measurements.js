const router = require('express').Router()
const { models: { User, Measurement }} = require('../db')
module.exports = router

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization ||  req.body.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

router.get('/', requireToken, async (req, res, next) => {
  try {
    const measurements = await Measurement.findAll({
      where: {
        userId: req.user.id
      }
    })
    res.send(measurements)
  } catch (err) {
    next(err)
  }
})

router.post('/', requireToken, async (req, res, next) => {
  try {
    const measurement = await Measurement.create({
      userId: req.user.id,
      hamstring: req.body.hamAngle,
      shoulder: req.body.shoulderAngle,
    })
    res.send(measurement)
  } catch(error) {
    next(error)
  }
})
