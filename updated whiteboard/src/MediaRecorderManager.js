import React, { Component } from 'react';

class MediaRecorderManager extends Component {
  constructor(props) {
    super(props);

    this.mediaRecorder = new MediaRecorder(props.stream);
    this.mediaRecorder.ondataavailable = async (e) => {
      if (e.data.size > 0) {
        let processedBlob = e.data;
        if (MediaRecorder.isTypeSupported('video/webm')) {
          processedBlob = await this.webmFixDuration(processedBlob, this.state.duration);
        }
        this.props.onNewChunkAdded(processedBlob);
      }
    };

    this.state = {
      duration: 0,
      recordingStartedAt: 0,
    };
  }

  webmFixDuration(blob, duration) {
    // Implement webmFixDuration logic here if needed
    return blob;
  }

  startRecord() {
    this.mediaRecorder.start();
    this.setState({ recordingStartedAt: Date.now() });
  }

  stopRecord() {
    const { recordingStartedAt } = this.state;
    this.setState({ duration: Date.now() - recordingStartedAt });
    this.mediaRecorder.stop();
  }

  render() {
    // You can add any additional rendering logic or JSX here if needed
    return null;
  }
}

export default MediaRecorderManager;
