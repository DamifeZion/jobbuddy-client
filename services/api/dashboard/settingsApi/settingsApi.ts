import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../baseQuery";
import { api } from "../../endpoints";

export const settingsApi = createApi({
   reducerPath: "Settings Api",

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
