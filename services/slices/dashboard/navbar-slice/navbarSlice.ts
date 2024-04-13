import { NavbarSliceProp } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: NavbarSliceProp = {
   notificationIsOpen: false,
   appearanceIsOpen: false,
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
   },
});

export const { setNotificationOpen, setAppearanceOpen } = navbarSlice.actions;
