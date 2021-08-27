import logo from "../../images/logo.svg";

import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
    name: "user",
    initialState: {
        username: "gowrishjb",
        name: "Gowrish",
        profilePicture: logo,
        keys: {
            public: "90-un230v1903109090v-214i0-",
            "private-lock": "awdasdwrr3vrwerbw3",
            private: "nwowidnoawd19098v190421--1",
        },
        chatList: [
            {
                username: "markus1",
                name: "Markus",
                profilePicture: logo,
                publickey: "awdasdawwb1qweb",
                conversation: [
                    { data: "hello", type: "text/msg", date: Date.now(), origin: true },
                    { data: "hi", type: "text/msg", date: Date.now(), origin: false },
                ],
            },
            {
                username: "markus2",
                name: "Markus",
                profilePicture: logo,
                publickey: "awdasdawwb1qweb",
                conversation: [
                    { data: "hello", type: "text/msg", date: Date.now(), origin: true },
                    { data: "hi", type: "text/msg", date: Date.now(), origin: false },
                ],
            },
        ],
    },
    reducers: {
        setUser: (state, action) => {
            state = action.payload;
        },
    },
});

export const { setUser } = user.actions;

export default user.reducer;
