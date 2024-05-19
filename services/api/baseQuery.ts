import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { StoreRootState } from "../redux-provider/store";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL as string;

export const baseQuery = fetchBaseQuery({
   baseUrl: serverUrl,

   prepareHeaders: (headers, { getState }) => {
      const state = getState() as StoreRootState;
      const token = state.userSlice.sessionToken;
      if (token && !headers.has("Authorization")) {
         headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
   },
});
