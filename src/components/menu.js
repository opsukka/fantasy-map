import React from 'react';
import '../scss/menu.scss';
import data from './markers.json';
import VMap from './lmap';
import InfoScreen from './cityinfo';

// import Menu, { SubMenu, Item as MenuItem } from 'rc-menu';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

class SideMenu extends React.Component {
	constructor(props) {
		super(props);
		this.showLeft = this.showLeft.bind(this);
		this.hideLeft = this.hideLeft.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.createMarker = this.createMarker.bind(this);
		this.createMarkers = this.createMarkers.bind(this);
		this.onOpenChange = this.onOpenChange.bind(this);
		this.getAncestorKeys = this.getAncestorKeys.bind(this);
		this.state = {
			leftVisible: false,
			infoVisible: false,
      position: [0, 0],
			current: '1',
    	openKeys: [],
    }
	}

	showLeft() {
		this.refs.left.show();
		this.setState({ leftVisible: true });
	}

	hideLeft() {
		this.refs.left.hide();
		this.setState({ leftVisible: false });
	}

	handleClick() {
		console.log(this.state.position);
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
      sub11: ['sub10'],
    };
    return map[key] || [];
  }

	createMarker(marker) {
		return (
			<div className="menu-part" onClick={() => this.setState({ position : marker.position })}>
				<Menu
        mode="inline"
        openKeys={this.state.openKeys}
        selectedKeys={[this.state.current]}
        onOpenChange={this.onOpenChange}
        onClick={this.handleClick}
      	>
					<SubMenu key={marker.key} className="submenu-title" title={marker.children}>
						<Menu.Item key="1" title="info1"><p className="menu-p">{marker.info1}</p></Menu.Item>
						<Menu.Item key="2" title="info2"><p className="menu-p">{marker.info2}</p></Menu.Item>
						<Menu.Item key="3" title="More-info"><span>More Info</span></Menu.Item>
					</SubMenu>
				</Menu>
			</div>
		);
	}


	render () {
		return (
			<div>
				<InfoScreen />
				<button className="open-menu" onClick={this.showLeft}>Menu</button>
 				<Menur ref="left" alignment="left">
					<div className="SideMenu">
						<div className="SideMenu-header">
							<img src={require('../logo.png')} className="SideMenu-logo" alt="logo" />
						</div>
					</div>
					<button onClick={this.hideLeft}>Hide menu</button>
					<div className="full-menu" onClick={this.handleClick}>
						{this.createMarkers(data.markers)}
					</div>
				</Menur>
				<VMap position={this.state.position} />
			</div>
		);
	}
}

class Menur extends React.Component {
	constructor(props) {
		super(props);
		this.state = { visible: false };
		this.show = this.show.bind(this);
		this.hide = this.hide.bind(this);
		this.isVisible = this.isVisible.bind(this);
	}

	show() {
		this.setState({ visible: true });
	}

	hide() {
		this.setState({ visible: false });
	}

	isVisible() {
		return `${this.state.visible ? 'visible' : ''} ${this.props.alignment}`
	}

	render() {
		return (
			<div className='menu'>
				<div className={this.isVisible()}>
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default SideMenu;
