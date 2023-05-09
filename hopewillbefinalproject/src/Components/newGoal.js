import React, { useState, useEffect, ComponentDidMount } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function NewGoal() {
  // All the useStates
  const [startDate, setStartDate] = useState(new Date());
  const [totalHours, setTotalHours] = useState(0);
  const [totalHoursError, setTotalHoursError] = useState("");
  const [workingDay, setWorkingDay] = useState([]);
  const [hoursPerDay, setHoursPerDay] = useState({
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0
  });
  const [hoursPerDayError, setHoursPerDayError] = useState("");
  const [holidays, setHolidays] = useState(["2023-05-31", "2023-06-07"]);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  // event to Check that atleast one day has value greater then zero
  const handleInputChangeOfDays = (event) => {
    const { name, value } = event.target;
    setHoursPerDay({ ...hoursPerDay, [name]: parseInt(value) || 0 });
  };

  // validate Hourperday
  const validateHourPerDay = () => {
    let validDay = false;
    Object.keys(hoursPerDay).forEach((day) => {
      if (hoursPerDay[day] > 0) {
        validDay = true;
        setHoursPerDayError("");
      }
    });
    if (!validDay) {
      setHoursPerDayError("At least one day must have hours greater than 0");
    }
  };
  // Validate totalHours
  const validateTotalHours = () => {
    if (totalHours <= 0) {
      setTotalHoursError("Totalhours Shoul be greater then 0.");
    } else {
      setTotalHoursError("");
    }
  };

  useEffect(() => {
    validateHourPerDay();
    validateTotalHours();
  });

  useEffect(() => {
    axios
      .get("https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData")
      .then((response) => {
        setHolidays(response.data);
        //console.log(holidays);
      });
  }, []);

  const SetLocalStorage = () => {
    const hoursPerWeek = Object.keys(hoursPerDay).map((index, day) => ({
      dayOfWeek: day + 1,
      hours: hoursPerDay[index]
    }));
    const storedGoals = JSON.parse(localStorage.getItem("goals")) || [];
    //const expirationDate = new Date();
    //expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    const complitionDate = calculateComplitionDate();
    console.log(complitionDate);
    const goalData = {
      id: storedGoals.length + 1,
      startDate,
      totalHours,
      hoursPerWeek,
      complitionDate,
      progress
      //expirationDate
    };
    storedGoals.push(goalData);
    localStorage.setItem("goals", JSON.stringify(storedGoals));
    console.log(goalData);
    console.log(storedGoals);
  };

  const festivalCalculate = (start, end) => {
    let fest = 0;
    const startDate = new Date(start);
    holidays.forEach((festival) => {
      const festivalDate = new Date(festival.festival);
      if (festivalDate >= startDate && festivalDate <= end) {
        fest = fest + 1;
        console.log(fest);
      }
    });
    return fest;
  };

  const calculateComplitionDate = () => {
    const indexes = [];
    for (const [index, value] of Object.entries(hoursPerDay)) {
      if (value > 0) {
        indexes.push(index);
      }
    }
    console.log(indexes);
    const workDaysHours = Object.values(hoursPerDay).reduce((a, b) => a + b, 0);
    //const weeks = totalHours / workDaysHours;
    const days = (totalHours / workDaysHours) * 7;
    const completionDate = new Date(startDate);
    completionDate.setDate(completionDate.getDate() + days - 1);
    const completionDateFormatted = completionDate.toLocaleDateString();
    console.log(`You will finish the task on ${completionDateFormatted}`);
    //return completionDateFormatted;

    let fest = 0;
    const StartD = new Date(startDate);
    const EndD = new Date(completionDate);
    holidays.forEach((festival) => {
      const festivalDate = new Date(festival.festival);
      const dayOffestival = festivalDate.toLocaleDateString("en-US", {
        weekday: "long"
      });
      if (festivalDate.getTime() >= StartD && festivalDate <= EndD) {
        if (indexes.includes(dayOffestival)) {
          fest = fest + 1;
        }
      }
    });
    if (fest > 0) {
      completionDate.setDate(completionDate.getDate() + fest);
      const DateFinal = completionDate.toLocaleDateString();
      return DateFinal;
    } else {
      return completionDateFormatted;
    }
  };
  // submit if all inputs are valid
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!totalHoursError && !hoursPerDayError) {
      const D = calculateComplitionDate();
      //console.log(D);
      SetLocalStorage();
      navigate("/");
    } else {
      console.log("Error");
    }
  };

  return (
    <div>
      <h2>Create a New Goal</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Starting Date:
          <input
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          />
        </label>
        <br />
        <label>
          Total Hours:
          <input
            type="number"
            value={totalHours}
            onChange={(event) =>
              setTotalHours(parseInt(event.target.value) || 0)
            }
          />
          {totalHoursError && (
            <span style={{ color: "red" }}>{totalHoursError}</span>
          )}
        </label>
        <br />
        <label>
          Hours per Day:
          <br />
          {Object.keys(hoursPerDay).map((day) => (
            <label key={day}>
              {day}:&nbsp;
              <input
                type="number"
                name={day}
                value={hoursPerDay[day]}
                onChange={handleInputChangeOfDays}
              />
              <br />
            </label>
          ))}
          {hoursPerDayError && (
            <span style={{ color: "red" }}>{hoursPerDayError}</span>
          )}
        </label>
        <br />

        <button type="submit">Create Goal</button>
      </form>
    </div>
  );
}

/**
 * const calculateDaysElapsed = (enddate) => {
    const end = new Date(enddate);
    const start = new Date(startDate);
    const daysElapsed = Math.ceil(
      (start.getTime() - end.getTime()) / (1000 * 3600 * 24) + 1
    );
    return daysElapsed;
  };
 */

/**
  * 
  *  const calculateTotalHours = () => {
    const workDaysHours = Object.values(hoursPerDay).reduce((a, b) => a + b, 0);
    console.log(`workDaysHours ${workDaysHours}`);
    const weeks = totalHours / workDaysHours;
    console.log(`weeks ${weeks}`);
    const days = weeks * 7;
    console.log(`days ${days}`);
    const completionDate = new Date(startDate);
    completionDate.setDate(completionDate.getDate() + (days - 1));
    const completionDateFormatted = completionDate.toLocaleDateString();
    console.log(`You will finish the task on ${completionDateFormatted}`);

    const fest = festivalCalculate(startDate, completionDate);
    if (fest > 0) {
      completionDate.setDate(completionDate.getDate() + fest);
      const FinalDate = completionDate.toLocaleDateString();
      return FinalDate;
    } else {
      return completionDateFormatted;
    }
  };
  */
/**
  * 
  * const festivalCalculate = (start, end) => {
    let fest = 0;

    const startDate = new Date(start);
    holidays.forEach((festival) => {
      const festivalDate = new Date(festival);
      if (festivalDate >= startDate && festivalDate <= end) {
        fest = fest + 1;
      }
    });
    return fest;
  };
  */
/***
  * 
  * 
  *  const SetLocalStorage = () => {
    const hoursPerWeek = Object.keys(hoursPerDay).map((index, day) => ({
      dayOfWeek: day + 1,
      hours: hoursPerDay[index]
    }));
    const storedGoals = JSON.parse(localStorage.getItem("goals")) || [];
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    const goalData = {
      id: storedGoals.length + 1,
      startDate,
      totalHours,
      hoursPerWeek,
      expirationDate
    };
    storedGoals.push(goalData);
    localStorage.setItem("goals", JSON.stringify(storedGoals));
    console.log(goalData);
    console.log(storedGoals);
  };

  */
