import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';

export default class VMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      zoom: 2,
    }
  }

  render() {
    const position = [0, 0]
    const markerPosition = [0, 0]
    return (
      <Map zoomControl={false} center={position} zoom={this.state.zoom} maxZoom={5} minZoom={1}>
        <TileLayer
          maxZoom={5}
          minZoom={1}
          noWrap={true}
          attribution="&amp;copy <a href=&quot;https://github.com/opsukka&quot;>Zukop</a> contributors"
          url="./maps/kartta/{z}/{x}/{y}.png"
        />
      <ZoomControl position="topright" />
        <Marker
          draggable={true}
          position={markerPosition}
          ref="marker">
          <Popup minWidth={50}>
            <span>
              Drag!
            </span>
          </Popup>
        </Marker>
      </Map>
    )
  }
}
