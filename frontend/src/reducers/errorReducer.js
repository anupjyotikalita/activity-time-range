export const errorStatus = (state = false, action) => {
    switch (action.type) {
        case "FACING_ERROR":
            return true;
        default:
            return state;
    }
}