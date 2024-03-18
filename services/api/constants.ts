export const api = {
   // ===== USER AUTHENTICATION ===== //
   userProfile: "/user", //takes token
   signIn: "/user/login",
   signUp: "/user/register",
   googleSignIn: "/user/oauth/google",
   emailVerification: "/user/activate_account",
   forgotPassword: "user/forgot_password",
   resetPassword: "/user/reset_password/", //takes token

   // ==== NEWSLETTER SUBSCRIPTION ==== //
   newsletter: "/newsletter/subscribe",

   // === BELOW IS FOR AUTHENTICATED ACTIONS ===//

   // === FOR SETTINGS ===//
   resetEmail: "profile/user/reset_email",
   verifyEmail: "profile/user/activate_email", //takes token
};
