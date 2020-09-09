import React from "react";

// This division will appear when there is an error while fetching data from the server
const ErrorDiv = () => {
  return (
    <div className="errorDivContainer">
      <p style={{textAlign:"center"}}>
        Error! We have faced some problem while fetching the data for you.
        Please refresh the page or try again after some time.
      </p>
    </div>
  );
};

export default ErrorDiv;
