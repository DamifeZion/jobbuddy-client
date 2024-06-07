import { BuildDashboardRouteProp } from "@/types";

//NOTE: Use string methods replace to change route parameters to the actual value. E.g [publicProjectView.replace(':id', activeProject.id]

const buildDashboardRoute = ({ baseRoute }: BuildDashboardRouteProp) => {
   return {
      templates: `${baseRoute}/templates`,
      projects: `${baseRoute}/projects`,
      newProject: `${baseRoute}/projects/add`,
      editProject: `${baseRoute}/projects/:id/edit`,
      mailbox: `${baseRoute}/mailbox`,
      contact: `${baseRoute}/contact`,
      trash: `${baseRoute}/folder/trash`,

      // PROFILE ROUTE BEGINS
      profile: `${baseRoute}/career_profile`,
      profilePersonalInfo: `${baseRoute}/career_profile/personal_information`,
      profileProfessionalSummary: `${baseRoute}/career_profile/professional_summary`,
      profileExperience: `${baseRoute}/career_profile/work_experience`,
      profileEducation: `${baseRoute}/career_profile/educations`,
      profileSkill: `${baseRoute}/career_profile/skills`,
      profileLanguage: `${baseRoute}/career_profile/languages`,
      profileCertifications: `${baseRoute}/career_profile/certifications`,
      profileAward: `${baseRoute}/career_profile/awards`,
      profileVolunteer: `${baseRoute}/career_profile/volunteer`,
      // PROFILE ROUTE ENDS

      //SETTINGS ROUTE BEGINS
      settings: `${baseRoute}/settings`,
      //SETTINGS ROUTE ENDS

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
      contact: "/contact",
      about: "/about",
      login: "/login",
      register: "/register",
      forgotPassword: "/forgot-password",
      createPassword: "/create-password",
      verifyCode: "/verification-code",

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
