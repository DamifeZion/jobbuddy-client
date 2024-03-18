import { NavbarSliceProp } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: NavbarSliceProp = {
   notificationIsOpen: false,
};

export const navbarSlice = createSlice({
   name: "Navbar Slice",

   initialState,

   reducers: {
      setNotificationIsOpen: (state, action) => {
         state.notificationIsOpen = action.payload;
      },
   },
});

export const { setNotificationIsOpen } = navbarSlice.actions;
