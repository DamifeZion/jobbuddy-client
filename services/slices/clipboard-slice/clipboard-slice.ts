import { ClipboardProps } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: ClipboardProps = {
   copied: {
      success: true,
      msg: "Copied to clipboard",
   },
};

export const clipboardSlice = createSlice({
   name: "Cliboard Slice",

   initialState,

   reducers: {
      setCopied: (
         state,
         action: PayloadAction<{ success: boolean; msg: string }>
      ) => {
         state.copied = action.payload;
      },
   },
});

export const { setCopied } = clipboardSlice.actions;
