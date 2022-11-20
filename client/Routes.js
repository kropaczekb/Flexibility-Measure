import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter, Route, Switch, Redirect} from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import {me} from './store';
// import HamstringMeasurement from './components/HamstringMeasurement';
// import QuadMeasurement from './components/QuadMeasurement';
import HamstringMeasurementResults from './components/HamstringMeasurementResults';
import HamstringInput from './components/HamstringInput';
import ShoulderInput from './components/ShoulderInput';
import ShoulderMeasurementResults from './components/ShoulderMeasurementResults';
import Measurements from './components/Measurements';
import MeasurementResults from './components/MeasurementResults'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/home" component={Home} />
            {/* <Route path="/measurements/1" component={HamstringMeasurement} /> */}
            <Route exact path="/measurements/hamstring" component={HamstringInput} />
            <Route exact path="/measurements/hamstringresults" component={HamstringMeasurementResults} />
            <Route exact path="/measurements/shoulder" component={ShoulderInput} />
            <Route exact path="/measurements/shoulderresults" component={ShoulderMeasurementResults} />
            <Route exact path="/measurements/results" component={MeasurementResults} />
            <Route exact path="/measurements" component={Measurements} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={ Login } />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
