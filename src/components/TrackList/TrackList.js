import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
  render() {
//    if (this.props.searchResults && Array.isArray(this.props.searchResults)) {}
    //else this.props.searchResults = [];
    return (
      <div className="TrackList">
      {
          this.props.searchResults.map((track) => {
            return <Track track={track} key={track.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} />;
          })
      }
      </div>
    )
  }
}

export default TrackList;
