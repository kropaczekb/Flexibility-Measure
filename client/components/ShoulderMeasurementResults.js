import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function ShoulderMeasurementResults(props) {
  const [angles, setAngles] = useState(props.location.measurements.measurements.angles)
  const [images, setImages] = useState(props.location.measurements.measurements.images)
  const [confidences, setConfidences] = useState(props.location.measurements.measurements.confidences)
  const [confidence, setConfidence] = useState(props.location.measurements.measurements.confidenceNumber)
  const [index, setIndex] = useState(null)
  const {hamAngle, hamConfidence} = props.location.measurements
  if (confidences.length > 1 && index === null) {
    const index = confidences.findIndex((confidences) => {
      return confidences === confidence;
    })
    setIndex(index)
  }
  useEffect(() => {
    let li = document.createElement('li');
    if (index !== null) {
      li.appendChild(images[index])
    } else {
      li.appendChild(images)
    }
    document.getElementById('picHere').appendChild(li);
  }, [])

  return (
    <div>
      <ul id="picHere"></ul>
      {(index !== null) ? (
        <div>
          <div>Angle: {angles[index]}</div>
          <div>Confidence: {confidences[index]}</div>
          <div>Does this look right?</div>
          <Link
            to={{
              pathname: '/measurements/results',
              state: {
                shoulderangle: angles[index],
                shoulderconfidence: confidences[index],
                hamangle: hamAngle,
                hamconfidence: hamConfidence,
                }}}>Yes, continue...</Link>
          <br />
          <Link to='/measurements/shoulder'>No, choose another photo</Link>
        </div>
      ) : (
        <div>
          <div>Angle: {angles}</div>
          <div>Confidence: {confidence}</div>
          <div>Does this look right?</div>
          <Link
            to={{
              pathname: '/measurements/results',
              state: {
                shoulderangle: angles,
                shoulderconfidence: confidence,
                hamangle: hamAngle,
                hamconfidence: hamConfidence,
                }}}>Yes, continue...</Link>
          <br />
          <Link to='/measurements/shoulder'>No, choose another photo</Link>
        </div>
      )}
    </div>
  )
}

export default ShoulderMeasurementResults
