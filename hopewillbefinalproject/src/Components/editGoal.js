import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function EditGoal() {
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
  const [hoursPerDay, setHoursPerDay] = useState({
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0
  });

  const handleInputChangeOfDays = (event) => {
    const { name, value } = event.target;
    setHoursPerDay({ ...hoursPerDay, [name]: parseInt(value) || 0 });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

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
      <form>
        <label>
          Starting Date:
          <input type="date" value={Goal.startDate} />
        </label>
        <br />
        <label>
          Total Hours:
          <input type="number" value={Goal.totalHours} />
        </label>
        <br />
        {DayGoal.map((day) => (
          <label>
            {daysOfWeek[day.dayOfWeek - 1]}:
            <input
              type="number"
              placeholder={day.hours}
              value={hoursPerDay[day]}
              onChange={handleInputChangeOfDays}
            />
            <br />
          </label>
        ))}
        <br />
        <button type="submit">Update</button>

        <Link to={`/`}>
          <button>Cancel</button>
        </Link>
      </form>
    </div>
  );
}
