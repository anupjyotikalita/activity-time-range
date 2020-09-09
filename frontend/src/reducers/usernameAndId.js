export const usernameAndIds = (state=[] ,action ) => {
    switch (action.type) {
        case "BRING_USERNAME_AND_ID":
            return action.payload;
    
        default:
            return state;
    }
}