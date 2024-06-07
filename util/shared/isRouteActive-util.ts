import { routeConstants } from "@/constants/route-const";

export const isRouteActive = (
   pathname: string,
   href: string,
   includeSubRoutes?: boolean
) => {
   const { main: dashboardHome } = routeConstants.authRoute;

   // Direct match for the home route or when subroutes should be included.
   if (pathname === dashboardHome || includeSubRoutes) {
      return pathname === href;
   } else {
      const pathnameParts = pathname.split("/");
      const hrefParts = href.split("/");

      //NOTE: The first part is empty string, the second is dashboardHome and the third is the actual route. Therefore the array index will be 2.
      return pathnameParts[2] === hrefParts[2];
   }
};
