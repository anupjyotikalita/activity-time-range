import { combineReducers } from "redux";
import { usernameAndIds } from "./usernameAndId";
import { modalAppearance } from "./modalReducer";
import { userActivities } from "./userActivities";
import { calendarAppearance, targetDate } from "./calendarReducer";
import { loading } from "./LoadingReducer";
import { errorStatus } from "./errorReducer";

const CombinedReducers = combineReducers({
    usernameAndIds,
    modalAppearance,
    userActivities,
    calendarAppearance,
    targetDate,
    loading,
    errorStatus 
});

export default CombinedReducers;