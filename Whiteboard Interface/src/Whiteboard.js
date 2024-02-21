import React,{ useState, useRef, useEffect } from 'react'
// import {Tldraw,useEditor} from '@tldraw/tldraw'
import { Excalidraw,exportToCanvas,initialData } from "@excalidraw/excalidraw";
import axios from 'axios';
import '@tldraw/tldraw/tldraw.css'
import { useReactMediaRecorder } from "react-media-recorder-2";
import {app,storage, storageRef}from "./firebaseConfig";
import {ref} from "firebase/storage"
import { uploadBytes } from 'firebase/storage';




function Whiteboard() {

  const [canvasUrl, setCanvasUrl] = useState("");
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  
  const whiteboardRef = useRef(null);
  const [recordingStream, setRecordingStream] = useState(null);
  const mediaRecorderRef = useRef(null);
  const [downloadLink, setDownloadLink] = useState(null);

  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ screen:true, audio:true, video: true }); 

  useEffect(() => {
    // Update the download link when mediaBlobUrl changes
    setDownloadLink(mediaBlobUrl);
  }, [mediaBlobUrl]);

   

const Zoom = async () => {
  var zoomMeetingUrl = "";
  window.location.href = zoomMeetingUrl;
};
  
  const handleDownload = async () => {
    try{
      
      const videoRef = ref(storageRef,'recordings/' + 'recording.mp4');
      const response = await axios.get(downloadLink, { responseType: 'blob' });
      const blob = new Blob([response.data]);
      await uploadBytes(videoRef,blob)

      const link = document.createElement('a');
      link.href = downloadLink;
      link.download = 'recording.mp4';
      link.click();

    }catch (error) {
    console.error('Error handling download and storage: ', error);
  }
}



const exportToPDF = async () => {
  if (!excalidrawAPI) {
    console.error("Excalidraw API not available");
    return;
  }

  const elements = excalidrawAPI.getSceneElements();
  if (!elements || !elements.length) {
    console.error("No elements found in the scene");
    return;
  }

  try {
    const canvas = await exportToCanvas({
      elements,
      appState: {
        ...initialData.appState,
        exportWithDarkMode: false,
      },
      files: excalidrawAPI.getFiles(),
      getDimensions: () => ({ width: 350, height: 350 }),
    });

    const ctx = canvas.getContext("2d");
    ctx.font = "30px Virgil";
    ctx.strokeText("My custom text", 50, 60);
    setCanvasUrl(canvas.toDataURL());

    console.log("Canvas exported to PDF successfully");
  } catch (error) {
    console.error("Error exporting canvas to PDF:", error);
  }
};


  return (
    <>
    
    <div style={{display:"flex",height:"8vh"}}>
    <img src='./SIH.jpg' alt='SIH logo' style={{transform:"scale(1.75)",marginLeft:"25px"}}></img>
    <button className='button' onClick={async () => {exportToPDF()}} >Export to PDF</button>
    <button className='button' onClick={startRecording}>Start Recording</button>
    <button className='button' onClick={()=>{stopRecording(); handleDownload();}} >Stop Screen Recording</button>
    <button className='button' onClick={Zoom}>Launch Zoom Meeting</button>
    </div>
    <div>
        <div ref={whiteboardRef} style={{height:"90vh",marginTop:"20px"}}>
            <Excalidraw/>
        </div>
    </div>
    </>
  )
}

export default Whiteboard;