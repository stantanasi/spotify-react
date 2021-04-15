import { Album } from "../models/album.model"
import { Artist } from "../models/artist.model"
import { Track } from "../models/track.model"

export class SpotifyApiService {

  private apiUrl = "https://api.spotify.com/v1"
  private apiToken = "BQDYPVxskRCtNy2uy_zNAMTeLKiN1km6f3c2B01mHJgo6RYi71woxUDt8YEye6-9TTCF5gvNrU0YckmXuyaztyjoEKNPRhZfRaD2jCffufORDE-I3pF9zUwbly1dfE4Cpxuxny4MyjUzQZsJQaYavKSduIb-kOYtdyjWmaDsrgsepdf_pPeORva8T7ZeaGPa3BKY2QvKC48sXVjmEE6R3xIo8tFItfmBNgEfv_RVz2hyxIWYHfIOC4OamGAODfBOsqkUzaK53fpI2DxrssevY7ZFzPwz4rJYjDQo"

  getArtist(id: string): Promise<Artist> {
    return fetch(`${this.apiUrl}/artists/${id}`, { headers: { 'Authorization': `Bearer ${this.apiToken}` } })
      .then(response => response.json())
  }

  getArtistAlbums(id: string): Promise<Album[]> {
    return fetch(`${this.apiUrl}/artists/${id}/albums`, { headers: { 'Authorization': `Bearer ${this.apiToken}` } })
      .then(response => response.json())
      .then(data => data.items)
  }


  getAlbums(ids: string[]): Promise<Album[]> {
    return fetch(`${this.apiUrl}/albums?ids=${ids.join(',')}`, { headers: { 'Authorization': `Bearer ${this.apiToken}` } })
      .then(response => response.json())
      .then(data => data.albums)
  }

  getAlbumTracks(id: string): Promise<Track[]> {
    return fetch(`${this.apiUrl}/albums/${id}/tracks`, { headers: { 'Authorization': `Bearer ${this.apiToken}` } })
      .then(response => response.json())
      .then(data => data.items)
  }
}
