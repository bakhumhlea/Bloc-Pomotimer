import React, { Component } from 'react';
import './TimeCount.css';

class TimeCount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countTime: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      timerStatus: "standBy"
    };
  }

  componentDidMount() {
    //console.log(this.props.currentSessionTime);
    this.handleTimeDisplay(this.props.currentSessionTime);
  }
  componentDidUpdate(prevProps, prevState) {
    //console.log(prevState.timerStatus);
    //console.log(this.state.timerStatus);
    //console.log(this.props.currentSessionTime);
    if(this.props.currentSessionTime !== prevProps.currentSessionTime) {
      this.setState({countTime:this.props.currentSessionTime});
      this.handleTimeDisplay(this.props.currentSessionTime);
    }
    if((this.state.timerStatus!==prevState.timerStatus)&&(this.state.countTime > 0)) {
      switch (this.state.timerStatus) {
        case 'counting':
          this.startTimer();
          break;
        case 'paused':
          clearInterval(this.timer);
          this.timer = undefined;
          break;
        default:
          clearInterval(this.timer);
          break;
      }
    }
    if(this.state.countTime!==prevState.countTime) {
      this.handleTimeDisplay(this.state.countTime);
    }
  }

  handleTimeDisplay(timeInSec) {
    let hours = Math.floor(timeInSec/3600);
    let minutes = Math.floor((timeInSec%3600)/60);
    let seconds = Math.floor(((timeInSec%3600)%60));
    let hh = hours < 10 ? "0"+hours : hours;
    let mm = minutes < 10 ? "0"+minutes : minutes;
    let ss = seconds < 10 ? "0"+seconds : seconds;
    this.setState({
      hours: hh,
      minutes: mm,
      seconds: ss
    });
  }

  handleTimer(e) {
    e.preventDefault();
    if(this.state.timerStatus==="standBy" && this.state.countTime > 0) {
      this.setState({timerStatus:"counting"});
    } else if (this.state.timerStatus==="counting") {
      this.setState({timerStatus:"paused"});
    } else if (this.state.timerStatus==="paused"){
      this.setState({timerStatus:"counting"});
    }
  }
  handleReset(e) {
    e.preventDefault();
    this.setState({
      timerStatus:"standBy",
      countTime: this.props.currentSessionTime
    });
  }

  startTimer() {
    //Note for myself :Remember syntax 'setInterval(function,miliseconds)''
    this.timer = setInterval(()=> {
      var newCount = this.state.countTime - 1;
      this.setState({
        countTime: newCount > 0 ? newCount : 0
      })
    }, 1000);
  }

  render() {
    if(this.state.timerStatus==="standBy"){
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
            <button type="submit" className="time-start-btn"
              onClick={(e)=>this.handleTimer(e)}>Start
            </button>
          </div>
        </div>
      )
    } else if (this.state.timerStatus==="counting" && this.state.countTime===0) {
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
            <button type="submit" className="time-done-btn"
              onClick={(e)=>this.handleReset(e)}>Done
            </button>
          </div>
        </div>
      )
    } else {
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
            <button type="submit" className="time-reset-btn"
              onClick={(e)=>this.handleReset(e)}>Reset
            </button>
            <button type="submit" className="time-pause-btn"
              onClick={(e)=>this.handleTimer(e)}>{this.state.timerStatus==="counting"?"Pause":"Resume"}
            </button>
          </div>
        </div>
      )
    }
  }
}

export default TimeCount;
