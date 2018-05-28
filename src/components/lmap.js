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

var myIcon = L.icon({
  iconUrl: '../marker-icon.png',
  iconSize: [26, 41]
});

const MyMarkersList = ({ markers }) => {
  const items = markers.map(({ key, position, children }) => (
    <MyPopupMarker key={key} position={position} icon={L.icon} children={children} />
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
    this.refmarker = React.createRef(),
    this.state = {
      center: [0, 0],
      players: [55, -108.65],
      zoom: 4,
    }
  }

  updatePosition = () => {
    const { lat, lng } = this.refmarker.current.leafletElement.getLatLng()
    this.setState({
      marker: { lat, lng },
    })
    //this.refmarker.current.leafletElement.getPopup().setContent('Clicked ' + this.refmarker.current.leafletElement.getLatLng())
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
        animate={true}>
        <panTo />
        <TileLayer
          maxZoom={5}
          minZoom={2}
          noWrap={true}
          attribution="&amp;copy <a href=&quot;https://github.com/opsukka&quot;>Zukop</a> contributors"
          url="http://oskumaptiles.s3-website.eu-west-3.amazonaws.com/{z}/{x}/{y}.png"
        />
      <ZoomControl position="topright" />
        <Marker
          draggable={true}
          onDragend={this.updatePosition}
          ref={this.refmarker}>
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
