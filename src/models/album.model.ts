import { Artist } from "./artist.model"
import { Track } from "./track.model"

export interface Album {
  album_type: string
  artists: Artist[],
  available_markets: string[],
  copyrights: {
    text: string
    type: string
  }[],
  external_ids: {
    upc: string
  },
  external_urls: {
    spotify: string
  },
  genres: any[],
  href: string,
  id: string,
  images: {
    height: number,
    url: string
    width: number
  }[],
  name: string
  popularity: number,
  release_date: string,
  release_date_precision: string,
  tracks: {
    href: string
    items: Track[],
    limit: number,
    next: null,
    offset: number,
    previous: null,
    total: number
  },
  type: string,
  uri: string
}
