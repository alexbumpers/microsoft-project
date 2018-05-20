import React, { Component } from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import './css/main.css';
import './sass/main.scss';

// External JSON file hosted on a Github Gist
const externalJsonUrl = 'https://rawgit.com/alexbumpers/89dec66c127520b788b2e1cc7ce1982c/raw/bb116b1a08dc854a6c097185cc5977d13e296b7e/components.json'

// Component for the Audio, background img, etc.
class AudioApp extends Component {

  // start audio stream on play button click using a reference to the player via custom play button
  playAudio() {
    this.refs.audioRef.play();
  }

  constructor(props) {
    super(props);

    this.state = {
      info: [],
      head: [],
      buttonText: [],
      audio: []
    };
  }

  componentDidMount() {
    
    // request external JSON file using fetch API and return JSON text
    fetch(externalJsonUrl)
    .then(text => { 
      return text.json();
    })
    .then(data => {
      // iterate through JSON and return requested information
      let info = data.text.map((allComponents) => {
        // return body text
        return(
          <p key={allComponents.text}>
            {allComponents.more.paragraph}
          </p>
        )
      })

      let buttonText = data.text.map((allComponents) => {
        return(
          // return text for audio play button
          <p key={allComponents.text}>
            {allComponents.more.btn}
          </p>
        )
      })

      // return header text
      let head = data.text.map((allComponents) => {
        return(
          <p key={allComponents.text}>
            {allComponents.more.header}
          </p>
        )
      })

      // return audio controls
      let audio = data.text.map((allComponents) => {
        return(
          <audio src={allComponents.more.audioURL} controls key={allComponents.text}>
            {allComponents.more.audioURL}
          </audio>
        )
      })

      // set state for audio page components via requested JSON data
      this.setState({
        info: info,
        buttonText: buttonText,
        head: head,
        audio: audio
      });
    })
  }

  render() {
    return (
      <div className="audio">
        <div className="text-container">
          <div className="text-container__heading-primary">
            {this.state.head}
          </div>
          <div className="text-container__paragraph">
            <p>
              {this.state.info}
            </p>
          </div>
          {/* return audio with support for different formats/codecs */}
          <audio className="text-container__audio-controls" ref="audioRef" hidden>
            <source src="http://www.nihilus.net/soundtracks/Static%20Memories.mp3" type="audio/mp3" />
            <source src="http://www.nihilus.net/soundtracks/Static%20Memories.mp3" type="audio/oog" />
            <source src="http://www.nihilus.net/soundtracks/Static%20Memories.mp3" type="audio/wav" />
            <source src="http://www.nihilus.net/soundtracks/Static%20Memories.mp3" type="audio/mpeg" />
            {this.state.audio}
            Your browser does not support the audio element.
          </audio>
          <button class="text-container__audio-play" onClick={this.playAudio.bind(this)}>
            {this.state.buttonText}
          </button>
        </div> 
      </div>
    );
  }
}

// Component for the Video, background img, etc.
class VideoApp extends Component {
  playVideo() {
    this.refs.vidRef.play();
  }

  constructor() {
    super();

    this.state = {
      skipVideo: [],
      videoUrl: [],
      playVideo: []
    };
  }

  componentDidMount() {
    // request external JSON file using fetch API and return JSON text
    fetch(externalJsonUrl)
    .then(text => { 
      return text.json();
    })
    .then(data => {
      // map and return data/text for skip video button
      let skip = data.text.map((vid) => {
        return(
          <p key={vid.text}>
            {vid.more.skipVideo}
          </p>
        )
      });

      // map and return data for video
      let videoLoad = data.text.map((vid) => {
        return(
          <video key={vid.text} src={this.state.videoURL} type="video/mp4" />
        )
      });

      // map and return data/text for play video button
      let playText = data.text.map((vid) => {
        return(
          <p key={vid.text}>
            {vid.more.playVideo}
          </p>
        )
      });

      // set state for video page components via requested JSON data
      this.setState({
        skipVideo: skip,
        videoUrl: videoLoad,
        playVideo: playText
      });
    });
  }
   
  render() {
    return (
      <div className="main">
        <div className="main__video">
          <video className="main__fg-video" ref="vidRef" loop mute>
            <source src="https://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4" />
            <source src="https://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/ogg" />
            {this.state.videoLoad}
          </video>
        </div>
        <button class="main__play" onClick={this.playVideo.bind(this)}>
          {this.state.playVideo}
        </button>
        <Link to="/audio">
          <button className="main__skip-button">
            {this.state.skipVideo}
          </button>
        </Link>
      </div>
    );
  }
}

// load AudioApp component
const Audio = () => (
  <AudioApp />
)

// load VideoApp component
const Video = () => (
  <VideoApp />
)

// declare route paths for Audio and Video components
const AllRoutes = () => (
  <Router>
    <div className="routes">
      <Route path="/audio" component={Audio}/>
      <Route exact path="/" component={Video}/>
    </div>
  </Router>
)
export default AllRoutes