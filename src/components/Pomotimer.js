import React, { Component } from 'react';
import TimeCount from './pomotimerComponents/TimeCount';
import TimeForm from './pomotimerComponents/TimeForm';
//import './Pomotimer.css';

class Pomotimer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sessions: "New Session",
      currentSessionTime: 0,
    };
  }

  setTime(name, time) {
    console.log(time);
    this.setState({
      sessions: name,
      currentSessionTime: time,
    });
  }

  render() {
    return (
      <div>
        <TimeCount
          sessions = {this.state.sessions}
          currentSessionTime = {this.state.currentSessionTime}
        />
        <TimeForm
          setTime = {(name,time)=>this.setTime(name,time)}
          />
      </div>
    )
  }

}

export default Pomotimer;
