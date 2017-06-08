import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup, ZoomControl, PropTypes as MapPropTypes } from 'react-leaflet';
import L from 'leaflet';


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
    this.state = {
      lat: 0,
      lng: 0,
      zoom: 4,
    }
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    const playerpos = [15, -4.5]

    const markers = [
      { key: 'marker1', position: [11, -4.5], children: 'Yralo' },
      { key: 'marker2', position: [20, 37.82], children: 'Kose' },
      { key: 'marker4', position: [45, 21.73], children: 'Oxul' },
      { key: 'marker5', position: [56.8, -49], children: 'Zramita' },
      { key: 'marker6', position: [55.5, -108.65], children: 'Zayok' },
    ]

    return (
      <Map zoomControl={false} center={position} zoom={this.state.zoom} maxZoom={5} minZoom={2}>
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
          position={playerpos}
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
