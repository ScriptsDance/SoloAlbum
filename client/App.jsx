import React, {Component} from "react";
import ImportButton from './components/ImportButton.jsx';
import SpotifyList from './components/SpotifyList.jsx';
import InputBox from './components/InputBox.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <main>
        <InputBox/>
        {/* <SpotifyList/> */}
        </main>    
      </div>
    )
  }
};

export default App;