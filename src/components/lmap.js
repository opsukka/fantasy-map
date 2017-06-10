import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup, ZoomControl, PropTypes as MapPropTypes } from 'react-leaflet';
import L from 'leaflet';

import data from './markers.json';


const MyPopupMarker = ({ children, position }) => (
  <Marker position={position}>
    <Popup>
      <span>{children}</span>
    </Popup>
  </Marker>
)
MyPopupMarker.propTypes = {
  children: MapPropTypes.children,
  position: MapPropTypes.latlng,
}

const MyMarkersList = ({ markers }) => {
  const items = markers.map(({ key, position, children }) => (
    <MyPopupMarker key={key} position={position} children={children} />
  ))
  return <div style={{ display: 'none' }}>{items}</div>
}
MyMarkersList.propTypes = {
  markers: PropTypes.array.isRequired,
}

export default class VMap extends React.Component {

  constructor(props) {
    super(props);
    animate: true,
    this.state = {
      center: [0, 0],
      players: [15, -7.5],
      zoom: 4,
    }
    console.log(this.props.position);
  }
  
  render() {
    const markers = data.markers
    const view = this.props.position
    return (
      <Map
        zoomControl={false}
        center={view}
        zoom={this.state.zoom}
        maxZoom={5}
        minZoom={2}
        length={10}
        animate={this.state.animate}>
        map.panTo(new L.LatLng(view));
        <TileLayer
          maxZoom={5}
          minZoom={2}
          noWrap={true}
          attribution="&amp;copy <a href=&quot;https://github.com/opsukka&quot;>Zukop</a> contributors"
          url="./maps/kartta/{z}/{x}/{y}.png"
        />
      <ZoomControl position="topright" />
        <Marker
          draggable={true}
          position={this.state.players}
          ref="players">
          <Popup minWidth={50}>
            <span>
              Players
            </span>
          </Popup>
        </Marker>
        <MyMarkersList markers={markers} />
      </Map>
    )
  }
}
