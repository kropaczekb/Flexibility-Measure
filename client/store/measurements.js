import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_MEASUREMENTS = 'GET_MEASUREMENTS';
const UPLOAD_MEASUREMENT = 'UPLOAD_MEASUREMENT';

/**
 * ACTION CREATORS
 */
const listMeasurements = (measurements) => ({type: GET_MEASUREMENTS, measurements})
const newMeasurement = (measurement) => ({type: UPLOAD_MEASUREMENT, measurement})

/**
 * THUNK CREATORS
 */
export const uploadMeasurement = (hamAngle, shoulderAngle) => async dispatch => {
  const token = window.localStorage.getItem('token')
  console.log("thunk")
  if (token) {
    const res = await axios.post('/api/measurements', {
      headers: {
        authorization: token
      },
      hamAngle: hamAngle,
      shoulderAngle: shoulderAngle
    })
    return dispatch(newMeasurement(res.data))
  }
}

export const getMeasurements = () => async dispatch => {
  const token = window.localStorage.getItem('token')
  if (token) {
    const res = await axios.get('/api/measurements', {
      headers: {
        authorization: token
      },
    })
    return dispatch(listMeasurements(res.data))
  }
}

/**
 * REDUCER
 */
export default function(measurements = [], action) {
  switch (action.type) {
    case GET_MEASUREMENTS:
      return action.measurements
    case UPLOAD_MEASUREMENT:
      return [...measurements, action.measurement]
    default:
      return measurements
  }
}
