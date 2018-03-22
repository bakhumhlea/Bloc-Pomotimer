import React, { Component } from 'react';
import './TimeCount.css';

class TimeCount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSession: null,
      countTime: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      timerStatus: "standBy",
      onBreak: false
    };
  }

  componentDidMount() {
    this.handleTimeDisplay(this.state.countTime);
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps);
    console.log(this.props);
    //console.log(this.props.currentSessionIndex);

    //console.log(prevProps.currentSessionIndex);
    if(this.props.currentSession!==prevProps.currentSession) {
      console.log("Update Session");
      this.handleTimeDisplay(this.props.currentSession.sessionTime);
      this.setState({
        currentSession:this.props.currentSession,
        countTime:this.props.currentSession.sessionTime
      });
    }
    if(this.props.currentSessionIndex!==prevProps.currentSessionIndex) {
      //console.log("Update Session");
      this.handleTimeDisplay(this.props.currentSession.sessionTime);
      this.setState({
        currentSession:this.props.currentSession,
        countTime:this.props.currentSession.sessionTime
      });
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
    if(this.state.timerStatus==="counting" && this.state.countTime===0) {
      this.props.getBreakSession();
      this.setState({
        timerStatus:"standBy",
        countTime: this.props.currentSession.sessionTime
      });
    }
  }
  handleTimeDisplay(timeInSec) {
    console.log("to string "+timeInSec);
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

  handleTimeDigest(timeInSec) {
    this.hh = Math.floor(timeInSec/3600);
    this.mm = Math.floor((timeInSec%3600)/60);
    this.ss = Math.floor(((timeInSec%3600)%60));
    return this;
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
      countTime: this.props.currentSession.sessionTime
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
    if (this.state.timerStatus==="standBy"){
      return (
        <div className="pomotimer-com">
          <h3 className="time-session">{this.props.currentSession===null?"New Session":this.props.currentSession.sessionName}</h3>
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
          <h3 className="time-session">{this.props.currentSession.sessionName}</h3>
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
      var styles = this.props.currentSession.sessionType!=="break"&&this.state.timerStatus==="counting"?
        { color: "white",
          textShadow: "0 0 10px #ff00de, 0 0 40px #ff00de"}:
          { color: "white",
            textShadow: "0 0 10px red, 0 0 40px red"};
      var addStyles = this.state.timerStatus==="counting"? styles : {color: "white", textShadow: "0 0 20px #ff00de"};
      return (
        <div className="pomotimer-com">
          <h3 className="time-session">{this.props.currentSession.sessionName}</h3>
          <div className="time-count" style={ addStyles }>
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
