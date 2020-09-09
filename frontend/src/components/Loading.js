import React from "react";

// this component will be used to show the user that the app is fetching some data from the server
const Loading = () => {
  return (
    <div className="loadingDiv">
      <h1>Loading</h1>
      <div className="spinner"></div>
    </div>
  );
};

export default Loading;
