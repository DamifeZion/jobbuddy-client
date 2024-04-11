import { BuildDashboardRouteProp } from "@/types";

const buildDashboardRoute = ({ baseRoute }: BuildDashboardRouteProp) => {
   return {
      templates: `${baseRoute}/templates`,
      projects: `${baseRoute}/projects`,
      newProject: `${baseRoute}/projects/add`,
      mailbox: `${baseRoute}/mailbox`,
      settings: `${baseRoute}/settings`,
      contact: `${baseRoute}/contact`,
      profile: `${baseRoute}/profile`,
      trash: `${baseRoute}/folder/trash`,

      //NOTE: The try premium route "features" is a page that shows all the features of the premium, why the steps will be used for a modal or any "Pop up" to change the content of the "Pop up" conditionally
      tryPremium: {
         features: `${baseRoute}/pro-features`,
      },
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

export const buildEditProjectRoute = (id: string) => {
   return (
      routeConstants.authRoute.nestedRoute.projects.toString() + `/${id}/edit`
   );
};
