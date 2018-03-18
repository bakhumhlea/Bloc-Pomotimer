import React, { Component } from 'react';
import TimeCount from './pomotimerComponents/TimeCount';
import TimeForm from './pomotimerComponents/TimeForm';
//import './Pomotimer.css';

class Pomotimer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sessions: "New Session",
      timeCount : 0,
      timeStatus : 'Start'
    };
  }

  setTime(e, name, h, m, s) {
    console.log(h + m + s);
    e.preventDefault();
    let sessionName = name == "" ? "Unnamed Session" : name ;
    let hourInMilSec = parseInt(h*60*60*1000,10);
    let minInMilSec = parseInt(m*60*1000,10);
    let milSec = parseInt(s*1000,10);
    this.setState({
      sessions: sessionName,
      timeCount: (hourInMilSec+minInMilSec+milSec)
    });
  }

  render() {
    return (
      <div>
        <TimeCount
          sessions = {this.state.sessions}
          timeCount = {this.state.timeCount}
          timeStatus = {this.state.timeStatus}
        />
        <TimeForm
          setTime={(e,name,h,m,s)=>this.setTime(e,name,h,m,s)}
          />
      </div>
    )
  }

}

export default Pomotimer;
