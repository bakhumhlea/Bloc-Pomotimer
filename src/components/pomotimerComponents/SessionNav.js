import React, { Component } from 'react';
import './SessionNav.css';

class SessionNav extends Component {
  constructor(props){
    super(props);
    this.state = {
      sessions: null,
      sessionsNav: false,
      currentlyEditSession: null,
      sessionName: "",
      hours: "",
      minutes: "",
      seconds: "",
      popup: false,
      historyNavOpen: false
    };
  }

  componentDidMount(){
    this.setState({sessions:this.props.sessions});
  }

  handleOpenNav(e){
    e.preventDefault();
    var navOpen = this.state.sessionsNav?false:true;
    this.setState({
      sessionsNav: navOpen,
      historyNavOpen: false,
      currentlyEditSession: null
    });
  }

  openEditor(e, prevSession, i) {
    //console.log(prevSession);
    //console.log(i);
    e.preventDefault();
    if(this.props.currentSessionIndex===i&&this.props.timerStatus!=="standBy") {
      return
    }
    var timeDigest = this.handleTimeDigest(prevSession.sessionTime);
    this.setState({
      currentlyEditSession: i,
      sessionName: prevSession.sessionName,
      hours: timeDigest.hh,
      minutes: timeDigest.mm,
      seconds: timeDigest.ss,
    });
  }

  handleTimeDigest(timeInSec) {
    //console.log(timeInSec);
    this.hh = Math.floor(timeInSec/3600);
    this.mm = Math.floor((timeInSec%3600)/60);
    this.ss = Math.floor(((timeInSec%3600)%60));
    return this;
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
  handleSubmit(e, prevSession, i){
    e.preventDefault();
    //console.log(this.state.seconds);
    let sessionName = this.state.sessionName;
    let hourInSec = parseInt(this.state.hours*60*60,10);
    let minInSec = parseInt(this.state.minutes*60,10);
    let sec = parseInt(this.state.seconds,10);
    let totalTimeInSec = parseInt(hourInSec+minInSec+sec,10)===0?25*60:parseInt(hourInSec+minInSec+sec,10);
    //console.log("totalTimeInSec "+totalTimeInSec);
    this.props.saveSession(sessionName,totalTimeInSec,i);
    //console.log(i);
    this.setState({
      currentlyEditSession: null,
      sessionName: null,
      hours: "",
      minutes: "",
      seconds: "",
    });
    e.target.reset();
  }
  handleAddSession(e,session) {
    e.preventDefault();
    this.props.addCompletedToSession(session);
  }
  handleDeleteSession(e,i) {
    e.preventDefault();
    this.props.deleteSession(i);
  }
  handleArrangeButton(e, position, currentIndex) {
    e.preventDefault();
    console.log(position);
    let sessions = this.props.sessions;
    let oldPosition = this.props.currentSessionIndex+currentIndex;
    let newPosition = this.props.currentSessionIndex+currentIndex+position;
    //let mergeSession = sessions[newPosition+position].sessionName===session.sessionName && sessions[newPosition+position].sessionType===session.sessionType?true:false;
    if (position===(-1)) {
      if (currentIndex===0) {
        return
      } else {
        let session = sessions[oldPosition];
        console.log("Just move");
        sessions.splice(oldPosition,1);
        sessions.splice(newPosition,0,session);
      }
      this.props.updateSessions(sessions)
    } else {
      if (currentIndex===sessions.length-1) {
        return
      } else {
        let session = sessions[oldPosition];
        console.log("Just move");
        sessions.splice(oldPosition,1);
        sessions.splice(newPosition,0,session);
      }
      this.props.updateSessions(sessions)
    }
  }
  handleSubButtonActive(e,i) {
    e.preventDefault();
    this.setState({
      subButtonActive: i
    })
  }
  togglePopup(e) {
    e.preventDefault();
    this.setState({
      popup: this.state.popup?false:true
    });
  }
  toggleHistoryNav(e) {
    e.preventDefault();
    console.log(this.state.historyNavOpen);
    console.log("On/Off his nav");
    this.setState({
      historyNavOpen: this.state.historyNavOpen?false:true
    });
  }
  //{color: "white", text-shadow: "rgb(255, 0, 222) 0px 0px 50px, rgb(255, 0, 222) 0px 0px 20px"}
  render() {
    var editSessionActive = this.state.currentlyEditSession;
    var editorActiveStyle = function(i) {
      if(editSessionActive===i){
        return {
          boxShadow: "0 0 10px 2px red, 0 0 40px 2px red, 0 0 20px 2px red inset",
          color: "white",
          opacity: 1,
          textShadow: "red 0px 0px 50px, red 0px 0px 20px",
          border: "2px solid white"
        };
      } else {
        return {boxShadow: "none", opacity:0.5, textShadow:"none"};
      }
    };
    var activeButtonStyle = (i)=>{
      if (this.state.sessions[i].sessionType==="break") {
        console.log("break");
        return {
          boxShadow: "0 0 10px 2px #67ff67, 0 0 40px 2px #67ff67, 0 0 20px 2px #67ff67 inset",
          opacity: 1,
          textShadow: "#67ff67 0px 0px 50px, #67ff67 0px 0px 20px",
          border: "2px solid white",
          color: "white"
        };
      } else {
        console.log("work");
        return {
          boxShadow: "0 0 10px 2px #ff00de, 0 0 40px 2px #ff00de, 0 0 20px 2px #ff00de inset",
          opacity: 1,
          textShadow: "rgb(255, 0, 222) 0px 0px 50px, rgb(255, 0, 222) 0px 0px 20px"
        };
      }
    }
    let upcommingSessions = this.props.sessions.slice(this.props.currentSessionIndex);
    return (
      <div className="session-nav" style={this.state.sessionsNav?{left:0}:{left:"-262px"}}>
        <h3>
          {this.state.historyNavOpen?
            <span className="fas fa-bars" onClick={(e)=>this.toggleHistoryNav(e)}></span>:
            <span className="fas fa-history" onClick={(e)=>this.toggleHistoryNav(e)}></span>
          }
        </h3>
          <div className="session-history" style={this.state.historyNavOpen?{opacity:0.9,bottom:"60px"}:{opacity:0,bottom:"-360px"}}>
            <h4>Completed Sessions</h4>
            <div className="session-history-item">
              {this.props.history.length===0?(<span id="no-history"><small>No complete session</small></span>):this.props.history.map((hisSes,hisIndex)=>
                <div className="session-complete">
                  <span id="his-item-name">{hisSes.sessionName}</span>
                  <span id="history-add-btn" onClick={(e,session)=>this.handleAddSession(e,hisSes)} className="fas fa-plus"></span><br/>
                  <span id="his-item-time">{this.handleTimeString(hisSes.sessionTime)}</span>
                </div>
              )}
            </div>
          </div>
          <div className="session-button-all">
          {upcommingSessions.map((session,index)=>
            <div
              className={session.sessionType==="work"?"session-button work":"session-button break"}
              key={index}
              onMouseEnter={(e,i)=>this.handleSubButtonActive(e,index)}
              onMouseLeave={(e,i)=>this.handleSubButtonActive(e,null)}
              style={this.props.currentSessionIndex===index+this.props.currentSessionIndex?activeButtonStyle(index+this.props.currentSessionIndex):editorActiveStyle(index)}
            >
              <h4 className="session-name">
                <div className="session-arrange-btn"  style={this.state.subButtonActive===index?{opacity:0.9}:{opacity:0}}>
                  <span className="fas fa-caret-up" onClick={(e,position,currentIndex)=>this.handleArrangeButton(e,(-1),index)}></span><br/>
                  <span className="fas fa-caret-down" onClick={(e,position,currentIndex)=>this.handleArrangeButton(e,1,index)}></span>
                </div>
                <strong>{session.sessionName}</strong>
                <div className="session-delete-btn"  style={this.state.subButtonActive===index?{opacity:0.9}:{opacity:0}}>
                  <span className="fas fa-minus-circle" onClick={(e,i)=>this.handleDeleteSession(e,index+this.props.currentSessionIndex)}></span>
                </div>
              </h4>
              <h5 className="session-time">{this.handleTimeString(session.sessionTime)}
                {this.state.currentlyEditSession===index?
                  <span id={index} className="fas fa-times-circle" onClick={(e,object,i)=>this.openEditor(e,session,null)}></span>
                  :
                  <span id={index} className="fas fa-pen-square" onClick={(e,object,i)=>this.openEditor(e,session,index)}></span>
                }

              </h5>
              <div className="session-editor" style={this.state.currentlyEditSession===index?{display:"block"}:{display:"none",border:"none"}}>
                <form onSubmit={(e,prevSession,i)=>this.handleSubmit(e,session,this.props.currentSessionIndex+index)} >
                  <input type="text" className="session-name" alt="session-name" placeholder={this.state.sessionName}
                    onChange={(e)=>this.handleInputSessionName(e)} />
                  <input type="number" className="session-num" alt="hours" placeholder={this.state.hours<10?"0"+this.state.hours:this.state.hours} min="0" max="99"
                    onChange={(e)=>this.handleInputHr(e)} />
                  <input type="number" className="session-num" alt="minutes" placeholder={this.state.minutes<10?"0"+this.state.minutes:this.state.minutes} min="0" max="59"
                    onChange={(e)=>this.handleInputMin(e)} />
                  <input type="number" className="session-num" alt="seconds" placeholder={this.state.seconds<10?"0"+this.state.seconds:this.state.seconds} min="0" max="59"
                    onChange={(e)=>this.handleInputSec(e)} />
                  <button type="submit" className="session-save" alt="save"
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
          )}
          </div>
        <div className="session-nav-btn"
          onClick={(e)=>this.handleOpenNav(e)}
          onMouseEnter={(e)=>this.togglePopup(e)}
          onMouseLeave={(e)=>this.togglePopup(e)}
        >
          <span className="fas fa-chevron-left"></span>
          <div className="session-nav-btn-popup" style={this.state.popup&&!this.state.sessionsNav?{display:"block"}:{display:"none"}}>Session Config</div>
        </div>
        <div className="delete-all-btn">{this.props.sessions.length>0?(<span className="fas fa-trash" onClick={(e)=>this.props.deleteAllSessions(e)}></span>):(<h4>No Session</h4>)}</div>
      </div>
    )
  }
}

export default SessionNav;
