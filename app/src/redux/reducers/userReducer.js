let initUser = null;

const userReducer = (state = initUser, action) => {
    switch (action.type) {
        case "setUser":
            return state;
        default:
            return state;
    }
};

export default userReducer;
