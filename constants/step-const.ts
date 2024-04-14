const baseRoute = "/dashboard";

/*NOTE:
 * It's important to do the capitalization of the steps yourself, as these steps will be shown as title in some places.
 * So handle each step how you would like it to be displayed. It is done like this for full flexibility.
 */

export const stepConstants = {
   navbar: {
      tryPremiumSteps: ["Intro", "Subscription-plans", "Card-payments"],
   },

   project: {
      projectItemOptionsSteps: {
         downloadStep: ["Download"],
      },
   },
};
