import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { uploadMeasurement } from '../store/measurements'

function MeasurementResults(props) {

  useEffect(() => {
    props.upload(props.location.state.hamangle, props.location.state.shoulderangle)
  })

  return (
    <div>
      <div>Measurement Results:</div>
      <div>Hamstring Angle: {props.location.state.hamangle}</div>
      <div>Shoulder angle: {props.location.state.shoulderangle}</div>
    </div>
  )
}

const mapDispatch = (dispatch) => {
  return {
    upload: (hamangle, shoulderangle) => {
      dispatch(uploadMeasurement(hamangle, shoulderangle))
    }
  }
}

export default connect(null, mapDispatch)(MeasurementResults)
