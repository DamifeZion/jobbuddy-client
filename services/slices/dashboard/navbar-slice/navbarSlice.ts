import { NavbarSliceProp } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: NavbarSliceProp = {
   notificationIsOpen: false,
   appearanceIsOpen: false,
   retractSidebar: false,
};

export const navbarSlice = createSlice({
   name: "Navbar Slice",

   initialState,

   reducers: {
      setNotificationOpen: (state, action) => {
         state.notificationIsOpen = action.payload;
      },

      setAppearanceOpen: (state, action) => {
         if (action.payload === null) {
            state.appearanceIsOpen = !state.appearanceIsOpen;
         } else {
            state.appearanceIsOpen = action.payload;
         }
      },

      setRetractSidebar: (
         state,
         action: PayloadAction<undefined | boolean>
      ) => {
         if (action.payload === undefined) {
            state.retractSidebar = !state.retractSidebar;
         } else {
            state.retractSidebar = action.payload;
         }
      },
   },
});

export const { setNotificationOpen, setAppearanceOpen, setRetractSidebar } =
   navbarSlice.actions;
