import React from "react";
import Usercard from "./Usercard";
import { useSelector } from "react-redux";
import profile from "../assets/profile.jpg";
import profile2 from "../assets/profile2.jpg";

const AllUserContainer = () => {
  const idsAndUsernames = useSelector((state) => state.usernameAndIds); //retrive the userids and their names

  const displayNamesAndIds = () => {
    return idsAndUsernames.map((item, index) => {  // for each user, make a user-card
      return (
        <Usercard
          key={index}
          userId={item.userId}
          username={item.username}
          profilePic={index % 2 === 0 ? profile : profile2}  //simple ternary operation to choose alternative default profile pictures
        />
      );
    });
  };

  return (
    <div className="userListContainer">
      <div className="userListHeading">
        <p>Users List</p>
      </div>
      <div className="userListDiv">{displayNamesAndIds()}</div>
    </div>
  );
};

export default AllUserContainer;
