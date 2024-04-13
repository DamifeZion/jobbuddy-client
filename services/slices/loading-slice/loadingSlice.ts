import { isLoadingSLice } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: isLoadingSLice = {
   isLoading: false,
};

export const loadingSlice = createSlice({
   name: "Loading Slice",

   initialState,

   reducers: {
      setIsLoading: (state, action) => {
         state.isLoading = action.payload;
      },
   },
});

export const { setIsLoading } = loadingSlice.actions;
