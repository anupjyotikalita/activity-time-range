import React, { useState } from "react";
import moment from "moment";  //we will be using the "moment" library to retrieve months, dates, years for the calendar
import { useDispatch } from "react-redux";
import { bringUserActivities } from "../actions/bringData";

const Calendar = (props) => {
  //3.make the present moment a state
  const [dateObject, setDateObject] = useState(moment());
  const [showMonths, setShowMonths] = useState(false);
  const [showYears, setShowYears] = useState(false);
  const dispatch = useDispatch();

  // 4. calculate the position of the first day of the month under the weekday row
  const firstday = () => {
    let fd = moment(dateObject).startOf("month").format("d"); //0--sunday, 1--monday....6--saturday
    return fd;
  };

  //5. create the blanks for offsetting the month start
  const blanks = [];
  for (let i = 0; i < firstday(); i++) {
    blanks.push(<td key={100-i}> </td>);
  }

  // 6. create the content for all the days of the month
  const daysOfMonth = () => {
    return dateObject.daysInMonth();
  };

  // 6.1 current day styling
  const currday = () => {
    return dateObject.format("D");
  };

  // function to invoke after a date is clicked
  const dateSelection = (date) => {
    let targetDate = `${dateObject.format("MMM")} ${date} ${dateObject.format("Y")}`;
    dispatch(bringUserActivities(props.userId, targetDate));
    dispatch({ type: "HIDE_CALENDAR" });
  }

  const allDaysOfMonth = [];
  for (let j = 1; j <= daysOfMonth(); j++) {
    const currDayClass = j.toString() === currday() ? "currentDay" : "notCurrentDay";
    allDaysOfMonth.push(
      <td key={j} className={`${currDayClass} monthDates`} onClick={() => dateSelection(j)} >
        {j}
      </td>
    );
  }

  // 7.
  let allSlots = [...blanks, ...allDaysOfMonth]; //offset days + days of the month
  let rows = []; //will hold the 7 dates of each row as a single array
  let columns = [];

  allSlots.forEach((d, i) => {
    if (i % 7 !== 0) {
      columns.push(d); //push each day to the "columns" array until the 7th day comes
    } else {
      if (i !== 0) {
        rows.push(columns); //when the 7th day comes, put the "columns" array in it
      }
      columns = []; //clear the previous "columns" array
      columns.push(d); //start the "columns" array again
    }

    if (i === allSlots.length - 1) {
      //when the blanks + month days end, put the "columns" in the "rows" array
      rows.push(columns);
    }
  });


  //8. Display the month dates
  const displayTheDates = () => {
    return rows.map((ar, index) => {
      return <tr key={index}>{ar}</tr>;
    });
  };

  //1.creating weekday names in short form
  const weekdays = moment.weekdaysShort();
  const months = moment.months();

  //2.displaying the name of the weekdays
  const weekdayDisplay = () => {
    return weekdays.map((d, i) => {
      return <th key={i}>{d}</th>;
    });
  };

  //9. select month
  const monthsPopup = () => {
    return (
      <div className="monthAndYearPopup">
        {months.map((month) => {
          return <p onClick={() => setNewMonth(month)} key={month}>{month}</p>;
        })}
      </div>
    );
  };

  // 10. Set the new month as per the selection
  const setNewMonth = (month) => {
    let monthIndex = months.indexOf(month);
    let newDateObject = Object.assign({}, dateObject);
    newDateObject = moment(newDateObject).set("month", monthIndex);
    setDateObject(newDateObject);
    setShowMonths(!showMonths);
  };

  // 13. set the previous and the next month when the relevant arrow is clicked
  const previousMonth = () => {
    let newDateObject = Object.assign({}, dateObject);
    newDateObject = moment(newDateObject).subtract(1, "month");
    setDateObject(newDateObject);
  }

  const nextMonth = () => {
    let newDateObject = Object.assign({}, dateObject);
    newDateObject = moment(newDateObject).add(1, "month");
    setDateObject(newDateObject);
  }


  // 12. set the new year as per the selection
  const setNewYear = (year) => {
    let newDateObject = Object.assign({}, dateObject);
    newDateObject = moment(newDateObject).set("year", year);
    setDateObject(newDateObject);
    setShowYears(!showYears);
  }

  // 11. toggle allyears entry
  const allYears = [...Array(21).keys()].map(x => x+2010);
  const yearPopup = () => {
    return (<div className="monthAndYearPopup">
          { allYears.map(year => {
            return <p onClick={() => setNewYear(year)} key={year}>{year}</p>;
          }) }
      </div>)
  }

  return (
      <div className="headAndTable">
        <div className="head">
          <h3>
            <span onClick={() => {
              setShowMonths(!showMonths);
              if (showYears) { // if the years selection popup is open, then close it
                setShowYears(false);
              }
              }} className="monthAndYearName">
              {dateObject.format("MMMM")}
            </span>
            {showMonths ? monthsPopup() : ""}
            <span onClick={() => {
              setShowYears(!showYears);
              if (showMonths) { //if the months selection popup is open, then close it
                setShowMonths(false);
              }
              }} className="monthAndYearName">{` ${dateObject.format("Y")}`}</span>
            {showYears ? yearPopup() : "" }
          </h3>
          <div className="arrows">
            <span onClick={previousMonth}>❮</span>
            <span onClick={nextMonth}>❯</span>
          </div>
        </div>
        <table className="mainTable">
          <thead className="calendarHead">
            <tr>{weekdayDisplay()}</tr>
          </thead>
            <tbody>{displayTheDates()}</tbody>
        </table>
      </div>
  );
};

export default Calendar;
