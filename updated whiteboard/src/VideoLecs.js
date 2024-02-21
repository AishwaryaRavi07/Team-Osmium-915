import React,{useState} from 'react'

function VideoLecs() {
    const folderPath = "D:/Osmium-915/whiteboard/tldraw/tldrawdemo/src/data";
    const lectures = ["lec1", "lec2", "lec3","lec4","lec5","lec6"];

    const [selectedVideo, setSelectedVideo] = useState(null);

    const playVideo = (videoPath) => {
      setSelectedVideo(videoPath);
    };







  return (
    <>
    <div className="App">
      <h1>Video Playlist</h1>
      <ul>
        {lectures.map((lecture, index) => {
          const videoPath = `${folderPath}/${lecture}/video.mp4`;

          return (
            <li key={index} onClick={() => playVideo(videoPath)}>
              Lecture {lecture}
            </li>
          );
        })}
      </ul>

      {selectedVideo && (
        <div>
          <h2>Now Playing:</h2>
          <video controls width="600">
            <source src={selectedVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
    


    </>
  )
}

export default VideoLecs