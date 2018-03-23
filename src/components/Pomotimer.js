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
      history: [],
      currentSession: null,
      currentSessionIndex: null,
      onBreak: false,
      timerStatus: "standBy"
    };
  }

  setTime(name, time) {
    console.log("Create "+name+" "+time+"sec");
    var sessions = this.state.sessions;
    var newSession = {sessionName:name,sessionTime:time,sessionType:"work"};
    var workSessionsCount = 0;
    sessions.forEach((session)=>{
      //console.log(session.sessionType);
      if(session.sessionType==="work") {
        //console.log(workSessionsCount);
        workSessionsCount++;
      }
    });
    var breakSession = {
      sessionName:workSessionsCount%4===0?"30 min Break":"5 min Break",
      sessionTime: workSessionsCount%4===0?1800:300,
      sessionType:"break"
    };
    if(sessions.length > 0 && sessions[sessions.length-1].sessionType !== "break"){
      sessions.push(breakSession, newSession);
    } else {
      sessions.push(newSession);
    }
    if(this.state.currentSessionIndex === null) {
      console.log({sessionName:name,sessionTime:time,sessionType:"work"});
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
  addSession(session) {
    let sessions = this.state.sessions;
    sessions.push(session);
    this.setState({
      sessions: sessions
    });
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
  //add history remove complete item//
  handleHistory(session,i) {
    console.log(session);
    let history = this.state.history;
    history.push(session);
    this.setState({
      history: history,
    })
  }
  saveSession(name,time,i){
    let newSessions = this.state.sessions;
    //console.log(i);
    //console.log(time);
    console.log(newSessions[i].sessionName);
    newSessions[i].sessionName = name;
    newSessions[i].sessionTime = time;
    let currentSession = newSessions[this.state.currentSessionIndex];
    console.log(currentSession);
    this.setState({
      sessions: newSessions,
      currentSession: currentSession
    });
  }
  deleteAllSessions(e) {
    e.preventDefault();
    this.setState({
      sessions:[],
      history:[],
      currentSession: null,
      currentSessionIndex: null
    });
  }

  timerStatus(status) {
    this.setState({
      timerStatus: status
    });
  }

  render() {
    return (
      <div className="Pomotimer-body">
        <TimeCount
          sessions = {this.state.sessions}
          currentSession = {this.state.currentSession}
          currentSessionIndex = {this.state.currentSessionIndex}
          getBreakSession = {()=>this.getBreakSession()}
          timerStatus = {(status)=>this.timerStatus(status)}
          handleHistory = {(session,i)=>this.handleHistory(session,i)}
        />
        <TimeForm
          setTime = {(name,time)=>this.setTime(name,time)}
        />
        <SessionNav
          sessions = {this.state.sessions}
          saveSession = {(name,time,i)=>this.saveSession(name,time,i)}
          currentSessionIndex = {this.state.currentSessionIndex}
          deleteAllSessions = {(e)=>this.deleteAllSessions(e)}
          timerStatus = {this.state.timerStatus}
          history = {this.state.history}
          addCompletedToSession = {(session)=>this.addSession(session)}
        />
      </div>
    )
  }
}

export default Pomotimer;
