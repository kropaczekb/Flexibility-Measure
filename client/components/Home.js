import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import HamstringMeasurement from './HamstringMeasurement'



/**
 * COMPONENT
 */
export const Home = props => {
  const {username} = props

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <Link to="measurements/hamstring">Take measurements</Link>
      <br />
      <Link to="measurements">See results history</Link>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username
  }
}



export default connect(mapState)(Home)
