// import logo from "../../images/logo.svg";

import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
    name: "user",
    initialState: {
        username: "Undefined",
        name: "Undefined",
        profilePicture: "/static/assets/images/profile.svg",
        conversation: [],
    },
    reducers: {
        init: async (state, action) => {
            state = action.payload;
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
