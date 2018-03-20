import React, { Component } from 'react';
import './SessionNav.css';

class SessionNav extends Component {
  constructor(props){
    super(props);
    this.state = {
      sessions: null,
      sessionsNav: false,
      editor: false,
      sessionName: "",
      oldTimeValue: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  componentDidMount(){
    this.setState({sessions:this.props.sessions});
  }

  handleTimeString(timeInSec) {
    let hours = Math.floor(timeInSec/3600);
    let minutes = Math.floor((timeInSec%3600)/60);
    let seconds = Math.floor(((timeInSec%3600)%60));
    let string = [];
    if(hours > 0){
      let hStr = hours > 1? hours+" hrs":hours+" hr";
      string.push(hStr);
    }
    if (minutes > 0) {
      let mStr = minutes+" min";
      string.push(mStr);
    }
    if (seconds > 0) {
      let sStr = seconds+" sec";
      string.push(sStr);
    }
    return string.join(" ");
  }
  handleOpenNav(e){
    e.preventDefault();
    var boolean = this.state.sessionsNav?false:true;
    this.setState({sessionsNav: boolean});
  }
  openEditor(e, session) {
    e.preventDefault();
    this.setState({
      sessionName: session.sessionName,
      oldTimeValue: session.sessionTime,
      editor:this.state.editor?false:true,
    });
  }
  handleInputSessionName(e) {
    e.preventDefault();
    this.setState({sessionName: e.target.value});
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
  handleSubmit(e,index){
    e.preventDefault();
    let sessionName = this.state.sessionName;
    let hourInSec = parseInt(this.state.hours*60*60,10);
    let minInSec = parseInt(this.state.minutes*60,10);
    let sec = parseInt(this.state.seconds,10);
    let time = hourInSec+minInSec+sec===0 ? this.state.oldTimeValue : hourInSec+minInSec+sec;
    this.props.saveSession(sessionName,time,index);
    this.setState({
      sessionName: "",
      oldTimeValue: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      editor:false
    });
  }
  render() {
    var name = this.state.sessionName;
    return (
      <div className="session-nav" style={this.state.sessionsNav?{left:0}:{left:"-202px"}}>
        <h3><span className="fas fa-bars"></span></h3>
          <div className="session-button-all">
          {this.props.sessions.map((session,index)=>
            <div
              className="session-button"
              key={index}
              style={this.props.currentSessionIndex===index?{boxShadow: "0 0 10px 2px #ff00de, 0 0 40px 2px #ff00de"}:{boxShadow: "none"}}
            >
                <h4 className="session-name" style={session.sessionType==="break"?{color:"green"}:{color:"black"}}><strong>{session.sessionName}</strong></h4>
                <small style={session.sessionType==="break"?{color:"green"}:{color:"black"}}>{this.handleTimeString(session.sessionTime)} <span className="fas fa-pen-square" onClick={(e)=>this.openEditor(e,session)}></span></small>
                <div className="session-editor" style={this.state.editor?{display:"block"}:{display:"none"}}>
                  <input type="text" className="session-name" alt="session-name" placeholder={name}
                    onChange={(e)=>this.handleInputSessionName(e)} />
                  <input type="number" className="session-num" alt="hours" placeholder="h" min="0" max="99"
                    onChange={(e)=>this.handleInputHr(e)} />
                  <input type="number" className="session-num" alt="minutes" placeholder="m" min="0" max="59"
                    onChange={(e)=>this.handleInputMin(e)} />
                  <input type="number" className="session-num" alt="seconds" placeholder="s" min="0" max="59"
                    onChange={(e)=>this.handleInputSec(e)} />
                  <button onClick={(e,i)=>this.handleSubmit(e,index)}  type="submit" className="session-save" alt="save">
                    Save
                  </button>
                </div>
            </div>
          )}
          </div>
        <div className="session-pop-btn" onClick={(e)=>this.handleOpenNav(e)}><span className="fas fa-chevron-left"></span></div>
        <p className="App-version">v0.23</p>
      </div>
    )
  }
}

export default SessionNav;
