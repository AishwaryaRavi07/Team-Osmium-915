import logo from './logo.svg';
import './App.css';
import Whiteboard from './Whiteboard';
import Resources from './Resources';
import {Routes,Route} from 'react-router-dom'
import VideoLecs from './VideoLecs';
import AdminLogin from './AdminLogin';
import StudentLogin from './StudentLogin';
import StudentRegister from "./StudentRegister"
import QNAScript from './QNAScript';
import Process from './Process'
import Summary from './Summary';


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Whiteboard/>}/>
      <Route path="/adminlogin" element={<AdminLogin/>}/>
      <Route path="/studentlogin" element={<StudentLogin/>}/>
      <Route path="/studentreg" element={<StudentRegister/>}/>
      <Route path="/resources" element={<Resources/>}/>
      <Route path="/videolecs" element={<VideoLecs/>}/>
      <Route path="/qna" element={<QNAScript/>}/>
      <Route path="/process" element={<Process/>}/>
      <Route path="/summarize" element={<Summary/>}/>

    </Routes>
    
    </>
  );
}

export default App;
