import React, { Component } from 'react';
import './TimeCount.css';
import Sound from 'react-sound';

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
      onBreak: false,
      soundStatus: Sound.status.PAUSED
    };
    this.soundFiles = [
      { url: "http://samplearena.com/cdrom/sa1/brass/16_brass_hook/brass_hook_demo.mp3",
        title: "Brass",
        duration: 0.26 }
    ];
  }

  componentDidMount() {
    if(this.props.currentSession===null) {
      console.log("Start session");
      this.handleTimeDisplay(this.state.countTime);
      this.handleSoundStatus();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.currentSession!==prevProps.currentSession&&this.props.currentSession!==null) {
      console.log("currentSession changed");
      this.handleTimeDisplay(this.props.currentSession.sessionTime);
      this.setState({
        currentSession:this.props.currentSession,
        countTime:this.props.currentSession.sessionTime
      });
    }
    if(this.props.currentSessionIndex!==prevProps.currentSessionIndex) {
      console.log("currentSessionIndex changed");
      //console.log(this.state.countTime);
      this.handleTimeDisplay(this.props.currentSession.sessionTime);
      this.setState({
        currentSession:this.props.currentSession,
        countTime:this.props.currentSession.sessionTime
      });
    }
    if((this.state.timerStatus!==prevState.timerStatus)&&(this.state.countTime > 0)) {
      console.log("timerStatus changed");
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
      console.log("countTime changed"+this.state.countTime);
      this.handleTimeDisplay(this.state.countTime);
    }
    if(this.state.timerStatus==="counting" && this.state.countTime===0) {
      console.log("time done!");
      this.props.getBreakSession();
      this.setState({
        timerStatus:"standBy",
        countTime: this.props.currentSession.sessionTime,
        soundStatus: Sound.status.PLAYING
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.timerStatus==="standBy"&&nextProps.sessions.length!==0) {
      //this.handleTimeDisplay(nextProps.currentSession.sessionTime);
      this.handleTimeDisplay(nextProps.currentSession.sessionTime);
      this.setState({
        currentSession:nextProps.currentSession,
        countTime:nextProps.currentSession.sessionTime,
        soundStatus: Sound.status.STOPPED
      });
    } else {
      this.setState({
        timerStatus: "standBy",
        hours: "00",
        minutes: "00",
        seconds: "00"
      });
    }
  }

  handleTimeDisplay(timeInSec) {
    //console.log(this.state.soundStatus);
    //console.log("to string "+timeInSec);
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
      this.handleSoundStatus();
      this.setState({timerStatus:"counting",soundStatus:Sound.status.PAUSED});
    } else if (this.state.timerStatus==="counting") {
      this.handleSoundStatus();
      this.setState({timerStatus:"paused"});
    } else if (this.state.timerStatus==="paused"){
      this.handleSoundStatus();
      this.setState({timerStatus:"counting"});
    }
  }
  handleReset(e) {
    if(e) {
      e.preventDefault();
    }
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
      });
    }, 1000);
  }

  handleSoundStatus() {
    if(this.state.soundStatus==="PLAYING") {
      this.setState({
        soundStatus: Sound.status.STOPPED
      });
    }
  }

  render() {
      var styles = ()=> {
        if (this.state.timerStatus==="standBy") {
          return {color: "white"};
        } else if (this.props.currentSession.sessionType==="break"&&this.state.timerStatus==="counting") {
          return {
            color: "white",
            textShadow: "0 0 10px red, 0 0 40px red"
          };
        } else {
          return {
            color: "white",
            textShadow: "0 0 10px #ff00de, 0 0 40px #ff00de"
          };
        }
      };
      var button = ()=>{
        if (this.state.timerStatus==="standBy") {
          var soundPlaying = (<span className="fas fa-music"></span>);
          return (
            <div className="time-status">
              <button type="submit" className="time-start-btn" onClick={(e)=>this.handleTimer(e)}>{this.state.soundStatus==="PLAYING"?soundPlaying:"Start"}</button>
            </div>
          );
        } else if (this.state.timerStatus==="counting" && this.state.countTime===0) {
          return (
            <div className="time-status">
              <button type="submit" className="time-done-btn" onClick={(e)=>this.handleReset(e)}>Done</button>
            </div>
          );
        } else {
          return (
            <div className="time-status">
              <button type="submit" className="time-reset-btn" onClick={(e)=>this.handleReset(e)}>Reset</button>
              <button type="submit" className="time-pause-btn" onClick={(e)=>this.handleTimer(e)}>{this.state.timerStatus==="counting"?"Pause":"Resume"}</button>
            </div>
          );
        }
      };
      return (
        <div className="pomotimer-com">
          <Sound
            url={this.soundFiles[0].url}
            playStatus={this.state.soundStatus}
            playFromPosition={0 /* in milliseconds */}
            onFinishedPlaying={()=>this.handleSoundStatus()}
          />
          <audio id="myTune" src="Vitas-7th-Element.mp3"></audio>
          <h3 className="time-session">{this.props.currentSession===null?"New Session":this.props.currentSession.sessionName}</h3>
          <div className="time-count" style={ styles() }>
            <span className="time-digit">{this.state.hours}</span>
            <span className="time-digit">:</span>
            <span className="time-digit">{this.state.minutes}</span>
            <span className="time-digit">:</span>
            <span className="time-digit">{this.state.seconds}</span>
          </div>
            {button()}
        </div>
      )

  }
}

export default TimeCount;
