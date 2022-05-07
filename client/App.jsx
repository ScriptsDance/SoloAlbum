import React, {Component} from "react";
import ImportButton from './components/ImportButton.jsx';
import SpotifyList from './components/SpotifyList.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <ImportButton />
        <SpotifyList />
      </div>
    )
  }
};

export default App;