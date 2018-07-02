import React from 'react';
import './TrackList.css';

import Track from '../Track/Track';

class TrackList extends React.Component {
  render(){
    return (
      <div className="TrackList">
      {
          /*<!-- You will add a map method that renders a set of Track components  -->*/
          /*use the .map() method to render eah track on the tracks property, set the key attribute to track.id*/

          /*this is your track component, youre passing in the current track and setting it with track={track} you do the id so that each track is different*/

          /*when the Tracklist component first mounts, this.props.tracks is undfeined, so you can solve this by adding a considtional in your render*/

          /*pass onRemove and isRemoval from the TrackList component to the Track component*/

          this.props.tracks && this.props.tracks.map(track => {
            return <Track track={track} key={track.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove}/>
          })
        }
      </div>
    );
  }
};

export default TrackList;
