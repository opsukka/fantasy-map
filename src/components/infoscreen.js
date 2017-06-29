import React from 'react';

export default class InfoScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
  }

  render() {
    return(
      <div className="active-menu">
        <div className="citymap-container">
          <p></p>
        </div>
        <h1 className="bigText">{this.props.name}</h1>
        <p className="smallText">{this.props.info3}</p>
        <button onClick={this.props.handler} >Close</button>
      </div>
    )
  }
}
