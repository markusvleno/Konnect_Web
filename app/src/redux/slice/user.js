import { createSlice } from "@reduxjs/toolkit";
import { putConversation } from "../../utils";
import axios from "axios";

// let sample = [
//     {
//         username: "brah1",
//         name: "Brah",
//         chatLog: [
//             {
//                 data: "sup homie",
//                 msgID: 1000,
//                 origin: true,
//                 time: Date.now(),
//             },
//         ],
//     },
// ];

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
            state.conversation = new Array(...state.conversation, action.payload.conv);
        },
        newMessage: (state, action) => {
            const { username, msgObj } = action.payload;

            var userObj = null;
            state.conversation.forEach((conv) => {
                if (conv.username === username) {
                    userObj = conv;
                    return;
                }
            });

            if (!userObj) {
                axios
                    .get(`/api/v1/user/?username=${username}`)
                    .then((res) => {
                        if (res.status !== 200 || res.data.code !== 200) {
                            return;
                        }

                        let newUserObj = {
                            username: res.data.data.username,
                            userId: res.data.data.userId,
                            name: res.data.data.name,
                            chatLog: [msgObj],
                        };
                        state.conversation = [newUserObj, ...state.conversation];
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                state.conversation = state.conversation.map((conv) => {
                    if (conv.username === username) {
                        conv.chatLog = [...conv.chatLog, msgObj];
                        return conv;
                    } else return conv;
                });
            }
            putConversation(state.userId, state.conversation);
        },
        deleteConversation: (state, action) => {
            const { userId } = action.payload;
            const newState = state.conversation.forEach((conv) => {
                if (conv.userId !== userId) return conv;
            });

            state.conversation = new Array(newState);
            putConversation(state.userId, state.conversation);
        },
    },
});

export const { init, updateName, updateProfilePicture, newConversation, deleteConversation, newMessage } = user.actions;

export default user.reducer;
