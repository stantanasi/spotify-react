import React, { Component } from "react";
import { Track } from "../models/track.model";
import "./track.component.css";

export default class TrackComponent extends Component<Track> {
  padStart(value: number | string, length: number, padChar: string) {
    let s = `${value}`;
    while (s.length < length) s = `${padChar}${s}`;
    return s;
  }

  render() {
    const minutes = this.padStart(
      Math.floor(this.props.duration_ms / 1000 / 60),
      2,
      "0"
    );
    const seconds = this.padStart(
      Math.floor((this.props.duration_ms / 1000) % 60),
      2,
      "0"
    );
    const duration = `${minutes}:${seconds}`;

    return (
      <tr>
        <td className="Track-number">{this.props.track_number}</td>
        <td className="Track-name">{this.props.name}</td>
        <td className="Track-duration">{duration}</td>
      </tr>
    );
  }
}
