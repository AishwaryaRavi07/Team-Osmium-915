import styled from "styled-components";

const StyledPlaylistItem = styled.div`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: none;
  border:  "2px dotted #696969" : "none"
  font-size: 1.6em;
  color: white;
  min-height: 50px;
  padding: 10px 20px;
  margin: 0 0 10px 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: "5px";
  cursor: pointer;
  position: relative;

  ::before {
    display: "block";
    content: "";
    width: 10px;
    min-height: 10px;
    background: #409f4e;
    border-radius: 50px;
    position: absolute;
    left: 0;
    top: 19px;
  }

  .wbn-player__video-nr {
    flex-grow: 1; /* default 0 */
    max-width: 30px;
    padding-right: 20px;
    border-right: 2px solid #565656;
  }

  .wbn-player__video-name,
  .wbn-player__video-name a {
    flex-grow: 10; /* default 0 */
    padding: 0 0 0 10px;
    color: white;
    text-align: left;
    text-decoration: none;
    display: block;
  }

  .wbn-player__video-time {
    background: #565656;
    min-width: 45px;
    color: #fff;
    font-size: 0.8em;
    padding: 0px 5px;
    height: 20px;
    text-align: center;
    border-radius: 5px;
    margin: 0 0 0 5px;
  }

  .wbn-player__video-download {
    flex-grow: 1; /* default 0 */
    color: #fff;
    margin: 0 0 0 20px;
    max-width: 30px;
    padding: 0 20px;
    border-left: 2px solid #565656;
    font-family: "fontello";
    font-style: normal;
    font-weight: normal;
  }

  .wbn-player__video-download a {
    color: black;
  .active {
    opacity: 0.1;
  }
`;

export default StyledPlaylistItem;
