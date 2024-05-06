import { BuildDashboardRouteProp } from "@/types";

//NOTE: Use string methods replace to change route parameters to the actual value. E.g [publicProjectView.replace(':id', activeProject.id]

const buildDashboardRoute = ({ baseRoute }: BuildDashboardRouteProp) => {
   return {
      templates: `${baseRoute}/templates`,
      projects: `${baseRoute}/projects`,
      newProject: `${baseRoute}/projects/add`,
      editProject: `${baseRoute}/projects/:id/edit`,
      mailbox: `${baseRoute}/mailbox`,
      settings: `${baseRoute}/settings`,
      contact: `${baseRoute}/contact`,
      profile: `${baseRoute}/career_profile`,
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
      project: {
         publicProjectView: "/public/project/:id/view",
      },
   },

   // The Routes for Authorised Pages
   authRoute: {
      main: "/dashboard",
      nestedRoute: buildDashboardRoute({ baseRoute: "/dashboard" }),
   },
};
