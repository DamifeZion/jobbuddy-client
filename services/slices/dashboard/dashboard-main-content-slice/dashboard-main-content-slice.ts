import { DashboardMainContentSliceProps } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: DashboardMainContentSliceProps = {
   mainContentWidth: "0px",
};

export const dashboardMainContentSlice = createSlice({
   name: "Main Content",

   initialState,

   reducers: {
      setMainContentWidth: (state, action) => {
         state.mainContentWidth = action.payload;
      },
   },
});

export const { setMainContentWidth } = dashboardMainContentSlice.actions;
