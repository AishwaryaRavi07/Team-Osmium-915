import React,{ useState, useRef, useEffect } from 'react'
import {Tldraw} from '@tldraw/tldraw'
import axios from 'axios';
import '@tldraw/tldraw/tldraw.css'
import jsPDF from 'jspdf';
import { useReactMediaRecorder } from "react-media-recorder-2";
import canvasScreenshot from "canvas-screenshot";
import { ZoomMtg } from '@zoomus/websdk';

ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.0/lib', '/av');


function Whiteboard() {
   const pdf = new jsPDF();
  const whiteboardRef = useRef(null);
  const [recordingStream, setRecordingStream] = useState(null);
  const mediaRecorderRef = useRef(null);
  const [downloadLink, setDownloadLink] = useState(null);

  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ screen:true, audio:true, video: true ,onStop: handleDownload,}); 

  useEffect(() => {
    // Update the download link when mediaBlobUrl changes
    setDownloadLink(mediaBlobUrl);
  }, [mediaBlobUrl]);

  const generatePDF = async () => {
    const canvas = whiteboardRef.current.querySelector('canvas');
  const context = canvas.getContext("2d");
  const video = document.createElement("video");

  try {
    const canvas = whiteboardRef.current.querySelector('canvas');
  if (!canvas) {
    console.error('Canvas not found');
    return;
  }

    const dataURL = canvas.toDataURL('image/png');
    
    const newWindow = window.open();
    newWindow.document.write(`<img src="${dataURL}" alt="Whiteboard Screenshot"/>`);

    pdf.addImage(dataURL, 'PNG', 10, 10, 190, 120);
    pdf.save('whiteboard.pdf');
  } catch (err) {
    console.error("Error: " + err);
  }
  
};
   

const Zoom = async () => {
  try {
    // Make a request to the NodeJS server to schedule a meeting
    const response = await axios.post('http://localhost:3001/scheduleMeeting', {
      // Add necessary meeting details
    });

    // Handle the response (e.g., launch Zoom with meeting details)
    console.log('Meeting scheduled:', response.data);

  } catch (error) {
    console.error('Error scheduling meeting:', error);
  }
};
  
  const handleDownload = () => {
    // Trigger the download
    const link = document.createElement('a');
    link.href = downloadLink;
    link.download = 'recording.mp4';
    link.click();
  };

  const exportToPDF = async () => {
    try {
      const dataURL = await canvasScreenshot(whiteboardRef.current);
      const newWindow = window.open();
      newWindow.document.write(`<img src="${dataURL}" alt="Whiteboard Screenshot"/>`);
    } catch (err) {
      console.error('Error: ' + err);
    }
  };

  useEffect(() => {
    const exportToPDFButton = document.getElementById('exportToPDFButton');

    if (exportToPDFButton) {
      exportToPDFButton.addEventListener('click', exportToPDF);
    }

    // Cleanup the event listener on component unmount
    return () => {
      if (exportToPDFButton) {
        exportToPDFButton.removeEventListener('click', exportToPDF);
      }
    };
  }, [whiteboardRef]);

  return (
    <>
    <div style={{display:"flex"}}>
    <button className='button' onClick={exportToPDF}>Export to PDF</button>
    <button className='button' onClick={startRecording}>Start Recording</button>
    <button className='button' onClick={()=>{stopRecording(); handleDownload();}} >Stop Screen Recording</button>
    <button className='button' onClick={Zoom}>Launch Zoom Meeting</button>
    </div>
    <div>
        <div ref={whiteboardRef} style={{height:"90vh",marginTop:"20px"}}>
            <Tldraw />
        </div>
    </div>
    </>
  )
}

export default Whiteboard;