import React,{useEffect} from 'react';
import ResourceCard from './resourcescomponent/ResourceCard';
import Navbar from '../components/Navbar';

function Resources() {
  // Number of lectures
  const numberOfLectures = 5;

  // Function to create an array with numbers from 1 to numberOfLectures
  const createArray = (length) => Array.from({ length }, (_, i) => i + 1);

  return (
    <>
    <Navbar/>
      <div className="resources-container">
      {createArray(numberOfLectures).map((lectureNumber) => (
        <ResourceCard key={lectureNumber} lectureNumber={lectureNumber} />
      ))}
    </div>
    </>
  );
}

export default Resources;
