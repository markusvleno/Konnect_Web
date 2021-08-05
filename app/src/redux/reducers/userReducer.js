let initUser = {
    name: "",
    friendList: [
        { username: "username", name: "user1", chatLog: [] },
        { username: "username", name: "user1", chatLog: [] },
        { username: "username", name: "user1", chatLog: [] },
        { username: "username", name: "user1", chatLog: [] },
        { username: "username", name: "user1", chatLog: [] },
        { username: "username", name: "user1", chatLog: [] },
        { username: "username", name: "user1", chatLog: [] },
    ],
};

const userReducer = (state = initUser, action) => {
    switch (action.type) {
        case "setUser":
            return state;
        default:
            return state;
    }
};

export default userReducer;
