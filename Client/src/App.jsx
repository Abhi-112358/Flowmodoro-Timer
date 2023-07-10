import React, { useEffect, useState } from 'react';
import './App.css';
import jwt_decode from "jwt-decode"
import Timer from './Components/Timer';
import AppBar from './Components/AppBar';
import { login_signup, signout } from './API/Auth';
import SessionHistory from './Components/SessionHistory';
import { get_user_sessions, add_session  } from './API/History';


function App() {
  const [user, setUser] = useState({});
  const [signedIn, setSignedIn] = useState(false);
  const [sessionsLoaded, setSessionsLoaded] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  async function handleCallbackResponse(response) {
    console.log(response.credential)
    const userObject = jwt_decode(response.credential)
    console.log(userObject);
    setUser(userObject);
    setSignedIn(true);
    console.log(userObject.email);
    await login_signup(userObject.email)
    setSessionsLoaded(true);
    setTimerKey(timerKey + 1);
    document.getElementById("signInDiv").hidden = true;
    document.getElementById("signOutDiv").hidden = false;
  }

  function handleSignOut(event) {
    setUser({});
    signout();
    setSignedIn(false);
    setSessionsLoaded(false);
    setTimerKey(timerKey + 1);
    document.getElementById("signInDiv").hidden = false;
    document.getElementById("signOutDiv").hidden = true;
  }

  const formatTime = (time) => {
    const min = Math.round(time / 60);
    const sec = time % 60;

    let minFormat = "";
    let secFormat = "";

    if (min < 9) {
      minFormat = "0" + String(min);
    } else {
      minFormat = String(min);
    }

    if (sec < 9) {
      secFormat = "0" + String(sec);
    } else {
      secFormat = String(sec);
    }

    return minFormat + ":" + secFormat;
  };
  
  const loadSessions = async () => {
    const sessions = await get_user_sessions();
    const reversedSessions = sessions.reverse();

    for (let i = 0; i < reversedSessions.length; i++) {
      const currDate = new Date(reversedSessions[i].date);
      const rowId = i + 1;

      document.getElementById(`date${rowId}`).innerHTML = currDate.toDateString();
      document.getElementById(`cycle${rowId}`).innerHTML = String(reversedSessions[i].cycle);
      document.getElementById(`focus${rowId}`).innerHTML = formatTime(reversedSessions[i].focusDuration);
      document.getElementById(`break${rowId}`).innerHTML = formatTime(reversedSessions[i].breakDuration);
      document.getElementById(rowId.toString()).style.display = "table-row";
    }

    setSessionsLoaded(true);

  };

  const handleAddSession = async (cycle, focusTime, breakTime) => {
    await add_session(cycle, focusTime, breakTime);
    loadSessions(); // Call loadSessions after adding a new session
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "470209372249-d16h3g6s75smaf1hh0qqrfqj2qa39bsg.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    )
  }, []);

  return (
    <div className='App'>
      <AppBar />
      <Timer addSession={handleAddSession} key={timerKey}/>
      <div id="signInDiv"></div>
     
        <button onClick={handleSignOut} id="signOutDiv" style={{ visibility: signedIn ? 'visible' : 'hidden' }}>
          Sign Out
        </button>
        {sessionsLoaded ? <SessionHistory loadSessions={loadSessions} /> : <h2>Signin to view session history</h2>}
    </div>
    
  )
}

export default App;
