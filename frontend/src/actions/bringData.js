import Axios from "axios";

// brings all the usernames and ids
export const bringAllUsernamesAndIds = () => {
  return async (dispatch) => {
    dispatch({ type: "LOADING" }); //loading spinner showsup

    try {
      const allUsernamesAndIdsResponse = await Axios({ //bring the usernames and their ids
        method: "GET",
        url: "/allusernamesandids",
      });
      if (allUsernamesAndIdsResponse.data.status === "ok") { //if the status is "ok", then add them to the store
        dispatch({
          type: "BRING_USERNAME_AND_ID",
          payload: allUsernamesAndIdsResponse.data.allUsernamesandids,
        });
      } else {
        dispatch({ type: "FACING_ERROR" });  // if the status is not "ok", then display the error component
      }
    } catch (e) {
        dispatch({ type: "FACING_ERROR" });
    }

    dispatch({ type: "LOADING_FINISHED" }); //loading spinner hides
  };
};

export const bringUserActivities = (userId, targetDate) => {
  return async (dispatch) => {
    dispatch({ type: "LOADING" }); //loading spinner showsup

    try {
        let formattedTargetDate = targetDate.split(" "); // format of the date to display-- Sep 10, 2020
        formattedTargetDate = `${formattedTargetDate[0]}  ${formattedTargetDate[1]}, ${formattedTargetDate[2]}`;
        dispatch({ type: "SET_DATE", payload: formattedTargetDate }); //making the target date available to the store, so that it can be displayed elsewhere

        const userActivitiesResponse = await Axios({ //bring the activities of the user on the specified date
            method: "POST",
            url: "/getactivitiesbydate",
            data: { userId, targetDate },
        });

        if (userActivitiesResponse.data.status === "ok") { //if the status is "ok", then add the activities to the store
            dispatch({
            type: "NEW_USERACTIVITES",
            payload: userActivitiesResponse.data.activities,
            });
        } else {
            dispatch({ type: "MODAL_DISAPPEAR" });
            dispatch({ type: "FACING_ERROR" }); 
        }
    } catch (e) {
        dispatch({ type: "MODAL_DISAPPEAR" });  //if there is an error, then do not show the modal
        dispatch({ type: "FACING_ERROR" });  // show the error component
    }

    dispatch({ type: "LOADING_FINISHED" }); //loading spinner hides
  };
};
