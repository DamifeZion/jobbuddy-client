import { DataTableSliceProps } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: DataTableSliceProps = {
   disableRouting: false,
   rowIsSelected: false,
};

export const dataTableSlice = createSlice({
   name: "Select Drawer Slice",

   initialState,

   reducers: {
      setRowIsSelected: (state, action) => {
         state.rowIsSelected = action.payload;
      },

      setDisableTableRouting: (state, action) => {
         state.disableRouting = action.payload;
      },
   },
});

export const { setRowIsSelected, setDisableTableRouting } =
   dataTableSlice.actions;
