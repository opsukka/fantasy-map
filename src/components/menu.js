import React from 'react';
import '../scss/menu.scss';
import VMap from './lmap';

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
		if (this.state.leftVisible) {
			this.hideLeft();
		}
	}

	render () {
		return (
			<div onClick={this.handleClick}>
				<button onClick={this.showLeft}>Menu</button>
 				<Menu ref="left" alignment="left">
					<div className="SideMenu">
						<div className="SideMenu-header">
							<img src={require('../logo.png')} className="SideMenu-logo" alt="logo" />
						</div>
					</div>
					<button onClick={this.hideLeft}>Hide menu</button>
					<MenuItem>City A</MenuItem>
					<MenuItem>City B</MenuItem>
					<MenuItem>City C</MenuItem>
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

const MenuItem = ({markers}) =>
	<p>{VMap.children}</p>;

export default SideMenu;
