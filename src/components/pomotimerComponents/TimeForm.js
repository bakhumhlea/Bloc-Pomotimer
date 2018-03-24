import React, { Component } from 'react';
import './TimeForm.css';

class TimeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session: "",
      hours: "",
      minutes: "",
      seconds: "",
      error: ""
    };
  }
  componentDidMount(){
    this.setState({
      hours: "",
      minutes: "",
      seconds: "",
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
    this.setState({hours: e.target.value});
  }
  handleInputMin(e) {
    e.preventDefault();
    this.setState({minutes: e.target.value});
  }
  handleInputSec(e) {
    console.log("handleInputSec Trigger");
    e.preventDefault();
    this.setState({seconds: e.target.value});
  }
  handleError() {
    this.message = setInterval(()=> {
      this.setState({error: ""});
    }, 3000);
  }
  handleSubmit(e,name) {
    e.preventDefault();
    let sessionName = name==="" ? "Work Session" : name ;
    let hourInSec = isNaN(this.state.hours)?0:this.state.hours*60*60;
    let minInSec = isNaN(this.state.minutes)?0:this.state.minutes*60;
    let sec = isNaN(this.state.seconds)?0:this.state.seconds;
    let sessionTime = parseInt(hourInSec+minInSec+sec,10);
    //console.log(this.state.hours);
    console.log(hourInSec+minInSec+sec);
    this.props.setTime(sessionName,sessionTime===0?25*60:sessionTime);
    this.setState({
      session: "",
      hours: "",
      minutes: "",
      seconds: "",
      error: sessionTime===0?"Set default session 25 minutes":""
    });
    this.handleError();
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
            value={this.state.session}
            onChange={(e)=>this.handleInputSessionName(e)} />
          <input type="number" className="form-input-num" alt="hours" placeholder="h"
            min="0" max="99" value={this.state.hours}
            onChange={(e)=>this.handleInputHr(e)} />
          <input type="number" className="form-input-num" alt="minutes" placeholder="m"
            min="0" max="59" value={this.state.minutes}
            onChange={(e)=>this.handleInputMin(e)} />
          <input type="number" className="form-input-num" alt="seconds" placeholder="s"
            min="0" max="59" value={this.state.seconds}
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
