import { SelectDrawerSliceProps } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const initialState: SelectDrawerSliceProps = {
   isOpen: false,
   selectedValue: "",
}

export const selectDrawerSlice = createSlice({
   name: "Select Drawer Slice",

   initialState,

   reducers: {
      setToggleDrawer: (state, action: {payload?: any}) => {
         if (!action.payload) {
            state.isOpen = !state.isOpen
         }
         else {
            state.isOpen = action.payload
         }

         console.log(state.isOpen, state.selectedValue);
      },

      setSelectedValue: (state, action) => {
         state.selectedValue = action.payload;
      }
   }
})

export const { setToggleDrawer, setSelectedValue } = selectDrawerSlice.actions;