import React, { Component } from "react";
import { Album } from "../models/album.model";
import { Artist } from "../models/artist.model";
import { SpotifyApiService } from "../services/spotify-api.service";
import AlbumComponent from "./album.component";

interface Props {
  id: string;
}
interface State {
  artist?: Artist;
  albums?: Album[];
}

export default class ArtistComponent extends Component<Props, State> {
  state: State = {};
  private spotifyApiService = new SpotifyApiService();

  componentDidMount() {
    this.spotifyApiService
      .getArtist(this.props.id)
      .then((data) =>
        this.setState({ artist: data, albums: this.state.albums })
      );

    this.spotifyApiService
      .getArtistAlbums(this.props.id)
      .then((data) =>
        this.setState({ artist: this.state.artist, albums: data })
      );
  }

  render() {
    if (!this.state || !this.state.artist || !this.state.albums) {
      return <div></div>;
    }

    const albums = this.state.albums.map((album) => {
      // return <AlbumComponent
      //   {...album} />;
    });

    return (
      <div>
        {this.state.artist.name}
        {albums}
      </div>
    );
  }
}
