import React from 'react'
import styled from 'styled-components';
import {Routes,Route} from "react-router-dom"
import GlobalStyle from "./components/styles/GlobalStyle";
import StyledPlaylistHeader from './components/styles/StyledPlaylistHeader';
import StyledJourney from './components/styles/StyledJourney';
import Player from "./components/containers/Player"
import StyledPlaylistItem from './components/styles/StyledPlaylistItem';
import PlaylistHeader from './components/PlaylistHeader';
import StyledVideo from './components/styles/StyledVideo';
import StyledVideoWrapper from './components/styles/StyledVideoWrapper';
import ReactPlayer from 'react-player';

const Resources= ({ autoplay, active, endCallback, progressCallback }) =>{
  return (
    <>
    <StyledPlaylistHeader>
      Student Resource Section
      <StyledJourney>
        1/6
      </StyledJourney>

    </StyledPlaylistHeader>
    <StyledVideo>
    <StyledVideoWrapper>
      <ReactPlayer
        width="100%"
        height="100%"
        style={{ position: "absolute", top: "0"}}
        playing={autoplay}
        controls={true}
        // url={active.video}
        onEnded={endCallback}
        onProgress={progressCallback}
      />
    </StyledVideoWrapper>
  </StyledVideo>
        
    </>
  )
}

export default Resources