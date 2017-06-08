import React from 'react';
import SideMenu from './menu';
import VMap from './lmap';

class App extends React.Component {
	render() {
		return(
			<div>
				<SideMenu />
				<VMap />
			</div>
		)
	}
}
export default App;
