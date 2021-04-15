import { Component } from "react";
import { Album } from "../models/album.model";
import TrackComponent from "./track.component";
import "./album.component.css";
import { WiTime9 } from "react-icons/wi";

interface Props extends Album {
  onClose: () => void;
}

export default class AlbumComponent extends Component<Props> {
  private onClose = () => {
    this.props.onClose();
  };
  render() {
    const tracks = this.props.tracks.items.map((track) => {
      return <TrackComponent {...track} />;
    });

    return (
      <div className="Whole-album">
        <img src={this.props.images[0].url} alt="" className="Whole-images" />
        <div className="Whole-artist-name">
          By {this.props.artists.map((artist) => artist.name).join(", ")}-{" "}
          {this.props.release_date} - {this.props.tracks.total} songs
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
            <tbody>{tracks}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
