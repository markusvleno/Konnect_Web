// import logo from "../../images/logo.svg";

import { createSlice } from "@reduxjs/toolkit";

// dummy conversation data:
const temp = [
    {
        userID: 1001,
        chat: [
            {
                id: "12345",
                origin: true,
                message: "Hello!",
                date: "yesterday",
                type: "msg/text",
            },
            {
                id: "12345",
                origin: false,
                message: "Hello!",
                date: "yesterday",
                type: "msg/text",
            },
            {
                id: "23563",
                origin: true,
                message: "Hello!",
                date: "yesterday",
                type: "msg/text",
            },
            {
                id: "12464",
                origin: true,
                message: "Hello!",
                date: "yesterday",
                type: "msg/text",
            },
            {
                id: "23452",
                origin: true,
                message: "Hello!",
                date: "yesterday",
                type: "msg/text",
            },
        ],
    },
    {
        userID: 1002,
        chat: [
            {
                id: "12345",
                origin: true,
                message: "Hello!",
                date: "yesterday",
                type: "msg/text",
            },
            {
                id: "12345",
                origin: false,
                message: "Hello!",
                date: "yesterday",
                type: "msg/text",
            },
            {
                id: "23563",
                origin: true,
                message: "Hello!",
                date: "yesterday",
                type: "msg/text",
            },
            {
                id: "12464",
                origin: true,
                message: "Hello!",
                date: "yesterday",
                type: "msg/text",
            },
            {
                id: "23452",
                origin: true,
                message: "Hello!",
                date: "yesterday",
                type: "msg/text",
            },
        ],
    },
];

// dummy friends data:
const dumy = [
    {
        username: "markus",
        name: "markus",
        key: {
            public: null,
        },
        chatID: 1001,
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
    },
    reducers: {
        init: (state, action) => {
            const payload = action.payload;
            state.username = payload.username;
            state.name = payload.name;
            state.profilePicture = payload.profilePicture;
            state.conversation = temp;
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
            const conversation = action.payload;
            const newState = state.conversation.forEach((conv) => {
                if (conv.username !== conversation.username);
                return conv;
            });

            state.conversation = new Array(newState);
        },
    },
});

export const { init, updateName, updateProfilePicture, newConversation, deleteConversation } = user.actions;

export default user.reducer;
