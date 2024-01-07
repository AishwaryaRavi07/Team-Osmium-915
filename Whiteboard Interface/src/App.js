import logo from './logo.svg';
import './App.css';
import Whiteboard from './Whiteboard';
import Resources from './Resources';
import {Routes,Route} from 'react-router-dom'
import VideoLecs from './VideoLecs';
import AdminLogin from './AdminLogin';
import StudentLogin from './StudentLogin';
import StudentRegister from "./StudentRegister"


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
    </Routes>
    
    </>
  );
}

export default App;
