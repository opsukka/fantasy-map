import React from 'react';
import SideMenu from './menu';
import VMap from './lmap';

class App extends React.Component {

	constructor(props) {
		super()
		const markers = [
      { key: 'marker1', position: [11, -4.5], children: 'Yralo' },
      { key: 'marker2', position: [20, 37.82], children: 'Kose' },
      { key: 'marker4', position: [45, 21.73], children: 'Oxul' },
      { key: 'marker5', position: [56.8, -49], children: 'Zramita' },
      { key: 'marker6', position: [55.5, -108.65], children: 'Zayok' },
    ]
	}

	render() {
		return(
			<div>
				<SideMenu markers={this.markers}/>
				<VMap />
			</div>
		)
	}
}
export default App;
