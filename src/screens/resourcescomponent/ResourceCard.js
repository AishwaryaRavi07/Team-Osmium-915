import React from 'react';
import Navbar from '../../components/Navbar';
import {Link} from "react-router-dom"


function ResourceCard({lectureNumber}) {
    const lectureTitles = ['Lec1', 'Lec2', 'Lec3', 'Lec4', 'Lec5','Lec6'];
  return (
    <>  
      <div className="card" style={{ width: '18rem' }}>
        <img className="card-img-top" src="./ministry.jpg" alt={`Card image for ${lectureNumber}`} />
        <div className="card-body">
          <h5 className="card-title">{lectureTitles[lectureNumber - 1]}</h5>
          <p className="card-text">Contains all the lecture resources of {lectureTitles[lectureNumber - 1]}</p>
          <Link to={`/resources/${lectureNumber}`} className="btn btn-primary">
            Find my resources
          </Link>
        </div>
      </div>
    </>
  );
}

export default ResourceCard;
