import { createSlice } from "@reduxjs/toolkit";
import { ProjectSliceProp } from "@/types";

const initialState: ProjectSliceProp = {
   category: "All Categories",
   dateModified: "Anytime",
   sortBy: "Newest Edited",
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

export const {} = projectSlice.actions;
