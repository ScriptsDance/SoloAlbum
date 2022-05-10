import React, { Component } from 'react';


class SpotifyList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // Spotify API responds JSON to GET request
    // song represents passed
    //console.log(this.props || "nothing");
    const songs = [
      { song: 'Dancing in the Dark', artist: 'Bruce Springstein', addStatus: true },
      { song: 'Save Me', artist: 'ZHU', addStatus: true },
      { song: 'Doing Yoga', artist: 'Kazy Lambist', addStatus: true },
      { song: 'Dancing in the Dark', artist: 'Bruce Springstein', addStatus: true },
    ];
    const songComponents = [];
    /*
    { song: 'Dancing in the Dark', artist: 'Bruce Springstein' }


    */
    for (let i = 0; i < songs.length; i++) {
      songComponents.push(
        <tr>
          <td>{songs[i].song}</td>
          <td>{songs[i].artist}</td>
          <td>{songs[i].addStatus ? 'added' : 'skipped'}</td>
        </tr>
      )
    }
    // style="background-color:#1db954"
    console.log(songComponents);
    return (
      <div>
        <table class="table table-dark">
          <tbody>
            <tr class="table-success">
              <th>Song</th>
              <th>Artist</th>
              <th>Status</th>
            </tr>
            {songComponents}
          </tbody>
        </table>
      </div>
    )
  }
}

export default SpotifyList;