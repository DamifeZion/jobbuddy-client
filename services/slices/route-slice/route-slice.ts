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

         //Persist to local storage. But remove when user logs out.
         localStorage.setItem(
            String(process.env.NEXT_PUBLIC_NAVIGATION_HISTORY),
            JSON.stringify(state.navigationHistory)
         );
      },
   },
});

export const { setNavigationHistory } = routeSlice.actions;
