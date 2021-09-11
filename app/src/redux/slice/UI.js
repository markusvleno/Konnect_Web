import { createSlice } from "@reduxjs/toolkit";

export const UI = createSlice({
    name: "UI",
    initialState: {
        convWindow: {
            isSelected: false,
            selectedUser: "Brah1",
        },
        settingWindow: {
            isOpen: false,
        },
    },
    reducers: {
        openConvWindow: (state, action) => {
            const { username } = action.payload;

            if (!username) {
                state.convWindow.isSelected = false;
                return;
            }
            state.convWindow = { isSelected: true, selectedUser: username };
        },
        changeSettingWindow: (state, action) => {
            const value = action.payload;
            if (typeof value !== "boolean") {
                state.settingWindow.isOpen = false;
                return;
            }

            state.settingWindow.isOpen = value;
        },
    },
});

export const { changeSettingWindow, openConvWindow } = UI.actions;

export default UI.reducer;
