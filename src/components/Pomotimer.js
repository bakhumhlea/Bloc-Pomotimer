import React, { Component } from 'react';
import TimeCount from './pomotimerComponents/TimeCount';
import TimeForm from './pomotimerComponents/TimeForm';
import SessionNav from './pomotimerComponents/SessionNav';
//import './Pomotimer.css';

class Pomotimer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sessions: [],
      currentSession: null,
      currentSessionIndex: null,
      onBreak: false
    };
  }

  setTime(name, time) {
    console.log("Create "+name+" "+time+"sec");
    var sessions = this.state.sessions;
    var newSession = {sessionName:name,sessionTime:time,sessionType:"work"};
    var breakSession = {sessionName:"Break",sessionTime:300,sessionType:"break"};
    if(sessions.length > 0 && sessions[sessions.length-1].sessionType !== "break"){
      sessions.push(breakSession, newSession);
    } else {
      sessions.push(newSession);
    }
    if(this.state.currentSession === null) {
      this.setState({
        sessions: sessions,
        currentSession: {sessionName:name,sessionTime:time,sessionType:"work"},
        currentSessionIndex: 0
      });
    } else {
      this.setState({
        sessions: sessions,
      });
    }
  }

  getBreakSession() {
    console.log(this.state.sessions.length);
    if (this.state.currentSessionIndex===this.state.sessions.length-1){
      return
    } else {
      var nextIndex = this.state.currentSessionIndex+1;
      if (this.state.sessions[nextIndex].sessionType==="break") {
        console.log(nextIndex+"first");
        this.setState({
          currentSession: this.state.sessions[nextIndex],
          currentSessionIndex: nextIndex,
          onBreak: true
        });
      } else {
        console.log(nextIndex+"second");
        this.setState({
          currentSession: this.state.sessions[nextIndex],
          currentSessionIndex: nextIndex,
          onBreak: false
        });
      }
    }
  }
  saveSession(name,time,i){
    let sessions = this.state.sessions;
    console.log(i);
    console.log(sessions[i].sessionName);
    sessions[i].sessionName = name;
    sessions[i].sessionTime = time;
    this.setState({sessions:sessions});
  }

  render() {
    return (
      <div>
        <TimeCount
          currentSession = {this.state.currentSession}
          getBreakSession = {()=>this.getBreakSession()}
        />
        <TimeForm
          setTime = {(name,time)=>this.setTime(name,time)}
        />
        <SessionNav
          sessions = {this.state.sessions}
          currentSessionIndex= {this.state.currentSessionIndex}
          saveSession = {(name,time,i)=>this.saveSession(name,time,i)}
        />
      </div>
    )
  }
}

export default Pomotimer;
