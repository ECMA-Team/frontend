import { createSlice } from "@reduxjs/toolkit";

export const search = createSlice({
    name: "search",
    initialState: {
        search: [],
    },
    reducers: {

        getSearchAction: (state, action) => {
            state.search = action.payload;
        },

        addToSearchAction: (state, action) => {
            state.search.push(action.payload);
        },
    }
})




export const {
    getSearchAction,
    addToSearchAction,

} = search.actions;

export default search.reducer;