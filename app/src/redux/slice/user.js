import logo from "../../images/logo.svg";

import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
    name: "user",
    initialState: {
        username: "brah",
        name: "brah",
        profilePicture: logo,
        conversation: [
            {
                username: "test",
                name: "test",
                profilePicture: logo,
                pub: "meawod",
                chatLog: [
                    { data: "brah", type: "text/msg", date: Date.now(), origin: true },
                    { data: "brah", type: "text/msg", date: Date.now(), origin: false },
                    { data: "brah", type: "text/msg", date: Date.now(), origin: false },
                    { data: "brah", type: "text/msg", date: Date.now(), origin: true },
                    { data: "brah", type: "text/msg", date: Date.now(), origin: false },
                    { data: "brah", type: "text/msg", date: Date.now(), origin: true },
                    { data: "brah", type: "text/msg", date: Date.now(), origin: false },
                ],
            },
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
