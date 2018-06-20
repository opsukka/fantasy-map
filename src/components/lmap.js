import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup, ZoomControl, PropTypes as MapPropTypes } from 'react-leaflet';
import L from 'leaflet';

import { db } from '../firebase/firebase.js';

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
  return <div style={{ display: 'none',}}>{items}</div>
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
      players: [0, 0],
      zoom: 4,
    }
  }

  componentDidMount() {
		db.ref().child(`position/players`).on('value', snap => {
			this.setState({
        players: snap.val()
      });
		});
	}

  updatePosition = () => {
    const { lat, lng } = this.refmarker.current.leafletElement.getLatLng()
    db.ref().child(`position/players`).set({
      lat, lng
    })
    // this.setState({
    //   marker: { lat, lng },
    // })
    this.refmarker.current.leafletElement.getPopup().setContent('Clicked ' + this.refmarker.current.leafletElement.getLatLng())
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
          url="https://firebasestorage.googleapis.com/v0/b/fantasy-map.appspot.com/o/valcia%2F{z}%2F{x}%2F{y}.png?alt=media"
        />
      <ZoomControl position="topright" />
        <Marker
          draggable={true}
          onDragend={this.updatePosition}
          position={this.state.players}
          ref={this.refmarker}>
          <Popup minWidth={50}>
            <span>
              Players
            </span>
          </Popup>
        </Marker>
        <MyMarkersList markers={ markers } />
      </Map>
    )
  }
}
