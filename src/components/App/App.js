import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "New Playlist",
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  addTrack( track ) {
    const curTracks = this.state.playlistTracks;
    //if track already exists return
    if (curTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    curTracks.push(track);
    this.setState({
      playlistTracks: curTracks
    });
  }
  removeTrack (track) {
    const curTracks = this.state.playlistTracks;
    const newList = curTracks.filter(trk => trk.id !== track.id);
    this.setState({
      playlistTracks: newList
    });
  }
  updatePlaylistName (name) {
    this.setState({
      playlistName: name
    });
  }
  savePlaylist () {
    const trackUris = [];
    this.state.playlistTracks.forEach(track => {
      trackUris.push(track.uri);
    });
    console.log(trackUris);
    Spotify.saveList(this.state.playlistName, trackUris);
    this.setState({
      playlistName: "New Playlist",
      playlistTracks: []
    })
  }
  search ( term ) {
    Spotify.search( term ).then(resTracks => {
      if (!Array.isArray(resTracks)) resTracks = [];
      this.setState({
        searchResults: resTracks
      })
    })
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
