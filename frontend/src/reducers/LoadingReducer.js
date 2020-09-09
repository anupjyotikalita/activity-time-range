export const loading = (state = false, action) => {
  switch (action.type) {
    case "LOADING":
      return true;
    case "LOADING_FINISHED":
      return false;
    default:
      return state;
  }
};
