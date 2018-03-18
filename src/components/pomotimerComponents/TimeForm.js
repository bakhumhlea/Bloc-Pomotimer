import React, { Component } from 'react';
import './TimeForm.css';

class TimeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session: "",
      hours: 0,
      minutes: 0,
      seconds: 0,
      error: ""
    };
  }
  handleInputSessionName(e) {
    e.preventDefault();
    this.setState({session: e.target.value});
  }
  handleInputHr(e) {
    e.preventDefault();
    this.setState({hours: e.target.value});
  }
  handleInputMin(e) {
    e.preventDefault();
    this.setState({minutes: e.target.value});
  }
  handleInputSec(e) {
    e.preventDefault();
    this.setState({seconds: e.target.value});
  }
  handleSubmit(e,name,h,m,s) {
    e.preventDefault();
    let sessionName = name==="" ? "Unnamed Session" : name ;
    let hourInSec = parseInt(h*60*60,10);
    let minInSec = parseInt(m*60,10);
    let sec = parseInt(s,10);
    let sessionTime = hourInSec+minInSec+sec;
    if((sessionTime) > 0) {
      this.props.setTime(sessionName,sessionTime);
      this.setState({
        hours: 0,
        minutes: 0,
        seconds: 0,
        error: ""
      });
      e.target.reset();
    } else {
      this.setState({error:"Please set the Timer!"})
    }

  }

  render() {
    return (
      <div className="time-form-template">
        <div>
          <i className="up-arrow fas fa-chevron-up"></i>
        </div>
        <div className="form-error">{this.state.error}</div>
        <form onSubmit={(e,name,h,m,s)=>this.handleSubmit(e,this.state.session,this.state.hours,this.state.minutes,this.state.seconds)}>
          <input type="text" className="form-input-text" alt="session-name" placeholder="Session Name"
            onChange={(e)=>this.handleInputSessionName(e)} />
          <input type="number" className="form-input-num" alt="hours" placeholder="h"
            min="0" max="99"
            onChange={(e)=>this.handleInputHr(e)} />
          <input type="number" className="form-input-num" alt="minutes" placeholder="m"
            min="0" max="59"
            onChange={(e)=>this.handleInputMin(e)} />
          <input type="number" className="form-input-num" alt="seconds" placeholder="s"
            min="0" max="59"
            onChange={(e)=>this.handleInputSec(e)} />
          <button type="submit" className="form-btn" alt="submit-form">
            Create Session
          </button>
        </form>
      </div>
    )
  }
}

export default TimeForm;
