import './App.css';
import { useState, useEffect } from 'react';
import plus from "./plus.svg";
import minus from "./minus.svg";
import bell from "./alarm-bell.mp3";

function App() {

  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [startStop, setStartStop] = useState(false);
  const [mode, setMode] = useState(true);  //true is for sessions, false is for breaks.
  const [timer, setTimer ] = useState(sessionLength * 60);
  let degree = 360 -((timer / (sessionLength * 60)) * 360);
  
  const theAudio = document.getElementById("beep");
  

  useEffect(() => { 
    if(mode) {setTimer(sessionLength * 60) } 
    else {setTimer(breakLength * 60 )}}, 
    [sessionLength, mode, breakLength]
  )

  function decrement (e) {
    if(e.target.id === "break-decrement"){
      if(breakLength === 1) {
        return
      } else {
      setBreakLength(breakLength - 1);
      }
    }
    if(e.target.id === "session-decrement") {
      if(sessionLength === 1) {
        return
      } else {
      setSessionLength(sessionLength - 1);
      }
    }
  }

  function increment (e) {
    if(e.target.id === "break-increment"){
      if(breakLength === 60) {
        return
      } else {
      setBreakLength(+breakLength + 1);
      }
    }
    if(e.target.id === "session-increment") {
      if(sessionLength === 60) {
        return
      } else {
      setSessionLength(+sessionLength + 1);
      }
    }
  }

  function reset (e) {
    const theAudio = document.getElementById("beep");
    setBreakLength(5);
    setSessionLength(25);
    setStartStop(false);
    setMode(true);
    theAudio.pause();
    theAudio.currentTime = 0;
  }


  useEffect(() => {
    let interval;
    if (startStop && timer > 0) {
      interval = setInterval(() => {
        return setTimer(prev => prev - 1)
      }, 1000);
    }

    else if (mode && timer === 0) {
      theAudio.play();     
      setTimeout(() => {
        setMode(false);
      }, 1000);

    }

    else if (!mode && timer === 0) {
      theAudio.play();
      setTimeout(() => {
        setMode(true);
      }, 1000)
      
    }

    return () => clearInterval(interval);
  }, [startStop, timer]);

  function toggle() {
    setStartStop(!startStop);
  }

  const formatTime = (duration) => {
    let minutes = Math.floor(duration / 60);
    let seconds = duration % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };


  return (
    <div className="App">
      <div id="wrapper">
        <h1>25 + 5 TIMER</h1>
        <div id="adjustments">
          <div id="break-div">
            <p id="break-label">Break Length</p>
            <button id="break-decrement" onClick={decrement}><img src={minus} alt="minus-sign"/></button>
            <span id="break-length">{breakLength}</span>
            <button id="break-increment" onClick={increment}><img src={plus} alt="plus-sign"/></button>
          </div>
          <div id="session-div">
            <p id="session-label">Session Length</p>
            <button id="session-decrement" onClick={decrement}><img src={minus} alt="minus-sign"/></button>
            <span id="break-length"></span>
            <span id="session-length">{sessionLength}</span>
            <button type="button" id="session-increment" onClick={increment}><img src={plus} alt="plus-sign"/></button>
          </div>
        </div>
        <div id="timer-div">
          <p id="timer-label">{mode ? "Session" : "Break" }</p>
          <div id="outerCircle" style={{backgroundImage: `conic-gradient(#2f2f2f ${degree}deg, #2f2f2f ${degree}deg, #fe6f27 0deg, #fe6f27 360deg)`}}>
          <p id="time-left">{formatTime(timer)}</p>
          </div>
          <button id="start_stop" onClick={toggle}>{startStop ? "STOP" : "START"}</button>
          <button id="reset" onClick={reset}>RESET</button>
        </div>
        <audio id="beep" preload="auto" src={bell}></audio>
        <footer>
          <p>Designed and coded by</p>
          <p id="coder">Muhammet Ekşi</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
