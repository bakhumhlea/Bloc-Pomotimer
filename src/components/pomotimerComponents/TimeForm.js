import React, { Component } from 'react';
import './TimeForm.css';

class TimeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session: "",
      hours: 0,
      minutes: 0,
      seconds: 0
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

  render() {
    return (
      <div className="time-form-template">
        <div>
          <i className="up-arrow fas fa-chevron-up"></i>
        </div>
        <form onSubmit={(e,name,h,m,s)=>this.props.setTime(e,this.state.session,this.state.hours,this.state.minutes,this.state.seconds)}>
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
