// import logo from "../../images/logo.svg";

import { createSlice } from "@reduxjs/toolkit";
import { putConversation } from "../../utils";
import axios from "axios";

let sample = [
    {
        username: "brah1",
        name: "Brah",
        chatLog: [
            {
                data: "sup homie",
                msgID: 1000,
                origin: true,
                time: Date.now(),
            },
        ],
    },
];

export const user = createSlice({
    name: "user",
    initialState: {
        userId: null,
        username: "",
        name: "",
        profilePicture: "/static/assets/images/profile.svg",
        conversation: [],
        signalProtocalManager: null,
        socket: null,
    },
    reducers: {
        init: (state, action) => {
            const payload = action.payload;
            state.userId = payload.userId;
            state.username = payload.username;
            state.name = payload.name;
            state.conversation = payload.savedConv;
            state.signalProtocalManager = payload.signalProtocalManager;
            state.socket = payload.socket;
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
        newMessage: async (state, action) => {
            const { username, msgObj } = action.payload;

            var userObj = null;
            state.conversation.forEach((conv) => {
                if (conv.username === username) userObj = conv;
            });

            if (!userObj) {
                await axios.get(`/api/v1/user/?username=${username}`).then((response) => {
                    if (response.status !== 200 || response.data.code !== 200) {
                        return;
                    }

                    userObj = {
                        username: response.data.username,
                        userId: response.data.userId,
                        name: response.data.name,
                        chatLog: [msgObj],
                    };
                    state.conversation.push(userObj);
                });
            } else {
                userObj.chatLog.push(msgObj);
            }

            putConversation(state.userId, state.conversation);
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

export const { init, updateName, updateProfilePicture, newConversation, deleteConversation, newMessage } = user.actions;

export default user.reducer;
