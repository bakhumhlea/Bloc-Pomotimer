import React, { Component } from 'react';
import './TimeCount.css';

class TimeCount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      minutes: 9,
      seconds: 23,
    };
  }

  componentDidMount() {
    console.log(this.props.timeCount);
    this.handleTimeDisplay(this.props.timeCount);
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.timeCount);
    if(this.props.timeCount !== nextProps.timeCount) {
      this.handleTimeDisplay(nextProps.timeCount);
    }
  }

  handleTimeDisplay(timeInMilSec) {
    let hours = Math.floor(timeInMilSec/3600000);
    let minutes = Math.floor((timeInMilSec%3600000)/60000);
    let seconds = Math.floor(((timeInMilSec%3600000)%60000)/1000);
    let hh = hours < 10 ? "0"+hours : hours;
    let mm = minutes < 10 ? "0"+minutes : minutes;
    let ss = seconds < 10 ? "0"+seconds : seconds;
    this.setState({
      hours: hh,
      minutes: mm,
      seconds: ss
    });
  }

  render() {
    return (
      <div className="pomotimer-com">
        <h3 className="time-session">{this.props.sessions}</h3>
        <div className="time-count">
          <span className="time-digit">{this.state.hours}</span>
          <span className="time-digit">:</span>
          <span className="time-digit">{this.state.minutes}</span>
          <span className="time-digit">:</span>
          <span className="time-digit">{this.state.seconds}</span>
        </div>
        <div className="time-status">
          <button type="submit" className="time-start-btn">{this.props.timeStatus}</button>
        </div>
      </div>
    )
  }
}

export default TimeCount;
