import React from "react";
import { useDispatch } from "react-redux";
import { bringUserActivities } from "../actions/bringData";

const Usercard = (props) => {
  const dispatch = useDispatch();

  const bringActivities = () => {
    // send the current date in the format-- "Sep 2 2020"
    let currentDate = new Date().toLocaleDateString("default", {   
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    let formattedCurrentDate = currentDate.replace(",", "");
    dispatch({ type: "MODAL_APPEAR", payload: { userId: props.userId, username: props.username} }); //make the modal appear for the choosen user
    dispatch(bringUserActivities(props.userId, formattedCurrentDate));  //bring the activities of the user for the present day
  };

  return (
    <div className="userCardDiv" onClick={() => bringActivities()}>
      <div className="userImageDiv">
        <img src={props.profilePic} alt="Profile" />
      </div>
      <div className="userInfoDiv">
        <h3>{props.username}</h3>
        <p style={{ color: "grey", fontSize: "12px" }}>Id: {props.userId}</p>
      </div>
    </div>
  );
};

export default Usercard;
