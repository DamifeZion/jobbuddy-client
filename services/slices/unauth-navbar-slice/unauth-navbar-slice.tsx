import { createSlice } from "@reduxjs/toolkit";

type NavSlice = {
   hamburger: boolean;
};

const initialState: NavSlice = {
   hamburger: false,
};

export const unAuthNavbarSlice = createSlice({
   name: "navSlice",

   initialState,

   reducers: {
      toggleHamburger: (state) => {
         state.hamburger = !state.hamburger;
      },
   },
});

export const { toggleHamburger } = unAuthNavbarSlice.actions;
