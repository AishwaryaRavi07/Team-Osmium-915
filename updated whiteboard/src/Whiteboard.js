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

  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ screen: true, audio: true, video: true });

  useEffect(() => {
    // Update the download link when mediaBlobUrl changes
    setDownloadLink(mediaBlobUrl);
  }, [mediaBlobUrl]);



  const handleDownload = async () => {
    try {
      stopRecording();
      // const link = document.createElement("a");
      // link.href = mediaBlobUrl;
      // link.download = "recording.mp4";
      // link.click();

      const videoRef = ref(storageRef, "recordings/recording.mp4");
      const blob = new Blob([recordingStream], { type: "video/mp4" });
      await uploadBytes(videoRef, blob);
      const downloadURL = await getDownloadURL(videoRef);

      setDownloadLink(downloadURL);

      const link = document.createElement("a");
      link.href = downloadURL;
      link.download = "recording.mp4";
      link.click();

      
    } catch (error) {
      console.error("Error handling download and storage: ", error);
    }
  };

  const exportasPDF = () => {
    if (drawioRef.current) {
      drawioRef.current.exportDiagram({
        format: 'xmlsvg'
      });
    }
  };

  return (
    <>
      <div style={{ display: "flex", height: "9vh" }}>
        <img
          src="./SIH.jpg"
          alt="SIH logo"
          style={{
            transform: "scale(1.75)",
            marginLeft: "25px",
            height: "30px",
            marginTop: "10px",
          }}
        ></img>
        <button className="button" onClick={exportasPDF}>
          Export as PDF
        </button>
        <button className="button" onClick={startRecording}>
          Start Recording
        </button>
        <button
          className="button"
          onClick={() => {
            stopRecording();
            handleDownload();
          }}
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
            ref={drawioRef}
            onExport={(data) =>  setImgData(data.data)} 
          />
          {imgData && <img src={imgData} />}
        </div>
      </div>
    </>
  );
}

export default Whiteboard;
