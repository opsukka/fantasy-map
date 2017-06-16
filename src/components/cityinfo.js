import React from 'react';

export default class InfoScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      visible: false,
    };
  }


  render() {
    return(
      <div className="visible.infoscreen">
        <div className="full-info-menu">
          <div className="info-menu">
          </div>
        </div>
      </div>
    )
  }
}
