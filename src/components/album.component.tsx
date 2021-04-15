import { Component } from 'react'
import { Album } from '../models/album.model'
import TrackComponent from './track.component';

export default class AlbumComponent extends Component<Album> {

  render() {
    const tracks = this.props.tracks.items.map(track => {
      return <TrackComponent
        {...track} />;
    });

    return (
      <div>
        {this.props.name}
        {tracks}
      </div>
    )
  }
}
