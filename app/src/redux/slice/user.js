// import logo from "../../images/logo.svg";

import { createSlice } from "@reduxjs/toolkit";
import { MessageLoader } from "../../utils";

let temp = [
    {
        username: "brah1",
        chatID: 123,
        chatLog: [
            {
                data: "sup homie",
                msgID: 100,
                origin: true,
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
                origin: false,
                msgID: 101,
                time: Date.now(),
            },
            {
                data: "sup homie",
                origin: true,
                msgID: 102,
                time: Date.now(),
            },
            {
                data: "sup homie",
                origin: false,
                msgID: 103,
                time: Date.now(),
            },
        ],
    },
];

export const user = createSlice({
    name: "user",
    initialState: {
        userId: null,
        username: "Undefined",
        name: "Undefined",
        profilePicture: "/static/assets/images/profile.svg",
        conversation: [],
        friendList: [],
        messageLoader: new MessageLoader(),
        signalProtocalManager: null,
    },
    reducers: {
        init: (state, action) => {
            const payload = action.payload;
            state.userId = payload.userId;
            state.username = payload.username;
            state.name = payload.name;
            state.conversation = temp;
            state.friendList = payload.friendList;
            state.signalProtocalManager = payload.signalProtocalManager;

            let obj1 = {
                data: "sup homie",
                msgID: 100,
                origin: true,
                time: Date.now(),
            };
            state.messageLoader.putMessage(123, obj1);
            state.messageLoader.putMessage(123, obj1);
            state.messageLoader.putMessage(123, obj1);
            state.messageLoader.putMessage(123, obj1);
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
