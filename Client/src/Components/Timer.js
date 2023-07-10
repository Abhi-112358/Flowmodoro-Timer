import React, { useEffect, useState, useRef } from 'react';
import './Timer.css';
import { add_session } from '../API/History';

const Timer = ({addSession}) => {
  const [timerRunning, setTimerRunning] = useState(false);
  const [currMinutes, setCurrMinutes] = useState(0);
  const [currSeconds, setCurrSeconds] = useState(0);
  const [rest, setRest] = useState(false);
  const [breakTime, setBreakTime] = useState(0);
  const [focusTime, setFocusTime] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [pauseCount, setPauseCount] = useState(0);
  const timerRef = useRef(null);

  const startTimer = (minutes, seconds) => {
    timerRef.current = setInterval(() => {
      if (!rest) {
        // Focus period: count up
        if (seconds === 59) {
          minutes++;
          seconds = 0;
        } else {
          seconds++;
        }
      } else {
        // Break period: count down
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(timerRef.current);
            handleTimerCompletion();
            return;
          }
          minutes--;
          seconds = 59;
        } else {
          seconds--;
        }
      }

      setCurrMinutes(minutes);
      setCurrSeconds(seconds);
    }, 1000);

    setTimerRunning(true);
  };

  const pauseTimer = () => {
    clearInterval(timerRef.current);
    setTimerRunning(false);
    setPauseCount(pauseCount + 1);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setTimerRunning(false);
    setPauseCount(0);
    resetTimer();
    handleTimerCompletion(); // Call handleTimerCompletion when stopping the timer
  };

  const resetTimer = () => {
    console.log(rest);
    pauseTimer();
    if (!rest) {
      setCurrMinutes(0);
      setCurrSeconds(0);


    } else {
      const minutes = Math.floor(breakTime / 60);
      const seconds = breakTime % 60;
      setCurrMinutes(minutes);
      setCurrSeconds(seconds);
    }
  };

  const handleTimerCompletion = () => {
    if (!rest) {
      pauseTimer();
      const currentRoundTime = currMinutes * 60 + currSeconds;
      setFocusTime(currentRoundTime);
      let calculatedBreakTime;
      if (currentRoundTime < 3) {
        calculatedBreakTime = 1;
      } else {
        calculatedBreakTime = Math.round(currentRoundTime / 5);
      }
      const minutes = Math.floor(calculatedBreakTime / 60);
      const seconds = calculatedBreakTime % 60;

      setBreakTime(calculatedBreakTime);
      setCurrMinutes(minutes);
      setCurrSeconds(seconds);
      setRest(true);
    } else {
      addSession(cycle, focusTime, breakTime);
      setRest(false);
      setTimerRunning(false);
      setCurrMinutes(0);
      setCurrSeconds(0);
    }
    setCycle(cycle + 1);
  };

  useEffect(() => {


    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="container mx-auto">
      <div className="card text-center">
        <div className="card-header">
          <h3 id="session-type" style={{ color: '#4A4A4A' }}>
            {rest ? 'Break' : 'Focus'}
          </h3>
          <h4 id="cycle" style={{ color: 'rgb(146, 143, 143)' }}>
            #{cycle}
          </h4>
          <h2 className="card-title" id="timer">
            <span id="minutes-seconds">
              <span id="minutes">{String(currMinutes).padStart(2, '0')}</span>:
              <span id="seconds">{String(currSeconds).padStart(2, '0')}</span>
            </span>
          </h2>
        </div>
        <div className="card-body">
          <div id="buttons">
            {timerRunning ? (
              <button id="pause-button" className="btn btn-info" onClick={pauseTimer}>
                Pause
              </button>
            ) : (
              <button id="start-button" className="btn btn-success" onClick={() => startTimer(currMinutes, currSeconds)}>
                Start
              </button>
            )}
            <button id="stop-button" className="btn btn-danger" onClick={stopTimer}>
              Stop
            </button>
            <button id="reset-button" className="btn btn-warning" onClick={resetTimer}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
