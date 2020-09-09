import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "./Calendar";
import calendarImg from "../assets/calendar.png";

const Modal = (props) => {
  const userActivities = useSelector((state) => state.userActivities); //retrieving the specified user's activities on a specified date
  const showCalendar = useSelector((state) => state.calendarAppearance);
  const targetDate = useSelector((state) => state.targetDate);

  const dispatch = useDispatch();
  const closeModal = () => dispatch({ type: "MODAL_DISAPPEAR" });  //action for closing the modal


  //when the Modal unmounts make sure the calendar goes to hide; or, it will appear in the next mount
  //[] signifies that it will only run after the component mounting and before its unmounting
  useEffect(() => {
    return () => dispatch({ type: "HIDE_CALENDAR" }); 
  }, []); 

  // show a message when there is no activity by the user for the specified date
  const emptyDivMessage = () => {  
    return (
      <div style={{textAlign: "center"}}>
        <p>There is no activity of the user on this date. Choose another date from the calendar.</p>
        <p className="forTester">(If you are testing this app, then choose a date between September 7, 2020 and September 12, 2020. Every user has atleast one activity per day between these dates)</p>
      </div>
    );
  };

  //table for displaying the date specific activity
  const activityTableDisplay = () => {
    return (
      <table>
        <thead>
          <tr>
            {["Start Date", "Start Time", "End Date", "End Time"].map(
              //setting the headers of the table
              (column, index) => (
                <th key={index}>{column}</th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {userActivities.map((activity, index) => {
            let startTimeSpliting = activity.start_time.split(" "); //giving the form [ "Apr","16","2020", "5:02PM" ]
            let endTimeSpliting = activity.end_time.split(" ");

            return (
              <tr key={index}>
                <td>
                  {startTimeSpliting[0] +             //giving the form "Apr 16, 2020"
                    " " +                     
                    startTimeSpliting[1] +
                    ", " +
                    startTimeSpliting[2]} 
                </td>
                <td>{startTimeSpliting[3]}</td>
                <td>
                  {endTimeSpliting[0] +
                    " " +
                    endTimeSpliting[1] +
                    ", " +
                    endTimeSpliting[2]}
                </td>
                <td>{endTimeSpliting[3]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  //decide whether to show a activity table of an empty message
  const contentInActivityDiv = () => {
    return userActivities.length ? activityTableDisplay() : emptyDivMessage();
  };

  return (
    <div className="modalDiv">
      <div className="modalMainDiv">
        <div className="modalHead">
          <div className="dateAndCalendarDiv">
            <p>Date: {targetDate}</p>
            <div className="calendarOpenClose">
              <img src={calendarImg} alt="Calender Icon" />
              <button
                onClick={() =>
                  dispatch({
                    type: showCalendar ? "HIDE_CALENDAR" : "SHOW_CALENDAR",    //toggle between showing and hiding the calendar with this button
                  })
                }
              >
                {showCalendar ? "Close" : "Open"}
              </button>
            </div>
          </div>
          <div className="usernameAndIdDivInModal">
            <h2>{props.username}</h2>
            <div className="spanForId">
              <span>{`(${props.userId})`}</span>
            </div>
          </div>
          <button onClick={closeModal} id="closeModalButton">
            ⨯  
          </button>
        </div>
        <div className="activityTableDiv">
          {showCalendar ? (                         // if the "showCalendar" is true, then show the calendar or show the activities
            <Calendar userId={props.userId} />
          ) : (
            contentInActivityDiv()
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
