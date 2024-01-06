import React,{useState} from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';

function ResourcePageTwo() {
  const { lectureNumber } = useParams();
  const [lectureData, setLectureData] = useState(null);


  return (
    <>
    <Navbar/>
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>{`Lecture 2 Resources`}</h2>
      <div style={{display:"flex",gap:"20px",marginLeft:"10vh"}}>
      <video src="../././data/lec2/lec2.mp4" controls  width="60%" height="600">Watch Video</video>
      <h2>Transcript: <object data="../././data/lec2/lec2_transcript.pdf" type="application/pdf" width="500vh" height="560"></object></h2>
      </div>
      <div style={{marginTop:"20px"}}>
      <h2>Summary: <object data="../././data/lec2/lec2_summary.pdf" type="application/pdf" width="100%" height="560"></object></h2>
      </div>
    </div>
    </>
  );
}

export default ResourcePageTwo;