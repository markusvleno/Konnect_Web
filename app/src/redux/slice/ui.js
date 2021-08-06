import { createSlice } from "@reduxjs/toolkit";

export const ui = createSlice({
    name: "ui",
    initialState: {
        userSelected: {
            Name: " ",
            logo: " ",
        },
    },
    reducers: {
        setSelectedUser: (state) => {
            state;
        },
    },
});

export const {} = ui.actions;

export default ui.reducer;
