import { Album } from "../models/album.model";
import { Artist } from "../models/artist.model";
import { Track } from "../models/track.model";

export class SpotifyApiService {
  private apiUrl = "https://api.spotify.com/v1";
  private apiToken =
    "BQD_QSuinc69sdbOYV94h1E0gD7JC0Uqhzp_Qs8WLa_f90etGNa_p8-Y9GjMoVtGFhRZVQ8achIJ8Y9mHe1x2blin6OCSELKyEw__1rteVUsuAVZu468IU5R-MwrsKmTD-ttlpMjkoygsulMWJX8VRqYURx_4Pp_swW6DhLYVJyIGAmO2zUFldA1wTjLaCM7JGaTQzIQdO64qWhmknofpenRw-UDBVsCvvl6P813L-40mlQ6_JfquFsHjHKO5fsE5WhpiUC-rCE058mQWRMVyYHh4xBNnM7Xv3NX";

  getArtist(id: string): Promise<Artist> {
    return fetch(`${this.apiUrl}/artists/${id}`, {
      headers: { Authorization: `Bearer ${this.apiToken}` },
    }).then((response) => response.json());
  }

  getArtistAlbums(id: string): Promise<Album[]> {
    return fetch(`${this.apiUrl}/artists/${id}/albums`, {
      headers: { Authorization: `Bearer ${this.apiToken}` },
    })
      .then((response) => response.json())
      .then((data) => data.items);
  }

  getAlbums(ids: string[]): Promise<Album[]> {
    return fetch(`${this.apiUrl}/albums?ids=${ids.join(",")}`, {
      headers: { Authorization: `Bearer ${this.apiToken}` },
    })
      .then((response) => response.json())
      .then((data) => data.albums);
  }

  getAlbumTracks(id: string): Promise<Track[]> {
    return fetch(`${this.apiUrl}/albums/${id}/tracks`, {
      headers: { Authorization: `Bearer ${this.apiToken}` },
    })
      .then((response) => response.json())
      .then((data) => data.items);
  }
}
