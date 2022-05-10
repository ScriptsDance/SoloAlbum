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
      playListToTracksMap: {}, //{"playlist1": [trackobj1, trackobj2], "playlist2" : [trackobj3]}
      searchCompleted: false,
    }
    this.clickMe = this.clickMe.bind(this);
    this.searchAllSongs = this.searchAllSongs.bind(this);
    this.createPlayList = this.createPlayList.bind(this);
  }

  clickMe() {
    alert('I have been clicked!');
    this.searchAllSongs()
  };

  searchAllSongs() {
    //fetch from node search api
    //find the songName index and Artist index from header
    const header = this.props.userInputSongs[0];
    //songInfo - other rows excluding header
    const songInfo = this.props.userInputSongs.slice(1);
    let songNameIndex = -1;
    let artistIndex = -1;
    let playListIndex = -1;
    for (let i = 0; i < header.length; i++) {
      if (header[i] === 'song_name') {
        songNameIndex = i;
      }
      if (header[i] === 'artist') {
        artistIndex = i;
      }
      if (header[i] === 'play_list') {
        playListIndex = i;
      }
    }
    if (songNameIndex === -1 || artistIndex === -1 || playListIndex === -1) {
      //TODO: we should let user know that the input excle format is not right, and exit
    }

    const map = {};
    const fetches = [];

    for (let row = 0; row < songInfo.length; row++) {
      const artist = songInfo[row][artistIndex].trim();
      const track = songInfo[row][songNameIndex].trim();
      const playListName = songInfo[row][playListIndex].trim();
      console.log("User input: ", artist, '+', track, '+', playListName);
      //call node server api - search (await for each loop)
      fetches.push(
        fetch('/search?' + new URLSearchParams({ artist: artist, track: track, type: 'track', limit: 1, }))
          .then((data) => data.json())
          .then((data) => {
            // if (data.canFindResult) {//if we can find result
            const result = data.result;
            //push the searched result to the coressponding playlist
            let arr = [];
            if (!map.hasOwnProperty(playListName)) {
              arr.push(result);
              map[playListName] = arr;
            }
            else {
              arr = map[playListName];
              arr.push(result);
              map[playListName] = arr;
            }
            // else {
            //   //TODO: we will show user the songs cannot be found
            // }
          })
          .catch((error) => {
            return console.log(error);

          }));

    };
    Promise.all(fetches)
      .then(() => {
        this.setState({ playListToTracksMap: map, searchCompleted: true });
      })
      .then(() => {
        this.createPlayList();
      }

      )


  };


  createPlayList() {

    const mp = this.state.playListToTracksMap;
    console.log("Search Result from Spotify: ", mp);

    const fetches = [];
    //fetch from node createPlaylist api
    for (let pl in mp) { 
      fetches.push(
        fetch('/playlist', {
          method: 'POST',
          body: JSON.stringify({ name: pl, description: pl, public: false }),
          headers: {
            'Content-Type': 'application/json'
          },
        }
        )
          .then((data) => data.json())
          .then((data) => {
            console.log('create playlist')
          })
          .catch((error) => {
            console.log(error);
          })
      )
    }
    Promise.all(fetches)
      .then((data) => {
        console.log("call promise all");
      })



  };
  render() {
    if (this.state.searchCompleted) {
      console.log(this.state.playListToTracksMap);
      return (
        <div>
          <button onClick={this.clickMe}>IMPORT</button>
          <div>
            {/* {"playlist1": [trackobj1, trackobj2], "playlist2" : [trackobj3]} key is the playlist name, value is the array of trackobjects*/}
            <SpotifyList searchResults={this.state.playListToTracksMap} />
          </div>
        </div>

      )

    }
    else {
      return (
        <div>
          <button onClick={this.clickMe}>IMPORT</button>
        </div>

      )

    }

  }
}

export default ImportButton;