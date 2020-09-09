import React, { useEffect } from "react";
import AllUserContainer from "./AllUserContainer";
import { useDispatch, useSelector } from "react-redux";
import {  bringAllUsernamesAndIds } from "../actions/bringData";
import Modal from "./Modal";
import Loading from "./Loading";
import headericon from "../assets/map.png";
import ErrorDiv from "./Errordiv";

const App = () => {

  // retrive the following from the store -- 1. is the app fetching some data from the server, 
  // 2. has it encounted an error, 3. should the modal appear
  let loadingStatus = useSelector((state) => state.loading);  
  let errorStatus = useSelector(state=> state.errorStatus);
  const modalAppearance = useSelector(state => state.modalAppearance);  

  const dispatch = useDispatch();

  // bringing the usernames when the app mounts
  useEffect(() => {
    dispatch(bringAllUsernamesAndIds());
  },[]);

  return (
    <div className="container">
      { loadingStatus ? <Loading /> : "" } 
      { modalAppearance.appear ?  <Modal userId={modalAppearance.userId} username={modalAppearance.username} /> : "" } 
      <div className="headerDiv">
        <h1>Activity Range<img src={headericon} alt="Header Icon" id="headerIcon" /></h1>
      </div>
      { !errorStatus ? <AllUserContainer /> : <ErrorDiv /> }    
    </div>
  );
};

export default App;
