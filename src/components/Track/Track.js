import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.renderHandler = this.renderHandler.bind(this);
  }
  addTrack(e) {
    this.props.onAdd(this.props.track);
    e.preventDefault();
  }
  removeTrack(e) {
    this.props.onRemove(this.props.track);
    e.preventDefault();
  }
  renderAction() {
    return (this.props.isRemoval) ? '-' : '+';
  }
  renderHandler(e) {
    return (this.props.isRemoval) ? this.removeTrack(e) : this.addTrack(e);
  }
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        <a className="Track-action" onClick={this.renderHandler}>{this.renderAction()}</a>
      </div>
    );
  }
}

export default Track;
