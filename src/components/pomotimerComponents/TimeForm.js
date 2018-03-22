import React, { Component } from 'react';
import './TimeForm.css';

class TimeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session: "",
      hours: null,
      minutes: null,
      seconds: null,
      error: ""
    };
  }
  componentDidMount(){
    this.setState({
      hours: 0,
      minutes: 0,
      seconds: 0,
      error: ""
    });
  }
  componentsDidUpdate(prevProps,prevState) {
    this.setState({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  }
  handleInputSessionName(e) {
    e.preventDefault();
    this.setState({session: e.target.value});
  }
  handleInputHr(e) {
    e.preventDefault();
    console.log(e.target.value);
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
  handleError() {
    this.message = setInterval(()=> {
      this.setState({error: ""});
    }, 3000);
  }

  handleResetForm() {
    this.setState({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  }
  handleSubmit(e,name) {
    e.preventDefault();
    let sessionName = name==="" ? "Work Session" : name ;
    let hourInSec = this.state.hours*60*60;
    let minInSec = this.state.minutes*60;
    let sec = this.state.seconds;
    let sessionTime = hourInSec+minInSec+sec;
    console.log(this.state.hours);
    console.log(sessionTime);
    let noInput = sessionTime===0? true:false;
    this.props.setTime(sessionName,noInput?25*60:sessionTime);
    this.setState({
      hours: 0,
      minutes: 0,
      seconds: 0,
      error: noInput?"Set default session 25 minutes":""
    });
    this.handleError();
    e.target.reset();
  }

  render() {
    return (
      <div className="time-form-template">
        <div>
          <i className="up-arrow fas fa-chevron-up"></i>
        </div>
        <div className="form-error">{this.state.error}</div>
        <form onSubmit={(e,name)=>this.handleSubmit(e,this.state.session)}>
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
