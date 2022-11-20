import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getMeasurements } from '../store/measurements'

function Measurements(props) {

  useEffect(() => {
    let token = window.localStorage.getItem('token')
    if (token) {
      props.fetchMeasurements()
    }
  }, [])

  return (
    <div>
      <div>List of Measurements</div>
      {(props.measurements.length) ? (props.measurements.map((measurement) => {
        return (
          <div key={measurement.id}>
            <div>Hamstring angle: {measurement.hamstring}</div>
            <div>Shoulder angle: {measurement.shoulder}</div>
          </div>
        )
      })) : (<div>No measurements</div>)}
    </div>
  )
}

const mapState = (state) => {
  return {
    measurements: state.measurements
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchMeasurements: () => {
      dispatch(getMeasurements())
    }
  }
}

export default connect(mapState, mapDispatch)(Measurements)
