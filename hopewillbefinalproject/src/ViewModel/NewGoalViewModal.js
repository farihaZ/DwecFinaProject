import React, { useState, useEffect } from "react";

const NewGoalViewModal = () => {
  // All the useStates
  const [startDate, setStartDate] = useState(new Date());
  const [totalHours, setTotalHours] = useState(0);
  const [totalHoursError, setTotalHoursError] = useState("");
  const [hoursPerDay, setHoursPerDay] = useState({
    Monday: 2,
    Tuesday: 2,
    Wednesday: 2,
    Thursday: 2,
    Friday: 2,
    Saturday: 2,
    Sunday: 2
  });
  const [hoursPerDayError, setHoursPerDayError] = useState("");

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
  // submit if all inputs are valid
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!totalHoursError && !hoursPerDayError) {
      //SetLocalStorage();
      calculateTotalHours();
      console.log("submitted");
    } else {
      console.log("Error");
    }
  };

  // Calculation of Complition Date

  const calculateTotalHours = () => {
    const workDaysHours = calculateTotalWeekHours(hoursPerDay);
    // console.log(`workDaysHours ${workDaysHours}`);
    const weeks = totalHours / workDaysHours;
    // console.log(`weeks ${weeks}`);
    const days = weeks * 7;
    // console.log(`days ${days}`);
    const completionDate = new Date(startDate);
    completionDate.setDate(completionDate.getDate() + (days - 1));
    const completionDateFormatted = completionDate.toLocaleDateString();
    console.log(`You will finish the task on 1 : ${completionDateFormatted}`);
    const NonZeroDay = CalculateNonZeroDayIndex();
    const DateDayIndex = selectedDateDayIndex();
    const NonZeroDayDate = getDateOfNonZeroValue();
    //console.log(NonZeroDayDate);
    // console.log(DateDayIndex);
    const S = new Date(startDate);
    //console.log(S);
    if (NonZeroDay < DateDayIndex) {
      completionDate.setDate(completionDate.getDate() + DateDayIndex);
      const FinalDate = completionDate.toLocaleDateString();
      console.log(`You will finish the task on 2 :${FinalDate}`);
    } else if (NonZeroDay > DateDayIndex) {
      completionDate.setDate(completionDate.getDate() - DateDayIndex);
      const FinalDate = completionDate.toLocaleDateString();
      console.log(`You will finish the task on 3 :${FinalDate}`);
    }
  };

  // total week hous of calculation
  const calculateTotalWeekHours = (hoursPerDay) => {
    return Object.values(hoursPerDay).reduce(
      (total, hours) => total + hours,
      0
    );
  };

  // find first non-zero day index
  const CalculateNonZeroDayIndex = () => {
    const day = Object.keys(hoursPerDay);
    const firstNonZeroIndex = day.findIndex((day) => hoursPerDay[day] !== 0);
    console.log(`NonZero Index: ${firstNonZeroIndex + 1}`);
    return firstNonZeroIndex;
  };

  // find selectedDate day Index
  const selectedDateDayIndex = () => {
    const dateObj = new Date(startDate);
    const dayOfWeek = dateObj.getDay();
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ];
    const selectedDayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    console.log(selectedDayIndex + 1);
    return selectedDayIndex;
  };

  // get the date of nonZero Day
  const getDateOfNonZeroValue = () => {
    for (const day in hoursPerDay) {
      if (hoursPerDay[day] !== 0) {
        const dayOfWeek = [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ].indexOf(day);
        const currentDate = new Date(startDate);
        const diff =
          currentDate.getDate() - currentDate.getDay() + dayOfWeek + 1;
        const date = new Date(currentDate.setDate(diff));
        return date;
      }
    }
    return null;
  };

  return (
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
  );
};

export default NewGoalViewModal;
