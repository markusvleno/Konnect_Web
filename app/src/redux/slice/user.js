// import logo from "../../images/logo.svg";

import { createSlice } from "@reduxjs/toolkit";
import { createSignalProtocolManager, SignalServerStore } from "../../signal/SignalGateway";

let temp = [
    {
        username: "brah1",
        chatID: 123,
        chatLog: [
            {
                data: "sup homie",
                messageID: 100,
                time: Date.now(),
            },
        ],
    },
    {
        username: "brah2",
        chatID: 124,
        chatLog: [
            {
                data: "lol",
                messageID: 101,
                time: Date.now(),
            },
            {
                data: "sup homie",
                messageID: 102,
                time: Date.now(),
            },
            {
                data: "sup homie",
                messageID: 103,
                time: Date.now(),
            },
        ],
    },
];

export const user = createSlice({
    name: "user",
    initialState: {
        username: "Undefined",
        name: "Undefined",
        profilePicture: "/static/assets/images/profile.svg",
        conversation: [],
        friends: [],
        // dummySignalServer: new SignalServerStore(),
        // signalProtocolManagerUser: undefined,
    },
    reducers: {
        init: (state, action) => {
            const payload = action.payload;
            state.username = payload.username;
            state.name = payload.name;
            state.profilePicture = payload.profilePicture;
            state.conversation = temp;
            // state.signalProtocolManagerUser = payload.signalProtocolManagerUser;
        },
        updateName: (state, action) => {
            state.name = action.payload.name;
        },
        updateProfilePicture: (state, action) => {
            state.profilePicture = action.payload.profilePicture;
        },
        newConversation: (state, action) => {
            state.conversation = new Array(...state.conversation, action.payload);
        },
        deleteConversation: (state, action) => {
            const { username } = action.payload;
            const newState = state.conversation.forEach((conv) => {
                if (conv.username !== username);
                return conv;
            });

            state.conversation = new Array(newState);
        },
    },
});

export const { init, updateName, updateProfilePicture, newConversation, deleteConversation } = user.actions;

export default user.reducer;
