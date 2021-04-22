import { Album } from "../models/album.model";
import { Artist } from "../models/artist.model";
import { Track } from "../models/track.model";

export class SpotifyApiService {

  private apiUrl = "https://api.spotify.com/v1";
  public authorizationCode: string | null = null;
  public apiToken: string | null = null;


  getAuthorizationCode() {
    const queryParams = {
      client_id: "6c53c3ccd47649f9a8db795a2140f0c1",
      response_type: "code",
      redirect_uri: "http://localhost:3000/"
    }

    window.location.replace(`https://accounts.spotify.com/authorize?${this.queryParamsToString(queryParams)}`)
  }

  getAccessToken(): Promise<string | void> {
    const queryParams = {
      grant_type: "authorization_code",
      code: this.authorizationCode,
      redirect_uri: "http://localhost:3000/"
    }

    return fetch(`https://accounts.spotify.com/api/token?${this.queryParamsToString(queryParams)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`6c53c3ccd47649f9a8db795a2140f0c1:9311074aee824503aa405fd3cd23118c`)}`
      },
    })
      .then((response) => response.json())
      .then((response) => this.apiToken = response.access_token);
  }


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



  queryParamsToString(params: any): string {
    const keyValuePairs = [];
    for (const key in params) {
      keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
    }
    return keyValuePairs.join('&');
  }
}
