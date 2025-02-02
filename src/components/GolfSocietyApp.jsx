import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000";
const API_KEY = "mysecureapikey";

const GolfSocietyApp = () => {
  const [players, setPlayers] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchPlayers();
    fetchCompetitions();
    fetchCourses();
  }, []);

  const fetchPlayers = async () => {
    const response = await axios.get(`${API_URL}/players/`, {
      headers: { access_token: API_KEY },
    });
    setPlayers(response.data);
  };

  const fetchCompetitions = async () => {
    const response = await axios.get(`${API_URL}/competitions/`, {
      headers: { access_token: API_KEY },
    });
    setCompetitions(response.data);
  };

  const fetchCourses = async () => {
    const response = await axios.get(`${API_URL}/courses/`, {
      headers: { access_token: API_KEY },
    });
    setCourses(response.data);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Golf Society Manager</h1>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="card">
          <h2>Players</h2>
          {players.map((player) => (
            <div key={player.id}>{player.name} (Hcp: {player.handicap})</div>
          ))}
        </div>
        <div className="card">
          <h2>Competitions</h2>
          {competitions.map((comp) => (
            <div key={comp.id}>{comp.name} - {comp.date}</div>
          ))}
        </div>
        <div className="card">
          <h2>Courses</h2>
          {courses.map((course) => (
            <div key={course.id}>{course.name}</div>
          ))}
        </div>
      </div>
      <button className="mt-4" onClick={fetchPlayers}>Refresh Data</button>
    </div>
  );
};

export default GolfSocietyApp;
