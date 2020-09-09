export const calendarAppearance = (state = false, action) => {
  switch (action.type) {
    case "SHOW_CALENDAR":
      return true;
    case "HIDE_CALENDAR":
      return false;
    default:
      return state;
  }
};

export const targetDate = (state = "", action) => {
  switch (action.type) {
    case "SET_DATE":
      return action.payload;
    default:
      return state;
  }
}
