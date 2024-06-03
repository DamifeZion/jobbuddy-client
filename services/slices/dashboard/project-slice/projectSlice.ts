import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProjectSliceProp } from "@/types";
import moment from "moment";

const initialState: ProjectSliceProp = {
   category: "all categories",
   dateModified: "anytime",
   sortBy: "newest edited",
   viewMode: "grid",
   selectedProjects: [],
   activeProject: {
      id: "",
      title: "",
      date: "",
   },
   downloadFormat: "PDF Standard",
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
      },

      setSelectedProjects: (state, action) => {
         const { payload } = action;

         const existingIndex = state.selectedProjects.findIndex(
            (id) => id === payload
         );
         if (existingIndex > -1) {
            state.selectedProjects.splice(existingIndex, 1);
         } else {
            state.selectedProjects.push(payload);
         }
      },

      markAllProjects: (state, action) => {
         state.selectedProjects = action.payload;
      },

      clearSelectedProjects: (state) => {
         state.selectedProjects = [];
      },

      setDownloadFormat: (state, action) => {
         state.downloadFormat = action.payload;
      },

      setActiveProject: (
         state,
         action: PayloadAction<ProjectSliceProp["activeProject"] | "reset">
      ) => {
         if (action.payload === "reset") {
            state.activeProject = initialState.activeProject;
         } else {
            const date = action.payload.date;
            state.activeProject = {
               ...action.payload,
               date: moment(date).fromNow() as string,
            };
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
   setSelectedProjects,
   markAllProjects,
   clearSelectedProjects,
   setDownloadFormat,
   setActiveProject,
} = projectSlice.actions;
