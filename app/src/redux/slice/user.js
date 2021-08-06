import logo from "../../images/logo.svg";

import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
    name: "user",
    initialState: {
        name: "brah",
        logo: logo,
        conversation: [
            { username: "test", Name: "test", chatLog: [], lastMsg: "08:20" },
            { username: "test", Name: "test", chatLog: [], lastMsg: "08:20" },
            { username: "test", Name: "test", chatLog: [], lastMsg: "08:20" },
            { username: "test", Name: "test", chatLog: [], lastMsg: "08:20" },
            { username: "test", Name: "test", chatLog: [], lastMsg: "08:20" },
            { username: "test", Name: "test", chatLog: [], lastMsg: "08:20" },
            { username: "test", Name: "test", chatLog: [], lastMsg: "08:20" },
            { username: "test", Name: "test", chatLog: [], lastMsg: "08:20" },
            { username: "test", Name: "test", chatLog: [], lastMsg: "08:20" },
        ],
        friendList: [
            { username: "username" },
            { username: "username" },
            { username: "username" },
            { username: "username" },
            { username: "username" },
            { username: "username" },
            { username: "username" },
        ],
    },
    reducers: {
        setUser: (state) => {},
    },
});

export const { setUser } = user.actions;

export default user.reducer;
