import React, { Component } from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import './css/main.css';
import './sass/main.scss';


const externalJsonUrl = 'https://rawgit.com/alexbumpers/89dec66c127520b788b2e1cc7ce1982c/raw/bb116b1a08dc854a6c097185cc5977d13e296b7e/components.json'

class AudioApp extends Component {

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
    
    fetch(externalJsonUrl)
    .then(text => { 
      return text.json();
      
    })
    .then(data => {
      let info = data.text.map((allComponents) => {
        return(
          <p key={allComponents.text}>
            {allComponents.more.paragraph}
          </p>
        )
      })

      let buttonText = data.text.map((allComponents) => {
        return(
          <p key={allComponents.text}>
            {allComponents.more.btn}
          </p>
        )
      })

      let head = data.text.map((allComponents) => {
        return(
          <p key={allComponents.text}>
            {allComponents.more.header}
          </p>
        )
      })

      let audio = data.text.map((allComponents) => {
        return(
          <audio src={allComponents.more.audioURL} controls key={allComponents.text}>
            {allComponents.more.audioURL}
          </audio>
        )
      })

      this.setState({
        info: info,
        buttonText: buttonText,
        head: head,
        audio: audio
      });
      console.log(this.state.audio);
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
            <audio className="text-container__audio-controls" ref="audioRef" hidden>
            <source src="http://www.nihilus.net/soundtracks/Static%20Memories.mp3" type="audio/mp3" />
            <source src="http://www.nihilus.net/soundtracks/Static%20Memories.mp3" type="audio/oog" />
            <source src="http://www.nihilus.net/soundtracks/Static%20Memories.mp3" type="audio/wav" />
            <source src="http://www.nihilus.net/soundtracks/Static%20Memories.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
            </audio>
            <button class="text-container__audio-play" onClick={this.playAudio.bind(this)}>{this.state.buttonText}</button>
            {/* <audio src={this.state.audio} controls/> */}
            {/* <audio controls>
            <source src={this.state.audio} type="audio/mp3" />
            <source src={this.state.audio} type="audio/oog" />
            Your browser does not support the audio element.
            </audio> */}

            {/* <button className="text-container__btn--btn">
              {this.state.buttonText}
              </button> */}
          </div> 
      </div>
    );
  }
}

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
    fetch(externalJsonUrl)
    .then(text => { 
      return text.json();
    })
    .then(data => {
      let skip = data.text.map((vid) => {
        return(
          <p key={vid.text}>
            {vid.more.skipVideo}
          </p>
        )
      })

      let videoUrl = data.text.map((vid) => {
        return(
          <video key={vid.text}>
            <source src={vid.more.videoURL}/>
          </video>
        )
      })

      let playText = data.text.map((vid) => {
        return(
          <p key={vid.text}>
            {vid.more.playVideo}
          </p>
        )
      })

      this.setState({
        skipVideo: skip,
        videoUrl: videoUrl,
        playVideo: playText
      });
    })
  }
   
  render() {
    return (
      <div className="main">
        <div className="main__video">
          <video className="main__fg-video" ref="vidRef" loop mute>
              <source src="https://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4" />
              <source src="https://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/ogg" />
              {/* <source src={this.state.videoUrl} type="video/mp4" />
              <source src={this.state.videoUrl} type="video/ogg" /> */}
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

const Audio = () => (
  <AudioApp />
)

const Video = () => (
  <VideoApp />
)

const BasicExample = () => (
  <Router>
    <div className="routes">
      <Route path="/audio" component={Audio}/>
      <Route exact path="/" component={Video}/>
    </div>
  </Router>
)
export default BasicExample