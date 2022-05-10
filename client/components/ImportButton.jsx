// import * as React from 'react';
// import ReactDOM from 'react-dom';
import { alignProperty } from '@mui/material/styles/cssUtils';
import React, { Component } from 'react';
import { useSearchParams } from 'react-router-dom';
import SpotifyList from './SpotifyList.jsx';

class ImportButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults : []
    }
    this.clickMe = this.clickMe.bind(this);
    this.searchSongs = this.searchSongs.bind(this);
  }

  clickMe() {
    alert('I have been clicked!');
    this.searchSongs();
  };

  searchSongs() {
    //fetch from node search api
    //find the songName index and Artist index from header
    console.log('in searchSongs');
    console.log("userinputsongs", this.props.userInputSongs);
    const header = this.props.userInputSongs[0];
    //songInfo - other rows excluding header
    const songInfo = this.props.userInputSongs.slice(1);
    let songNameIndex = -1;
    let artistIndex = -1;
    for (let i = 0; i < header.length; i++) {
      if (header[i] === 'song_name') {
        songNameIndex = i;
      }
      if (header[i] === 'artist') {
        artistIndex = i;
      }
    }
    if(songNameIndex === -1 || artistIndex === -1){
      //TODO: we should let user know that the input excle format is not right
    }
    //for the rows that not header, we get the corresponding song_name and artist based on the songNameIndex and artistIndex
    const searchResList = [];
    for (let row = 0; row < songInfo.length; row++) {
      const artist = songInfo[row][artistIndex].trim();
      const track = songInfo[row][songNameIndex].trim();
      console.log("artist",artist);
      console.log("track",track);
      //call node server api search
      //const q = `artist: ${artist} track: ${songName}`;
      //const searchTrackURL = 'https://api.spotify.com/v1/search?q=' + encodeURIComponent(q) +'&type=track&limit=1';
      fetch('/search?' + new URLSearchParams({
        artist: artist,
        track: track,
        type: 'track', //response type
        limit: 1,
      })
      )
      .then((data) => data.json())
      .then((data) => {
        if(data.canFindResult){
          searchResList.push(data.result);
        }
        else{
          //TODO: we will show user the songs cannot be found
        }
      })
      .catch((error) => {
        return next(error)
      });
    }
    //outside of the for loop, reset the state
    this.setState({searchResults: searchResList});
  }

  render() {
    return (
      <div>
        <button onClick={this.clickMe}>IMPORT</button>
        <div>
          <SpotifyList searchResults = {this.state.searchResults}/>
        </div>
      </div>

    )
  }
}

export default ImportButton;