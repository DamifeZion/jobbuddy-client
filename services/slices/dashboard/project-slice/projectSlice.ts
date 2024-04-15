import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProjectSliceProp, ProjectCardLayoutProps } from "@/types";

const initialState: ProjectSliceProp = {
   category: "all categories",
   dateModified: "anytime",
   sortBy: "newest edited",
   viewMode: "grid",
   selectedProjects: [],
   activeProject: {
      id: "",
      title: "",
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
         // Persist the value in the local storage.
         localStorage.setItem(
            String(process.env.NEXT_PUBLIC_PROJECT_VIEW_MODE),
            JSON.stringify(state.viewMode)
         );
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
         action: PayloadAction<ProjectCardLayoutProps["project"]>
      ) => {
         state.activeProject = action.payload;
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
