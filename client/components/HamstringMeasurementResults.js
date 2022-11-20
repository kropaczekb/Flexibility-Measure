import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

function HamstringMeasurementResults(props) {
  const [angles, setAngles] = useState(props.location.measurements.angles)
  const [images, setImages] = useState(props.location.measurements.images)
  const [confidences, setConfidences] = useState(props.location.measurements.confidences)
  const [confidence, setConfidence] = useState(props.location.measurements.confidenceNumber)
  const [index, setIndex] = useState(null)

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
                pathname: '/measurements/shoulder',
                state: {
                  hamangle: angles[index],
                  hamconfidence: confidences[index],
                  }
              }}>
                Yes, continue...
            </Link>
            <br />
            <Link to='/measurements/hamstring'>No, choose another file</Link>
        </div>
      ) : (
        <div>
          <div>Angle: {angles}</div>
          <div>Confidence: {confidence}</div>
          <div>Does this look right?</div>
            <Link
              to={{
                pathname: '/measurements/shoulder',
                state: {
                  hamangle: angles,
                  hamconfidence: confidence,
                  }
              }}>
                Yes, continue...
            </Link>
            <br />
            <Link to='/measurements/hamstring'>No, choose another file</Link>
        </div>
      )}
    </div>
  )
}

export default HamstringMeasurementResults
