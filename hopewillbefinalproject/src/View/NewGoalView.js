import React, { useState, useEffect } from "react";
import NewGoalViewModal from "../ViewModel/NewGoalViewModal";

const NewGoalView = () => {
  const {
    startDate,
    setStartDate,
    totalHours,
    setTotalHours,
    totalHoursError,
    setTotalHoursError,
    hoursPerDay,
    setHoursPerDay,
    hoursPerDayError,
    setHoursPerDayError,
    handleInputChangeOfDays,
    validateHourPerDay,
    handleSubmit,
    calculateTotalHours,
    calculateTotalWeekHours,
    CalculateNonZeroDayIndex,
    getDateOfNonZeroValue
  } = NewGoalViewModal();
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
};
export default NewGoalView;
