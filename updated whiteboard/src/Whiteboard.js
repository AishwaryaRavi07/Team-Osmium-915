import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "@tldraw/tldraw/tldraw.css";
import jsPDF from "jspdf";
import { useReactMediaRecorder } from "react-media-recorder-2";
import canvasScreenshot from "canvas-screenshot";
import { app, storage, storageRef } from "./firebaseConfig";
import { ref, uploadBytes,getDownloadURL } from "firebase/storage";
import { DrawIoEmbed} from "react-drawio";

function Whiteboard() {
  const pdf = new jsPDF();
  const [imgData, setImgData] = useState("");
  const drawioRef = useRef(null);
  const whiteboardRef = useRef(null);
  const [recordingStream, setRecordingStream] = useState(null);
  const mediaRecorderRef = useRef(null);
  const [downloadLink, setDownloadLink] = useState("");
  

  const { status, startRecording, stopRecording, mediaBlobUrl,pauseRecording,
    resumeRecording,
    clearBlobUrl,
    previewAudioStream, } =
    useReactMediaRecorder({ screen: true, audio: true, video: true });

  useEffect(() => {
    // Update the download link when mediaBlobUrl changes
    setDownloadLink(mediaBlobUrl);
  }, [mediaBlobUrl]);



  const handleDownload = async () => {
    try {
      stopRecording();

      await new Promise((resolve) => {
        mediaRecorderRef.current.onStop = resolve;
      });

      console.log("Video Duration:", mediaRecorderRef.current?.state?.duration);

      const timestamp = new Date().toLocaleString().replace(/[^\w\s]/gi, '');
      const filename = `recording_${timestamp}.mp4`;

      const link = document.createElement("a");
      link.href = mediaBlobUrl;
      link.download = "recording.mp4";
      link.click();

      const videoRef = ref(storageRef, `recordings/${filename}`);
      const blob = new Blob([recordingStream], { type: "video/mp4" });
      await uploadBytes(videoRef, blob);
      const downloadURL = await getDownloadURL(videoRef);

      setDownloadLink(downloadURL);

      

      
    } catch (error) {
      console.error("Error handling download and storage: ", error);
    }
  };

  

  return (
    <>
      <div style={{ display: "flex", height: "9vh" }}>
        <img
          src="./solnpng.png"
          alt="SIH logo"
          style={{
            transform: "scale(5)",
            marginLeft: "8vh",
            height: "30px",
            marginTop: "15vh",
            borderRadius: "50%"
          }}
        ></img>
        <button className="button" onClick={startRecording}>
          Start Recording
        </button>
        <button
          className="button"
          onClick={handleDownload}
        >
          Stop Screen Recording
        </button>
        
      </div>
      <div>
        <div
          style={{
            width: "200vh",
            height: "88.5vh",
            backgroundColor: "#f0f0f0",
            marginTop: "8px",
            marginLeft:"20vh"
          }}
        >
          <DrawIoEmbed
            urlParameters={{
              ui: "sketch",
              spin: true,
              libraries: true,
              
            }}
            
          />
          
        </div>
      </div>
    </>
  );
}

export default Whiteboard;
