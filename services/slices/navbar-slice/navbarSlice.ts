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

      setAppearanceOpen: (state) => {
         state.appearanceIsOpen = !state.appearanceIsOpen;
      },
   },
});

export const { setNotificationOpen, setAppearanceOpen } = navbarSlice.actions;
