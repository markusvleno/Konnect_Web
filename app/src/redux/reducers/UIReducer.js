let initUI = null;

const UIReducer = (state = initUI, action) => {
    switch (action.type) {
        case "something":
            return state;
        default:
            return state;
    }
};

export default UIReducer;
