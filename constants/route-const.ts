import { BuildDashboardRouteProp } from "@/types";

const buildDashboardRoute = ({ baseRoute }: BuildDashboardRouteProp) => {
   return {
      templates: `${baseRoute}/templates`,
      create: `${baseRoute}/create`,
      projects: `${baseRoute}/projects`,
      mailbox: `${baseRoute}/mailbox`,
      settings: `${baseRoute}/settings`,
      contact: `${baseRoute}/contact`,
      profile: `${baseRoute}/profile`,
   };
};

export const routeConstants = {
   // The Un-Authorized Routes
   unAuthRoute: {
      main: "/",
   },

   // The Routes for Authorised Pages
   authRoute: {
      main: "/dashboard",
      nestedRoute: buildDashboardRoute({ baseRoute: "/dashboard" }),
   },
};
