export const modalAppearance = (state = { appear: false, userId: "", username:"" }, action) => {
    switch (action.type) {
        case "MODAL_APPEAR":    
            return { ...state, appear: true, ...action.payload};
        case "MODAL_DISAPPEAR":    
            return { ...state, appear: false, userId: "", username:"" };
        default:
            return state;
    }
}