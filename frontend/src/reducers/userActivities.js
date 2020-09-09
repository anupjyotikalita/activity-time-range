export const userActivities = (state = [], action) => {
  switch (action.type) {
    case "NEW_USERACTIVITES":
      return action.payload;
    default:
      return state;
  }
};
