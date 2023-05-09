import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function DetailGoal() {
  const [Goal, setGoal] = useState([]);
  const [DayGoal, setDayGoal] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const getGoals = JSON.parse(localStorage.getItem("goals")) || [];
    const goal = getGoals.find((goal) => goal.id == id);
    setGoal(goal);
    const { hoursPerWeek } = goal;
    const hoursPerWeekArray = setDayGoal(
      hoursPerWeek.map(({ dayOfWeek, hours }) => ({
        dayOfWeek,
        hours
      }))
    );
  }, []);

  const handleDelete = () => {
    const getGoals = JSON.parse(localStorage.getItem("goals")) || [];
    const deleteGoal = getGoals.filter((goal) => goal.id != id);
    console.log(id);
    localStorage.setItem("goals", JSON.stringify(deleteGoal));
    navigate("/");
  };

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  return (
    <div>
      <div key={Goal.id}>
        <ol>
          <li>
            <strong>StartDate : </strong>
            {Goal.startDate}
          </li>
          <li>
            <strong>TotalHours:</strong>
            {Goal.totalHours}
          </li>
          {DayGoal.map((day) => (
            <li>
              {daysOfWeek[day.dayOfWeek - 1]} :{day.hours}
              <br />
            </li>
          ))}
          <button onClick={handleDelete}>Delete</button>
          <Link to="/">
            <button>Go Back</button>
          </Link>
        </ol>
      </div>
    </div>
  );
}
