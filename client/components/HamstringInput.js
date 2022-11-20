import React, { useEffect, useState } from 'react'
import HamstringMeasurement from './HamstringMeasurement';

function HamstringInput() {
  const [ filePath, setFilePath ] = useState();
  const [ uploaded, setUploaded ] = useState(false);
  const [ side, setSide ] = useState('right');

  const fileChange = (event) => {
    let fileType = null;
    let reader = new FileReader()
    let file = event.target.files[0]
    if (file['type'].split('/')[0] === 'image') {
      fileType = 'image'
    }
    else if (file['type'].split('/')[0] === 'video') {
      fileType = 'video'
    }
    reader.readAsDataURL(file)
    reader.onload = () => {
      setFilePath({path: reader.result, type: fileType})
    }
    reader.onerror = function(error) {
      console.error('Error', error)
    }
  }

  if (filePath) {
    let li = document.createElement('li');
    if (filePath.type === 'image') {
      let pic = new Image();
      pic.src = filePath.path;
      li.appendChild(pic)
      let list = document.getElementById('addedPhoto')
      if (list.firstChild) {
        list.removeChild(list.firstChild)
      }
      document.getElementById('addedPhoto').appendChild(li);
    } else if (filePath.type === 'video') {
      let video = document.createElement('video');
      video.autoplay = true;
      video.controls = true;
      video.muted = true;
      video.src = filePath.path;
      li.appendChild(video)
      let list = document.getElementById('addedPhoto')
      if (list.firstChild) {
        list.removeChild(list.firstChild)
      }
      document.getElementById('addedPhoto').appendChild(li);
    }
  }

  const fileUpload = (event) => {
    setUploaded(true)
  }
  return (
    <div>
      {(uploaded) ? (<HamstringMeasurement path={filePath.path} type={filePath.type} side={side} />) : (<div><div>Import photo or video of hamstring stretch</div>
      <input type="file" onChange={fileChange}/>
      <button onClick={fileUpload}>Upload</button>
      <label htmlFor='sideSelection'>Select side: </label>
      <select onChange={(e) => {setSide(e.target.value)}}>
        <option value='right'>Right</option>
        <option value='left'>Left</option>
      </select>
      <ul id="addedPhoto"></ul></div>)}
    </div>
  )
}

export default HamstringInput
