import { createSlice } from "@reduxjs/toolkit";
import { EntryType } from "./api";

interface Filters {
    keyword: string;
    entryType: EntryType;
    year: string;
    page: number;
}

export const filtersSlice = createSlice({
    name: "filters",
    initialState: {
        keyword: "Pokemon",
        entryType: EntryType.All,
        year: "",
        page: 1
    },
    reducers: {
        updateKeyword(state, action) {
            state.keyword = action.payload;
        },
        updateYear(state, action) {
            state.year = action.payload;
        },
        updateEntryType(state, action) {
            state.entryType = action.payload;
        },
        updatePage(state, action) {
            state.page = action.payload;
        },
    },
});

export const { updateKeyword, updateYear, updateEntryType, updatePage } = filtersSlice.actions;

export const filtersSelector = (state: { filters: Filters; }) => state.filters;

export default filtersSlice.reducer;