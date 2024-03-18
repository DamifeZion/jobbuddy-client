import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";
import { api } from "../constants";

export const settingsApi = createApi({
   reducerPath: "settingsApi",

   baseQuery,

   endpoints: (builder) => ({
      resetEmail: builder.mutation({
         query: (body: { email: string }) => ({
            url: api.resetEmail,
            method: "POST",
            body,
         }),
      }),

      verifyEmail: builder.mutation({
         query: (body: { verificationCode: string }) => ({
            url: api.verifyEmail,
            method: "POST",
            body,
         }),
      }),
   }),
});

export const { useResetEmailMutation, useVerifyEmailMutation } = settingsApi;
