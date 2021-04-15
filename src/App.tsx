import { Component } from 'react'
import './App.css';
import AlbumComponent from './components/album.component';
import { Album } from './models/album.model';
import { SpotifyApiService } from './services/spotify-api.service';

interface Props {

}
interface State {
  albums: Album[];
  albumChoose: Album | null;
}

export default class App extends Component<Props, State> {

  state: State = { albums: [], albumChoose: null };
  private spotifyApiService = new SpotifyApiService();

  private showAlbum(album: Album) {
    this.setState({
      albums: this.state.albums,
      albumChoose: album
    });
  }

  componentDidMount() {
    this.spotifyApiService.getAlbums(["7uPXXL49eGt4lJNB9GXqbQ", "5t6841R6FNAGkEqqLb6OC4"])
      .then(data => this.setState({ albums: data }))
  }

  render() {
    const albums = this.state.albums.map(album => {
      return <div onClick={() => this.showAlbum(album)}>
        {album.name}
      </div>
    })

    return (
      <div>
        <div>{albums}</div>
        <div>{this.state.albumChoose ? <AlbumComponent {...this.state.albumChoose} /> : ""}</div>
      </div>
    )
  }
}

