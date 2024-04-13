import { UserSliceProp } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserSliceProp = {
   user: {
      _id: "@#r%nsceunu9092je0ncxowin0n",
      name: "Damife Olaleye-Martins",
      email: "damifecodemaniac@gmail.com",
      profile: "/auth/home/user.jpg",
      plan: "free",
   },

   sessionToken: "ABCD234efskj!jncwinju30849cjcwkkq",
};

export const userSlice = createSlice({
   name: "User Slice",

   initialState,

   reducers: {
      setUser: (state, action: PayloadAction<UserSliceProp>) => {
         state.user = action.payload.user;
      },

      logOut: (state) => {
         state.user = null;
         state.sessionToken = null;
      },
   },
});

export const { setUser, logOut } = userSlice.actions;
