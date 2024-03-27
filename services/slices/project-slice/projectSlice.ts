import { createSlice } from "@reduxjs/toolkit";
import { ProjectSliceProp } from "@/types";

const initialState: ProjectSliceProp = {
   category: "all categories",
   dateModified: "anytime",
   sortBy: "newest edited",
   viewMode: "grid",
   selectedProjectsList: [],
   activeProjectDropdown: null,
};

export const projectSlice = createSlice({
   name: "Project Slice",

   initialState,

   reducers: {
      setCategory: (state, action) => {
         state.category = action.payload;
      },

      setDateModified: (state, action) => {
         state.dateModified = action.payload;
      },

      setSortBy: (state, action) => {
         state.sortBy = action.payload;
      },

      clearFilters: () => {
         return { ...initialState };
      },

      toggleViewMode: (state, action: { payload?: "grid" | "list" }) => {
         if (action.payload === undefined) {
            state.viewMode = state.viewMode === "grid" ? "list" : "grid";
         } else {
            state.viewMode = action.payload;
         }
         // Persist the value in the local storage.
         localStorage.setItem(
            String(process.env.NEXT_PUBLIC_PROJECT_VIEW_MODE),
            JSON.stringify(state.viewMode)
         );
      },

      setSelectedProjectsList: (state, action) => {
         state.activeProjectDropdown = null;
         // Make copy
         const selectedProjectsList = [...state.selectedProjectsList];

         // Check is item already exist and mutate copy
         const existingIndex = selectedProjectsList.findIndex(
            (id) => id === action.payload
         );

         if (existingIndex > -1) {
            selectedProjectsList.splice(existingIndex, 1);
         } else {
            selectedProjectsList.push(action.payload);
         }
      },
   },
});

export const {
   setCategory,
   setDateModified,
   setSortBy,
   clearFilters,
   toggleViewMode,
   setSelectedProjectsList,
} = projectSlice.actions;
