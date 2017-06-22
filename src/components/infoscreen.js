import React from 'react';

export default class InfoScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      infoVisible: false,
    };
  }

  render() {
    return(
      <div key={this.props.id} className="infoscreen">
        <div className="info-menu">
          <h1>{this.props.name}</h1>
          <p>{this.props.info2}</p>
        </div>
      </div>
    )
  }
}
