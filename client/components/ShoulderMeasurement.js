import React from 'react'
import { useState } from 'react'
import * as poseDetection from '@tensorflow-models/pose-detection'
import * as tf from '@tensorflow/tfjs-core'
import '@tensorflow/tfjs-backend-webgl'

import { Redirect } from 'react-router-dom';

import { Chart } from 'chart.js/auto';

function ShoulderMeasurement(props) {
  // const [ finished, setFinished ] = useState(false);
  const [ measurements, setMeasurements ] = useState(null);
  const { path, type, side, hamAngle, hamConfidence } = props

const detectorConfig = {
  modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
  enableSmoothing: true,
  trackerType: poseDetection.TrackerType.Keypoint,
 }

async function getDetector() {
  const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig)
  return detector
}


async function getPoses(image) {
  const detector = await getDetector()
  // const picture = await document.getElementById("picture")

  const poses = await detector.estimatePoses(image)
  return poses
}
  ////////////////////////
async function getScatterPlot(poseData) {

  const leftFootX = poseData[0].keypoints[15].x;
  const leftFootY = poseData[0].keypoints[15].y;
  const rightFootX = poseData[0].keypoints[16].x;
  const rightFootY = poseData[0].keypoints[16].y;
  const leftKneeX = poseData[0].keypoints[13].x;
  const leftKneeY = poseData[0].keypoints[13].y;
  const rightKneeX = poseData[0].keypoints[14].x;
  const rightKneeY = poseData[0].keypoints[14].y;
  const leftHipX = poseData[0].keypoints[11].x;
  const leftHipY = poseData[0].keypoints[11].y;
  const rightHipX = poseData[0].keypoints[12].x;
  const rightHipY = poseData[0].keypoints[12].y;
  const leftShoulderX = poseData[0].keypoints[5].x;
  const leftShoulderY = poseData[0].keypoints[5].y;
  const rightShoulderX = poseData[0].keypoints[6].x;
  const rightShoulderY = poseData[0].keypoints[6].y;
  const data = [{x: leftFootX, y: -leftFootY}, {x: leftHipX, y: -leftHipY}, {x: leftShoulderX, y: -leftShoulderY}, {x: rightFootX, y: -rightFootY}, {x: rightHipX, y: -rightHipY}, {x: rightShoulderX, y: -rightShoulderY}]
  return new Chart(
    document.createElement('canvas'),
    {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Scatter Dataset',
          data: data,
      }]
      }
    }
  )
}

async function getAngle(poseData) {

  const leftHipX = poseData[0].keypoints[11].x;
  const leftHipXConfidence = poseData[0].keypoints[15].score;
  const leftHipY = poseData[0].keypoints[11].y;
  const leftHipYConfidence = poseData[0].keypoints[15].score;
  const rightHipX = poseData[0].keypoints[12].x;
  const rightHipXConfidence = poseData[0].keypoints[15].score;
  const rightHipY = poseData[0].keypoints[12].y;
  const rightHipYConfidence = poseData[0].keypoints[15].score;
  const leftShoulderX = poseData[0].keypoints[5].x;
  const leftShoulderXConfidence = poseData[0].keypoints[15].score;
  const leftShoulderY = poseData[0].keypoints[5].y;
  const leftShoulderYConfidence = poseData[0].keypoints[15].score;
  const rightShoulderX = poseData[0].keypoints[6].x;
  const rightShoulderXConfidence = poseData[0].keypoints[15].score;
  const rightShoulderY = poseData[0].keypoints[6].y;
  const rightShoulderYConfidence = poseData[0].keypoints[15].score;
  const leftElbowX = poseData[0].keypoints[7].x;
  const leftElbowXConfidence = poseData[0].keypoints[7].score;
  const leftElbowY = poseData[0].keypoints[7].y;
  const leftElbowYConfidence = poseData[0].keypoints[7].score;
  const rightElbowX = poseData[0].keypoints[8].x;
  const rightElbowXConfidence = poseData[0].keypoints[8].score;
  const rightElbowY = poseData[0].keypoints[8].y;
  const rightElbowYConfidence = poseData[0].keypoints[8].score;
  const confidence = ((leftElbowXConfidence + leftElbowYConfidence + leftHipXConfidence + leftHipYConfidence + leftShoulderXConfidence + leftShoulderYConfidence) / 6)
  confidenceList.push(confidence)
  if (confidence > confidenceNumber) {
    confidenceNumber = confidence;
  }

  let len1 = Math.sqrt(Math.pow((leftShoulderX-leftElbowX), 2) + Math.pow((leftShoulderY-leftElbowY), 2))
  let len2 = Math.sqrt(Math.pow((leftShoulderX-leftHipX), 2) + Math.pow((leftShoulderY-leftHipY), 2))
  let len3 = Math.sqrt(Math.pow((leftHipX-leftElbowX), 2) + Math.pow((leftHipY-leftElbowY), 2))
  let len1sq = Math.pow(len1, 2)
  let len2sq = Math.pow(len2, 2)
  let len3sq = Math.pow(len3, 2)
  // let partOne = len1sq + len2sq - len3sq
  // let partTwo = (2 * len1 * len2)
    let radiansResult = Math.acos((len1sq + len2sq - len3sq) / (2 * len1 * len2))
    let pi = Math.PI
    let angleResult = (radiansResult * (180/pi))
  return angleResult
}

// getPoses()

function getVideoImage(path, secs, callback) {
  let me = this
  let video = document.createElement('video');
  video.onloadedmetadata = function() {
      if ('function' === typeof secs) {
          secs = secs(this.duration);
      }
      this.currentTime = Math.min(Math.max(0, (secs < 0 ? this.duration : 0) + secs), this.duration);
  };
  video.onseeked = function(e) {
      let canvas = document.createElement('canvas');
      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;
      let drawingContext = canvas.getContext('2d');
      drawingContext.drawImage(video, 0, 0, canvas.width, canvas.height);
      let img = new Image();
      img.src = canvas.toDataURL();
      callback.call(me, img, this.currentTime, e);
  };
  video.onerror = function(e) {
      callback.call(me, undefined, undefined, e);
  };
  video.src = path;
}
function showImageAt(secs) {
  let duration;
  getVideoImage(
      path,
      function(totalTime) {
          duration = totalTime;
          return secs;
      },
      async function(img, secs, event) {
        if (event.type == 'seeked') {
              let poseData = await getPoses(img)
              if (poseData[0].keypoints) {
                imageList.push(img)
                let newAngle = await getAngle(poseData)
                angleList.push(newAngle)
              }
              if (duration >= ++secs) {
                  showImageAt(secs);
              } else {
                setMeasurements({images: imageList, confidences: confidenceList, angles: angleList, confidenceNumber: confidenceNumber})
              }
          }
      }
  );
}

async function getPicData() {
  let image = new Image()
  image.src = path
  image.width = 800
  image.height = 450
  let poseData = await getPoses(image)
  let angle = await getAngle(poseData)
  setMeasurements({images: image, confidences: confidenceNumber, angles: angle, confidenceNumber: confidenceNumber})
}

var imageList = [];
var confidenceList = [];
var angleList = [];
var confidenceNumber = null;
if (!measurements && type === 'video') {
  showImageAt(0)
} else if (!measurements && type === 'image') {
  getPicData()
}
  return (
    <div>
      {(measurements) ? (<Redirect to={{pathname: "/measurements/shoulderresults", measurements: {measurements: measurements, hamAngle: hamAngle, hamConfidence: hamConfidence}}} />) : (<h1>Thinking...</h1>)}
      {/* {(finished) ? (<h1>Stretch Angle: {confidence}</h1>) : (<h1>Thinking...</h1>)} */}
      {/* <ol id="olFrames"></ol> */}
      {/* <video id="picture" height="500" width="500" type="video/mp4" controls="controls autoplay">
        <source src="WIN_20221117_18_04_45_Pro.mp4"  />
      </video> */}
      {/* <div>
        <canvas id="plot"></canvas>
      </div> */}
    </div>
  )
}

export default ShoulderMeasurement
