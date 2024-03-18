import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";
import { api } from "../constants";

export const newsletterApi = createApi({
   reducerPath: "newsletterApi",

   baseQuery,

   endpoints: (builder) => ({
      subscribeNewsletter: builder.mutation({
         query: (body: { email: string }) => {
            return {
               url: api.newsletter,
               method: "post",
               body,
            };
         },
      }),
   }),
});

export const { useSubscribeNewsletterMutation } = newsletterApi;
