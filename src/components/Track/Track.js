import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props){
    super(props);
    this.addTrack=this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);
  }

  addTrack(){
    this.props.onAdd(this.props.track);
  }

  /*create a .removeTrack() method in the Track component. Use it to remove this.props.track from the playlist*/

  removeTrack(){
    this.props.onRemove(this.props.track);
  }

  renderAction() {
    if(this.props.onAdd){
      return <a onClick={this.addTrack}>+</a>;
    } else {
      return <a onClick={this.removeTrack}>-</a>;
    }
  }

  render(){
    return (
      <div className="Track">
        <div className="Track-information">

          {/* <h3><!-- track name will go here --></h3> */}
          {/*the properties were given state in app, and the track was rendered in tracklist*/}
          {/*so here you are rending the track name, artist and album*/}
          <h3 className="Track-name">{this.props.track.name}</h3>

          {/* <p><!-- track artist will go here--> | <!-- track album will go here --></p> */}
          <p className="Track-artist-alubum"> {this.props.track.artist} | {this.props.track.album} </p>

        </div>
        {this.renderAction()}
      </div>
    )
  }
}

export default Track;
