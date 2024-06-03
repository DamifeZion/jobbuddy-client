import { RouteSliceProps } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: RouteSliceProps = {
   navigationHistory: [],
};

export const routeSlice = createSlice({
   name: "Route Slice",

   initialState,

   reducers: {
      setNavigationHistory: (state, action) => {
         state.navigationHistory = action.payload;
      },
   },
});

export const { setNavigationHistory } = routeSlice.actions;
