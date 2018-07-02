import React, { Component } from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import PlayList from '../PlayList/PlayList';
import SearchResults from '../SearchResults/SearchResults';

import Spotify from '../../util/Spotify.js'


class App extends Component {
  constructor(props){
    super(props); 

    /*set this.state to an object with a property called searchResults set to an array of objects each containing a name, artist, album, and id properties*/
    this.state = {
      searchResults: [],
      playListName: 'New Playlist',
      playListTracks: []
    };

    this.removeTrack = this.removeTrack.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.updatePlayListName = this.updatePlayListName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
    this.search = this.search.bind(this);


    /*pass the state of the App components searchResults to the SearchResults component*/

  }

  search(searchTerm){
    Spotify.search(searchTerm).then(tracks => {
      this.setState({searchResults: tracks})
  });
}

  updatePlayListName(newName){
    this.setState({playListName: newName});
  }

  addTrack(track){
    /*use the tracks id property to check if the current song is in the playListTracks state, if the id is new add the song to the end of the playlist,set the new state of the playlist*/

    /*the following determines if the track already exists in the playlist and if it does, breaks out of the method*/
    if(this.state.playListTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    let tracks=this.state.playListTracks;
    tracks.push(track);
    this.setState({playListTracks: tracks})
  }

  removeTrack(track){
    let removeIt = this.state.playListTracks.filter(playListTrack => track.id !== track.id);
    this.setState({playListTracks: removeIt});
  }

  savePlayList(){
    /*generate an array of uri values called trackURIs from the playlistTracks property*/
    const trackURIs = this.state.playListTracks.map(track => track.uri);

    Spotify.savePlayList(this.state.playListName, trackURIs).then(() => {
      this.setState({
        playListName: 'New Play List',
        playListTracks: []
      })
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App ">

          {/* Add a SearchBar component */}
          <SearchBar onSearch={this.search}/>

          <div className="App-playlist">

            {/* Add a SearchResults component, pass the state of the app components searchResults to the search results component */}
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>

            {/* Add a Playlist component */}
            {/*pass the playList name and tracks from the app component to the PlayList component*/}
            {/*pass removeTrack() to the playList component as on onRemove attribut*/}
            <PlayList playListName={this.state.playListName} playListTracks={this.state.playListTracks} onRemove={this.removeTrack} onNameChange={this.updatePlayListName} onSave={this.savePlayList}/>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
