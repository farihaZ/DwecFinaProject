import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function GetGoals() {
  const [Goal, setGoal] = useState([]);
  const [today, setToday] = useState(new Date());
  const [progress, setProgress] = useState([]);
  const [filterDate, setFilterDate] = useState([]);
  const [filterprogress, setFilterProgress] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const SGoal = JSON.parse(localStorage.getItem("goals")) || [];
    setGoal(SGoal);
    const G = Goal.map((goal) => ({
      id: goal.id,
      startDate: goal.startDate,
      totalHours: goal.totalHours,
      progress: Progress(goal.startDate, goal.complitionDate)
    }));
    setProgress(G);
    GoalFilterByDate();
  }, []);

  const Progress = (start, end) => {
    const startDate = new Date(start);
    const EndDate = new Date(end);
    const currentDate = new Date();
    const totalTime = EndDate.getTime() - startDate.getTime();
    const passed = currentDate.getTime() - startDate.getTime();
    const remaining = EndDate.getTime() - currentDate.getTime();
    const percentPassed = Math.round((passed / totalTime) * 100);
    const percentRemaining = Math.round((remaining / totalTime) * 100);
    return percentPassed;
  };

  // Albert These two filters gives me the correct output You Could see in
  // console.log But to show on screen gives me error in mapping , i know the
  // the reason of error is when i click to enter the first element null
  // thats why on getting the array gives me error.
  //

  const GoalFilter = () => {
    progress.forEach((goal) => {
      if (goal.progress > 7) {
        setFilterProgress(goal);
        console.log(filterprogress);
      }
    });
  };
  const GoalFilterByDate = () => {
    Goal.forEach((goal) => {
      const EDate = new Date(goal.complitionDate);
      const currentDate = new Date();
      if (currentDate > EDate) {
        setFilterDate(goal);
        console.log(filterDate);
      }
    });
  };

  return (
    <div>
      <h1>Current Date: {today.toLocaleDateString()}</h1>
      <Link to="/NewGoal">
        <button>New Goal</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>StartDate</th>
            <th>totalHours</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {Goal.map((data) => {
            return (
              // <div key={data.id}>
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.startDate}</td>
                <td>{data.totalHours}</td>

                <td>{Progress(data.startDate, data.complitionDate)}</td>
                <td>
                  <Link to={`/deleteGoal/${data.id}`}>
                    <button>Delete</button>
                  </Link>
                </td>
                <td>
                  <Link to={`/detailGoal/${data.id}`}>
                    <button>Details</button>
                  </Link>
                </td>
                <td>
                  <Link to={`/editGoal/${data.id}`}>
                    <button>Edit</button>
                  </Link>
                </td>
              </tr>
              // </div>
            );
          })}
        </tbody>
      </table>

      <button onClick={GoalFilter}> FilterByPercentage</button>
      <button onClick={GoalFilterByDate}> FilterByComplitionDate</button>

      {isOpen && (
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>StartDate</th>
              <th>totalHours</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {filterDate.map((data) => {
              return (
                // <div key={data.id}>
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.startDate}</td>
                  <td>{data.totalHours}</td>

                  <td>{Progress(data.startDate, data.complitionDate)}</td>
                  <td>
                    <Link to={`/deleteGoal/${data.id}`}>
                      <button>Delete</button>
                    </Link>
                  </td>
                  <td>
                    <Link to={`/detailGoal/${data.id}`}>
                      <button>Details</button>
                    </Link>
                  </td>
                  <td>
                    <Link to={`/editGoal/${data.id}`}>
                      <button>Edit</button>
                    </Link>
                  </td>
                </tr>
                // </div>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default GetGoals;
