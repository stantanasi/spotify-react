import React, { Component } from "react";
import "./App.css";
import AlbumComponent from "./components/album/album.component";
import { Album } from "./models/album.model";
import { SpotifyApiService } from "./services/spotify-api.service";

interface Props { }
interface State {
  albums: Album[];
  albumChoose: Album | null;
}

export default class App extends Component<Props, State> {
  state: State = { albums: [], albumChoose: null };
  private spotifyApiService = new SpotifyApiService();

  private showAlbum = (album: Album) => {
    this.setState({
      ...this.state,
      albumChoose: album,
    });
  };
  private closeAlbum = () => {
    this.setState({
      ...this.state,
      albumChoose: null,
    });
  };

  componentDidMount() {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      this.spotifyApiService.authorizationCode = code;
    }

    if (this.spotifyApiService.authorizationCode) {
      this.spotifyApiService.getAccessToken()
        .then((accessToken) => {
          this.spotifyApiService.getAlbums(["7uPXXL49eGt4lJNB9GXqbQ", "5t6841R6FNAGkEqqLb6OC4"])
            .then((data) => this.setState({
              ...this.state,
              albums: data
            }));
        });
    } else {
      this.spotifyApiService.getAuthorizationCode();
    }
  }

  render() {
    return (
      <div>
        <div className="container-albumname">Albums</div>
        <div className="container-album">
          {this.state.albums
            .map((album) => <div onClick={() => this.showAlbum(album)}>{album.name}</div>)}
        </div>
        <div className="container-image-description"></div>
        <div className="container-album-component">
          {this.state.albumChoose &&
            <AlbumComponent
              {...this.state.albumChoose}
              onClose={this.closeAlbum} />}
        </div>
      </div>
    );
  }
}
