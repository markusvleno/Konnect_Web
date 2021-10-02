import { createSlice } from "@reduxjs/toolkit";

export const UI = createSlice({
    name: "UI",
    initialState: {
        convWindow: {
            isSelected: false,
            selectedUserId: null,
        },
        settingWindow: {
            isOpen: false,
        },
        newConversationWindow: {
            isOpen: false,
        },
    },
    reducers: {
        openConvWindow: (state, action) => {
            const { userId, isSelected } = action.payload;

            if (!userId) {
                state.convWindow.isSelected = false;
                return;
            }
            state.convWindow = { isSelected: isSelected, selectedUserId: userId };
        },
        changeSettingWindow: (state, action) => {
            const value = action.payload;
            if (typeof value !== "boolean") {
                state.settingWindow.isOpen = false;
            } else {
                state.settingWindow.isOpen = value;
            }
        },
        chatNewConversationWindow: (state, action) => {
            const { value } = action.payload;
            if (typeof value !== "boolean") {
                state.newConversationWindow.isOpen = false;
            } else {
                state.newConversationWindow.isOpen = value;
            }
        },
    },
});

export const { changeSettingWindow, openConvWindow, chatNewConversationWindow } = UI.actions;

export default UI.reducer;
