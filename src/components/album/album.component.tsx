import React, { Component } from "react";
import "./album.component.css";
import { WiTime9 } from "react-icons/wi";
import TrackComponent from "../track/track.component";
import { Album } from "../../models/album.model";

interface Props extends Album {
  onClose: () => void;
}

export default class AlbumComponent extends Component<Props> {
  private onClose = () => {
    this.props.onClose();
  };
  render() {
    return (
      <div className="Whole-album">
        <img src={this.props.images[0].url} alt="" className="Whole-images" />
        <div className="Whole-artist-name">
          <span>By </span>
          <span>{this.props.artists.map((artist) => artist.name).join(", ")}</span>
          <span> - </span>
          <span>{new Date(this.props.release_date).getFullYear()}</span>
          <span> - </span>
          <span>{this.props.tracks.total} songs</span>
        </div>
        <div>
          <button onClick={this.onClose} className="Whole-button">
            Close
          </button>
        </div>
        <div className="Whole-tracks">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Song</th>
                <th>
                  <WiTime9 className="Witime9" />
                </th>
              </tr>
            </thead>
            <br />
            <tbody>
              {this.props.tracks.items
                .map((track) => <TrackComponent {...track} />)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
