import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";
import { api } from "../endpoints";

export const authApi = createApi({
   reducerPath: "authApi",

   baseQuery,

   endpoints: (builder) => ({
      getUserProfile: builder.query({
         query: (sessionToken: string) => ({
            url: api.userProfile + sessionToken,
         }),
      }),

      googleSignIn: builder.mutation({
         query: (body: { token: string }) => ({
            url: api.googleSignIn,
            method: "POST",
            body,
         }),
      }),

      signIn: builder.mutation({
         query: (body: { usernameOrEmail: string; password: string }) => ({
            url: api.signIn,
            method: "POST",
            body,
         }),
      }),

      signUp: builder.mutation({
         query: (body: {
            username: string;
            email: string;
            password: string;
            confirmPassword: string;
         }) => ({
            url: api.signUp,
            method: "POST",
            body,
         }),
      }),

      emailVerification: builder.mutation({
         query: (body: { verificationCode: string }) => ({
            url: api.emailVerification,
            method: "POST",
            body,
         }),
      }),

      forgotPassword: builder.mutation({
         query: (body: { usernameOrEmail: string }) => ({
            url: api.forgotPassword,
            method: "POST",
            body,
         }),
      }),

      // For Un-Authenticated user
      resetPassword: builder.mutation({
         query: ({
            resetToken,
            password,
            confirmPassword,
         }: {
            resetToken: string;
            password: string;
            confirmPassword: string;
         }) => {
            const body = { password, confirmPassword };

            return {
               url: api.resetPassword + resetToken,
               method: "PUT",
               body,
            };
         },
      }),
   }),
});

export const {
   useGetUserProfileQuery,
   useGoogleSignInMutation,
   useSignInMutation,
   useSignUpMutation,
   useEmailVerificationMutation,
   useForgotPasswordMutation,
   useResetPasswordMutation,
} = authApi;
