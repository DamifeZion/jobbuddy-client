import { createSlice } from "@reduxjs/toolkit";

type NewsletterSlice = {
   email: string;
};

const initialState: NewsletterSlice = {
   email: "",
};

export const newsletterSlice = createSlice({
   name: "newsletterSlice",

   initialState,

   reducers: {
      setEmail: (state, action) => {
         state.email = action.payload;
      },
   },
});

export const { setEmail } = newsletterSlice.actions;
