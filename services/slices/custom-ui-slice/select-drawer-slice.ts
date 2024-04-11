import { SelectDrawerSliceProps } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: SelectDrawerSliceProps = {
   selectedValue: "",
};

export const selectDrawerSlice = createSlice({
   name: "Select Drawer Slice",

   initialState,

   reducers: {
      setSelectedValue: (state, action) => {
         state.selectedValue = action.payload;
      },
   },
});

export const { setSelectedValue } = selectDrawerSlice.actions;
