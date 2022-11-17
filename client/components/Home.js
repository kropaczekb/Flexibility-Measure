import React from 'react'
import {connect} from 'react-redux'

import * as poseDetection from '@tensorflow-models/pose-detection'
import * as tf from '@tensorflow/tfjs-core'
import '@tensorflow/tfjs-backend-webgl'

const detectorConfig = {
  modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
  enableSmoothing: true,
  trackerType: poseDetection.TrackerType.Keypoint,
 }

async function getDetector() {
  const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig)
  console.log(detector)
  return detector
}


async function getPoses() {
  const detector = await getDetector()
  const picture = await document.getElementById("picture")
  console.log(picture)

  const poses = await detector.estimatePoses(picture)
  const leftFootX = poses[0].keypoints[15].x;
  const leftFootY = poses[0].keypoints[15].y;
  const rightFootX = poses[0].keypoints[16].x;
  const rightFootY = poses[0].keypoints[16].y;
  const leftKneeX = poses[0].keypoints[13].x;
  const leftKneeY = poses[0].keypoints[13].y;
  const rightKneeX = poses[0].keypoints[14].x;
  const rightKneeY = poses[0].keypoints[14].y;
  const leftHipX = poses[0].keypoints[11].x;
  const leftHipY = poses[0].keypoints[11].y;
  const rightHipX = poses[0].keypoints[12].x;
  const rightHipY = poses[0].keypoints[12].y;
  const leftShoulderX = poses[0].keypoints[5].x;
  const leftShoulderY = poses[0].keypoints[5].y;
  const rightShoulderX = poses[0].keypoints[6].x;
  const rightShoulderY = poses[0].keypoints[6].y;
  console.log(poses, leftFootX, leftFootY)
}
getPoses()

/**
 * COMPONENT
 */
export const Home = props => {
  const {username} = props

  return (
    <div>
      <h3>Welcome, {username}</h3>
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
