import React, { Component } from 'react';
import ImportButton from './ImportButton.jsx';
import SpotifyTrack from './SpotifyTrack.jsx';

class SpotifyList extends Component {
  render() {
    // Spotify API responds JSON to GET request
    // song represents passed
    const songs = [];
    for (let i = 0; i < songs.length; i++) {
      songs.push(
        <span>
          <label>${songName}</label>
          <label>${artist}</label>
        </span>
      )
    }
    
    return (
      <div>
        [songs]
      </div>
    )
  }
}

export default SpotifyList;