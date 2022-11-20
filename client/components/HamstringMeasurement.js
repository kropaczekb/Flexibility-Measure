import React from 'react'
import { useState } from 'react'
import * as poseDetection from '@tensorflow-models/pose-detection'
import * as tf from '@tensorflow/tfjs-core'
import '@tensorflow/tfjs-backend-webgl'
import { Link } from 'react-router-dom'

import { Redirect } from 'react-router-dom';

import { Chart } from 'chart.js/auto';

function HamstringMeasurement(props) {
  // const [ finished, setFinished ] = useState(false);
  const [ measurements, setMeasurements ] = useState(null);
  const { path, type, side } = props
  const [ kneeProblem, setKneeProblem ] = useState(false);

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
  const leftFootX = poseData[0].keypoints[15].x;
  const leftFootXConfidence = poseData[0].keypoints[15].score;
  const leftFootY = -poseData[0].keypoints[15].y;
  const leftFootYConfidence = poseData[0].keypoints[15].score;
  const rightFootX = poseData[0].keypoints[16].x;
  const rightFootY = -poseData[0].keypoints[16].y;
  const leftKneeX = poseData[0].keypoints[13].x;
  const leftKneeY = -poseData[0].keypoints[13].y;
  const rightKneeX = poseData[0].keypoints[14].x;
  const rightKneeY = -poseData[0].keypoints[14].y;
  const leftHipX = poseData[0].keypoints[11].x;
  const leftHipXConfidence = poseData[0].keypoints[15].score;
  const leftHipY = -poseData[0].keypoints[11].y;
  const leftHipYConfidence = poseData[0].keypoints[15].score;
  const rightHipX = poseData[0].keypoints[12].x;
  const rightHipY = -poseData[0].keypoints[12].y;
  const leftShoulderX = poseData[0].keypoints[5].x;
  const leftShoulderXConfidence = poseData[0].keypoints[15].score;
  const leftShoulderY = -poseData[0].keypoints[5].y;
  const leftShoulderYConfidence = poseData[0].keypoints[15].score;
  const rightShoulderX = poseData[0].keypoints[6].x;
  const rightShoulderY = -poseData[0].keypoints[6].y;
  const confidence = ((leftFootXConfidence + leftFootYConfidence + leftHipXConfidence + leftHipYConfidence + leftShoulderXConfidence + leftShoulderYConfidence) / 6)
  confidenceList.push(confidence)
  if (confidence > confidenceNumber) {
    confidenceNumber = confidence;
  }

  let slope = (leftHipY-leftFootY)/(leftHipX-leftFootX)
  console.log("slope", slope)
  let intercept = (leftHipY - (slope*leftHipX))
  console.log("intercept", intercept)
  let perpSlope = (-1/slope)
  console.log("perpSlope", perpSlope)
  let perpIntercept = (leftKneeY - (perpSlope*leftKneeX))
  console.log("perpIntercept", perpIntercept)
  let xcoord = (perpIntercept - intercept)/(slope - perpSlope)
  // c2-c1/a1-a2
  console.log("xcoord", xcoord)
  let ycoord = (perpSlope*xcoord) + perpIntercept
  console.log("ycoord", ycoord)
  let kneeLength = Math.sqrt(Math.pow((xcoord - leftKneeX), 2) + Math.pow((ycoord - leftKneeY), 2))
  let len1 = Math.sqrt(Math.pow((leftHipX-leftFootX), 2) + Math.pow((leftHipY-leftFootY), 2))
  console.log(kneeLength, len1)
  if (kneeLength > (len1/30)) {
    setKneeProblem(true);
  }
  let len2 = Math.sqrt(Math.pow((leftHipX-leftShoulderX), 2) + Math.pow((leftHipY-leftShoulderY), 2))
  let len3 = Math.sqrt(Math.pow((leftFootX-leftShoulderX), 2) + Math.pow((leftFootY-leftShoulderY), 2))
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
      {(kneeProblem) ? (<div><div>Please reupload photo where knees are straight</div><Link to='measurements/hamstring'>Reupload</Link></div>) : ((measurements) ? (<Redirect to={{pathname: "/measurements/hamstringresults", measurements: measurements}} />) : (<h1>Thinking...</h1>))}
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

export default HamstringMeasurement
