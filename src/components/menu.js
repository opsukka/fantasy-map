import React from 'react';
import '../scss/menu.scss';
import data from './markers.json';

class SideMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = { leftVisible: false };
		this.showLeft = this.showLeft.bind(this);
		this.hideLeft = this.hideLeft.bind(this);
		this.handleClick = this.handleClick.bind(this);
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
		console.log(this);
	}

	createMarkers(markers) {
		return markers.map(this.createMarker);
	}

	createMarker(marker) {
		return <p>{marker.children}</p>;
	}

	movePos() {

	}

	render () {
		return (
			<div>
				<button onClick={this.showLeft}>Menu</button>
 				<Menu ref="left" alignment="left">
					<div className="SideMenu">
						<div className="SideMenu-header">
							<img src={require('../logo.png')} className="SideMenu-logo" alt="logo" />
						</div>
					</div>
					<button onClick={this.hideLeft}>hide menu</button>
						<div onClick={this.handleClick}>
							{this.createMarkers(data.markers)}
						</div>
				</Menu>
			</div>
		);
	}
}

class Menu extends React.Component {
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
