import React from 'react';
//import '../scss/menu.scss';
import data from './markers.json';
import VMap from './lmap';
import InfoScreen from './infoscreen';

import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

class SideMenu extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.createMarker = this.createMarker.bind(this);
		this.createMarkers = this.createMarkers.bind(this);
		this.onOpenChange = this.onOpenChange.bind(this);
		this.getAncestorKeys = this.getAncestorKeys.bind(this);
		this.infoClick = this.infoClick.bind(this);
		this.handler = this.handler.bind(this);
		this.state = {
			condition: false,
			leftVisible: false,
			activeKey: null,
      position: [0, 0],
			current: '1',
    	openKeys: [],
    }
	}

	createMarkers(markers) {
		return (
			markers.map(this.createMarker)
		);
	}

	handleClick(e) {
    this.setState({ current: e.key });
  }

  onOpenChange(openKeys) {
    const state = this.state;
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    this.setState({ openKeys: nextOpenKeys });
  }
  getAncestorKeys(key) {
    const map = {
      sub30: ['sub29'],
    };
    return map[key] || [];
  }

	handler(e) {
		e.preventDefault()
		this.setState({
			activeKey:null
		})
	}

	infoClick(e) {
		this.setState({ activeKey: e });
		console.log('clicked ' + this.state.activeKey);
	}

	createMarker(marker) {
		return (
			<div key={marker.id} className="menu-part" onClick={() => this.setState({ position : marker.position })}>
				<Menu
        mode="inline"
        openKeys={this.state.openKeys}
        selectedKeys={[this.state.current]}
        onOpenChange={this.onOpenChange}
        onClick={this.handleClick}
      	>
					<SubMenu key={marker.key} className="submenu-title" title={marker.children}>
						<Menu.Item key="1" title="info1"><p className="menu-p-h">{marker.info1}</p></Menu.Item>
						<Menu.Item key="2" title="info2"><p className="menu-p">{marker.info2}</p></Menu.Item>
						<Menu.Item key="3" title="moreinfo"><a href="#" className="menu-a" onClick={() => this.infoClick(marker.id)}>More info here</a></Menu.Item>
					</SubMenu>
				</Menu>
				<div key={marker.id} className={this.state.activeKey === marker.id ? "active" : "hidden"} >
					<InfoScreen name={marker.children} info3={marker.info3} handler={this.handler}/>
				</div>
			</div>
		);
	}


	render () {
		return (
			<div>
				<button className="open-button" onClick={ () => this.setState({ isVisible : true }) }><span className="glyphicon glyphicon-arrow-right"></span></button>
 				<div className="menu">
					<div className={this.state.isVisible ? "left" : "hidden-menu"}>
						<div className="Logo">
							<div className="Logo-header">
								<img src={require('../images/logo.png')} className="Logo-logo" alt="logo" />
							</div>
						</div>
						<div className="full-menu" onClick={this.handleClick}>
							{this.createMarkers(data.markers)}
						</div>
						<div className="menu-footer">
							<p>Made by opsukka</p>
							<a href="https://github.com/opsukka/fantasy-map">GitHub repo</a>
						</div>
						<button className="close-button" onClick={ () => this.setState({ isVisible : false }) }><span className="glyphicon glyphicon-arrow-left"></span></button>
					</div>
				</div>
				<VMap position={this.state.position} />
			</div>
		);
	}
}

export default SideMenu;
