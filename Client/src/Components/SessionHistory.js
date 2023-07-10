import React, { useEffect, useState } from 'react';
import { get_user_sessions } from '../API/History';

const SessionHistory = ({loadSessions}) => {
  useEffect(() => {
    loadSessions();
  }, [loadSessions]);



  return (
    <div>
      <h1>Session History</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Cycle</th>
            <th scope="col">Focus Time</th>
            <th scope="col">Break Time</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(10)].map((_, index) => (
            <tr key={index + 1} id={index + 1} style={{ display: "none" }}>
              <th scope="row" id={`date${index + 1}`}></th>
              <td id={`cycle${index + 1}`}></td>
              <td id={`focus${index + 1}`}></td>
              <td id={`break${index + 1}`}></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SessionHistory;
